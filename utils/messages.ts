interface Message {
    id: string;
    value: string;
    simpleValue?: string;
    author?: Expert;
    next: string[];
    chatTitle?: string;
}

const experts: Record<"ethan" | "olivia", Expert> = {
    ethan: {
        name: "Ethan Reynolds",
        role: "Inheritance advisor",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fakns-images.eonline.com%2Feol_images%2FEntire_Site%2F2013918%2Frs_1024x759-131018112543-1024.J-Bieber-Believe-jmd-101813.jpg%3Ffit%3Daround%257C1024%3A759%26output-quality%3D90%26crop%3D1024%3A759%3Bcenter%2Ctop&f=1&nofb=1&ipt=17d92498ee77722b2cc0e0d7fa27d917b02499ee7e226e518e6a1def2cc0bb5b&ipo=images",
    },
    olivia: {
        name: "Olivia Sanchez",
        role: "INvestments advisor",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.TxAo2LwJcPmHYjNWdK26TgHaKX%26pid%3DApi&f=1&ipt=650b499a15ee4bf61fbc8d0d8b47c6d4c5b92d76c1c8652e41f4a4ff914742c2&ipo=images",
    },
};

export const allMessages: Message[] = [
    {
        id: "1",
        value: "I've been thinking about saving money for my inheritance, but I'm not really sure where to start with investing",
        next: ["2"],
        chatTitle: "Saving money for inheritance",
    },
    {
        id: "2",
        value: "Hi there! Of course, I'll do my best. To begin, could you tell me a bit about why you're saving and when you might need the money?",
        simpleValue:
            "Greetings! Certainly, considering your extended horizon, an optimal strategy involves the integration of target-date funds. These funds, indexed to specific years mirroring the financial event, dynamically manage asset allocations—primarily equities and fixed-income instruments—adapting based on temporal proximity.",
        next: ["3"],
        author: experts.ethan,
    },
    {
        id: "3",
        value: "Well, I want to make sure there's a good amount of money for my family in the future, maybe 10-15 years down the line. I don't need it right away.",
        next: ["4"],
    },
    {
        id: "4",
        simpleValue: `Got it. For someone starting out, you might consider something called a "target-date fund." It's like a simple, hands-off way to invest.`,
        value: `That's a good timeframe to work with. Since you're just starting, a simple option to consider is a target-date fund. These funds are designed to automatically adjust their asset allocation over time, becoming more conservative as you get closer to your goal. They're kind of like a set-it-and-forget-it option.`,
        next: ["5"],
        author: experts.ethan,
    },
    {
        id: "5",
        value: `Target-date fund? How does that work?`,
        next: ["6"],
    },
    {
        id: "6",
        simpleValue: `A target-date fund is based on the year you want to use the money. Let's say you plan to use it in about 15 years. You'd look for a fund with a target date around 2038 or 2040. The fund takes care of investing in a mix of things like stocks and bonds. As the target date gets closer, it becomes less risky to protect your money.`,
        value: `Absolutely. Target-date funds systematically shift their asset composition as the specified event date approaches. Initially, a preponderance of equities fosters capital appreciation, gradually transitioning to a more conservative stance with augmented fixed-income exposure to preserve capital in the later stages.`,
        next: [],
        author: experts.ethan,
    },
    {
        id: "101",
        value: `I heard about a new investment fund from a friend, and I wanted to get some information about it. It’s called Awesome Fund. Do you have any information on it?`,
        next: ["102"],
        chatTitle: "Investment fund",
    },
    {
        id: "102",
        value: `Let me check that for you... Ah, I found some information on the Awesome Fund. It's worth noting that the Awesome Fund is categorized as a high-risk investment. The fund has shown volatility in the past, and it may not be suitable for everyone. Here are a few alternatives:

1. Balanced Growth Fund
2. Conservative Income Fund
3. Stable Value Fund`,
        simpleValue: `Let me check that for you... Ah, I found some information on the Awesome Fund. It's worth noting that the Awesome Fund is categorized as a high-risk investment. The fund has shown volatility in the past, and it may not be suitable for everyone. Here are a few alternatives:

1. Balanced Growth Fund
2. Conservative Income Fund
3. Stable Value Fund`,
        author: experts.olivia,
        next: ["103"],
    },
    {
        id: "103",
        value: ` I appreciate the alternatives. I'll look into those options. Is there anything specific I should watch out for when considering the risk of a fund?`,
        next: ["104"],
    },
    {
        id: "104",
        value: `Absolutely. When evaluating the risk of a fund, consider factors such as historical performance, the fund's asset allocation, and the market conditions it tends to perform well or poorly in. Additionally, check the fund's expense ratio, as higher fees can impact your overall returns. It's crucial to align the risk level of the fund with your own risk tolerance and investment goals.`,
        simpleValue: `Absolutely. When evaluating the risk of a fund, consider factors such as historical performance, the fund's asset allocation, and the market conditions it tends to perform well or poorly in. Additionally, check the fund's expense ratio, as higher fees can impact your overall returns. It's crucial to align the risk level of the fund with your own risk tolerance and investment goals.`,
        author: experts.olivia,
        next: [],
    },
];

export const firstMessages = ["1", "101"]
    .map((id) => allMessages.find((m) => m.id == id)!)
    .map((m) => m.value);
