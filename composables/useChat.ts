export interface Expert {
    name: string;
    role: string;
    avatar: string;
}

export const YOU: Expert = {
    name: "You",
    role: "",
    avatar: "",
};

export interface Message {
    id: string;
    author: Expert;
    message: string;
    simpleMessage?: string;
}

const chat = ref<Message[]>([]);
const options = ref<Message[]>([
    {
        id: "1",
        author: YOU,
        message: "Test message hihi",
    },
    {
        id: "2",
        author: YOU,
        message: "Test message haha",
    },
]);
export const useChat = () => {
    function sendMessage(message: Message) {
        chat.value.push(message);
    }
    return { chat, options, sendMessage };
};
