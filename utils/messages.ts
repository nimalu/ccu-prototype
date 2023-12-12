interface Message {
    id: string;
    value: string;
    author?: Expert;
    next: string[];
}

const experts: Record<"ethan", Expert> = {
    ethan: {
        name: "Ethan",
        role: "Budgeting Expert",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fakns-images.eonline.com%2Feol_images%2FEntire_Site%2F2013918%2Frs_1024x759-131018112543-1024.J-Bieber-Believe-jmd-101813.jpg%3Ffit%3Daround%257C1024%3A759%26output-quality%3D90%26crop%3D1024%3A759%3Bcenter%2Ctop&f=1&nofb=1&ipt=17d92498ee77722b2cc0e0d7fa27d917b02499ee7e226e518e6a1def2cc0bb5b&ipo=images",
    },
};

export const allMessages: Message[] = [
    {
        id: "1",
        value: "How do I save money for my children?",
        next: ["2"],
    },
    {
        id: "2",
        value: "Well, I only do music but let me thing.",
        next: ["3", "4"],
        author: experts.ethan
    },
    {
        id: "3",
        value: "Hurry up.",
        next: [],
    },
    {
        id: "4",
        value: "Baby baby baby aaaaeh",
        next: [],
    },
];

export const firstMessages = ["1"].map(id => allMessages.find(m => m.id == id)!).map(m => m.value)

