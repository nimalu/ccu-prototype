import {
    type Chat,
    ChatServiceMock,
    type ChatEvent,
    type UserMessage,
    type ExpertMessage,
} from "~/utils/chatService";

const chatService = new ChatServiceMock();

export function useChat() {
    const chat = ref<Chat>();
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
        };
        chatService.registerChatListener(
            chatId,
            "expertMessage",
            addEventToChat
        );
    }

    function addEventToChat(event: ChatEvent) {
        if (!chat.value) {
            throw new Error("Not connected with chat");
        }
        console.dir(event)
        chat.value.events.push(event);
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
