import { allMessages } from "./messages";

interface ChatService {
    createChat(): Promise<string>;
    getChat(id: string): Chat;
    sendChatEvent<T extends keyof ChatEvents>(
        chatId: string,
        eventName: T,
        event: ChatEvents[T]
    ): void;
    registerChatListener<T extends keyof ChatEvents>(
        chatId: string,
        eventName: T,
        listener: ChatEventListener<T>
    ): void;
    unregisterChatListener<T extends keyof ChatEvents>(
        chatId: string,
        eventName: T,
        listener: ChatEventListener<T>
    ): void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export interface Expert {
    name: string;
    role: string;
    avatar: string;
}

export interface ChatEvent {
    eventName: keyof ChatEvents;
    id: string;
}

export interface UserMessage extends ChatEvent {
    eventName: "userMessage";
    message: string;
}

export interface ExpertMessage extends ChatEvent {
    eventName: "expertMessage";
    message: string;
    simpleMessage: string;
    author: Expert;
    possibleAnswers: string[];
    loading?: boolean;
}

export interface ChatEvents {
    userMessage: UserMessage;
    expertMessage: ExpertMessage;
}

export type ChatEventListener<T extends keyof ChatEvents> = (
    event: ChatEvents[T]
) => void;

export interface Chat {
    id: string;
    events: ChatEvent[];
}

type EventListeners = {
    [T in keyof ChatEvents]: ChatEventListener<T>[];
};

export class ChatServiceMock implements ChatService {
    chats: Record<string, Chat> = {};
    listeners: Record<string, EventListeners> = {};

    getChat(id: string): Chat {
        return JSON.parse(JSON.stringify(this.chats[id]));
    }

    async createChat() {
        await delay(100);
        const chatId = `chat-${Object.keys(this.chats).length}`;
        this.chats[chatId] = {
            id: chatId,
            events: [],
        };
        return chatId;
    }

    registerChatListener<T extends keyof ChatEvents>(
        chatId: string,
        eventName: T,
        listener: ChatEventListener<T>
    ): void {
        if (!(chatId in this.listeners)) {
            this.listeners[chatId] = {
                userMessage: [],
                expertMessage: [],
            };
        }
        this.listeners[chatId][eventName].push(listener);
    }

    unregisterChatListener<T extends keyof ChatEvents>(
        chatId: string,
        eventName: T,
        listener: ChatEventListener<T>
    ): void {
        const listeners = this.listeners[chatId][eventName];
        this.listeners[chatId][eventName] = listeners.filter(
            (l) => l != listener
        ) as typeof listeners;
    }

    sendChatEvent<T extends keyof ChatEvents>(
        chatId: string,
        eventName: T,
        event: ChatEvents[T]
    ): void {
        this.chats[chatId].events.push(event);

        if (eventName == "userMessage") {
            const message = allMessages.find((m) => m.value == event.message);
            if (!message) {
                throw new Error(
                    `Could not find message corresponding to ${event.message}`
                );
            }
            if (message.next.length == 0) {
                console.warn("No more messages");
                return;
            }
            const expertAnswer = allMessages.find(
                (m) => m.id == message.next[0]
            )!;
            const expertMessage: ExpertMessage = {
                eventName: "expertMessage",
                id: `ch-${chatId}-${expertAnswer.id}`,
                author: expertAnswer.author!,
                possibleAnswers: expertAnswer.next
                    .map((id) => allMessages.find((m) => m.id == id))
                    .filter((m) => m != undefined)
                    .map((m) => m!.value),
                message: expertAnswer.value,
                simpleMessage: expertAnswer.simpleValue!,
            };
            this.chats[chatId].events.push(expertMessage);
            const listeners = this.listeners;
            let charactersSent = 0;
            let intervalId: NodeJS.Timeout;
            function sendPart() {
                if (expertMessage.message.length == charactersSent) {
                    clearInterval(intervalId);
                    listeners[chatId]["expertMessage"].forEach((l) =>
                        l(expertMessage)
                    );
                    return;
                }
                const part = expertMessage.message.slice(0, charactersSent);
                const loadingMessage = {
                    ...expertMessage,
                    message: part,
                    loading: true,
                };
                listeners[chatId]["expertMessage"].forEach((l) =>
                    l(loadingMessage)
                );
                charactersSent += 1;
            }
            intervalId = setInterval(sendPart, 25);
        }
    }
}
