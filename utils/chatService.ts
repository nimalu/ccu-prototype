import { allMessages } from "./messages";

interface ChatService {
    createChat(): Promise<string>;
    getChat(id: string): Chat;
    getAllChats(): Chat[];
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
    clearChatListeners<T extends keyof ChatEvents>(
        chatId: string,
        eventName: T,
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
    title: string;
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

    getAllChats(): Chat[] {
        return Object.values(this.chats);
    }

    async createChat() {
        await delay(100);
        const chatId = `chat-${Object.keys(this.chats).length}`;
        this.chats[chatId] = {
            id: chatId,
            events: [],
            title: "",
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

    clearChatListeners<T extends keyof ChatEvents>(chatId: string, eventName: T): void {
        this.listeners[chatId][eventName] = []
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
            if (message.chatTitle) {
                this.chats[chatId].title = message.chatTitle;
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
            const getListeners = () => this.listeners
            let charactersSent = 0;
            let intervalId: NodeJS.Timeout;
            const events = this.chats[chatId].events;
            function sendPart() {
                if (expertMessage.message.length == charactersSent) {
                    clearInterval(intervalId);
                    getListeners()[chatId]["expertMessage"].forEach((l) =>
                        l(JSON.parse(JSON.stringify(expertMessage)))
                    );
                    if (
                        events.length > 0 &&
                        events[events.length - 1].id == expertMessage.id
                    ) {
                        events[events.length - 1] = expertMessage;
                    } else {
                        events.push(expertMessage);
                    }
                    return;
                }
                const part = expertMessage.message.slice(0, charactersSent);
                const loadingMessage = {
                    ...expertMessage,
                    message: part,
                    loading: true,
                };
                getListeners()[chatId]["expertMessage"].forEach((l) =>
                    l(JSON.parse(JSON.stringify(loadingMessage)))
                );
                if (
                    events.length > 0 &&
                    events[events.length - 1].id == loadingMessage.id
                ) {
                    events[events.length - 1] = loadingMessage;
                } else {
                    events.push(loadingMessage);
                }
                charactersSent += 1;
            }
            sendPart();
            setTimeout(() => (intervalId = setInterval(sendPart, 25)), 1000);
        }
    }
}
