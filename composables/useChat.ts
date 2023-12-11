export interface Person {
    name: string;
    role: string;
    avatar: string;
}

export interface Message {
    id: string;
    author: Person;
    message: string;
    simpleMessage?: string;
    nextMessages: string[];
}

export const YOU: Person = {
    name: "You",
    role: "",
    avatar: "",
};

const Ethan: Person = {
    name: "Ethan Reynold",
    role: "Budgeting expert",
    avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.x8UNRkaTzCW19mHkKpD86QHaLH%26pid%3DApi&f=1&ipt=b62f236e8dccdaf5046073cf8765da1d041f5bfacb0ca3b8fd6fc2d78b1e680d&ipo=images",
};

export const EXPERTS: Person[] = [Ethan];

const allMessages: Message[] = [
    {
        id: "1",
        author: YOU,
        message: "How do I save money for my children?",
        nextMessages: ["2"],
    },
    {
        id: "2",
        author: Ethan,
        message: "Well, don't ask me. ",
        nextMessages: ["3", "4", "5"],
    },
    {
        id: "3",
        author: YOU,
        message: "You suck!",
        nextMessages: ["6"],
    },
    {
        id: "4",
        author: YOU,
        message: "Fuck off!",
        nextMessages: ["6"],
    },
    {
        id: "5",
        author: YOU,
        message: "Well, well, well",
        nextMessages: ["6"],
    },
    {
        id: "6",
        author: Ethan,
        message: "Shut up",
        nextMessages: [],
    },
];

export function getMessage(id: string) {
    const msg = allMessages.find((m) => m.id == id);
    if (!msg) {
        throw new Error(`Could not find message ${id}`);
    }
    return msg;
}

const chat = ref<Message[]>([]);
const options = ref<Message[]>([]);
export const useChat = (initialMessageId: string) => {
    function sendMessage(message: Message) {
        chat.value.push(message);
        const expertMessageId = message.nextMessages[0];
        const expertMessage = getMessage(expertMessageId);
        chat.value.push(expertMessage);
        options.value = allMessages.filter((m) =>
            expertMessage.nextMessages.includes(m.id)
        );
    }

    sendMessage(getMessage(initialMessageId));
    return { chat, options, sendMessage };
};