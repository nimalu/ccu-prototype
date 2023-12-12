import {
    type Chat,
    ChatServiceMock,
    type ChatEvent,
    type UserMessage,
    type ExpertMessage,
} from "~/utils/chatService";

const chatService = new ChatServiceMock();

const chat = ref<Chat>();
const chats = ref<Chat[]>([]);

export function useChats() {
    function fetchChats() {
        chats.value = chatService.getAllChats();
    }
    return { chats, fetchChats };
}

export function useChat(id?: MaybeRef<string | undefined>) {
    function registerHandlers(chatId: string) {
        chatService.registerChatListener(
            chatId,
            "expertMessage",
            addEventToChat
        );
    }
    function unregisterHandlers(chatId: string) {
        chatService.clearChatListeners(chatId, "expertMessage");
    }
    watch(
        () => toValue(id),
        (newId, oldId) => {
            if (oldId == newId) {
                return;
            }
            if (oldId) {
                unregisterHandlers(oldId);
            }
            if (newId) {
                registerHandlers(newId);
                chat.value = chatService.getChat(newId);
            }
        }
    );
    if (chat.value) {
        unregisterHandlers(chat.value.id);
    }
    const chatId = toValue(id);
    if (chatId) {
        registerHandlers(chatId);
        chat.value = chatService.getChat(chatId);
    }

    const possibleAnswers = computed(() => {
        if (!chat.value) {
            return [];
        }
        const events = chat.value.events;
        if (events.length == 0) {
            return ["How do I save money for my children?"];
        }
        const latestEvent = events[events.length - 1];
        if (latestEvent.eventName != "expertMessage") {
            return [];
        }
        return (latestEvent as ExpertMessage).possibleAnswers;
    });

    async function createChat() {
        const chatId = await chatService.createChat();
        chat.value = {
            id: chatId,
            events: [],
            title: "",
        };
        registerHandlers(chatId);
        return chatId;
    }

    function addEventToChat(event: ChatEvent) {
        if (!chat.value) {
            throw new Error("Not connected with chat");
        }
        const events = chat.value.events;
        if (events.length == 0) {
            events.push(event);
        }
        const latestEvent = events[events.length - 1];
        if (latestEvent.id == event.id) {
            events[events.length - 1] = event;
        } else {
            chat.value.events.push(event);
        }
    }

    function sendMessage(message: string) {
        if (!chat.value) {
            throw new Error("Not connected with chat");
        }
        const event: UserMessage = {
            eventName: "userMessage",
            id: `c-${chat.value.id}-m-${chat.value.events.length}`,
            message,
        };
        addEventToChat(event);
        chatService.sendChatEvent(chat.value.id, "userMessage", event);
    }

    return { createChat, sendMessage, possibleAnswers, chat };
}
