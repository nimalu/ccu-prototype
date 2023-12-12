<script setup lang="ts">
const { chat, createChat, sendMessage, possibleAnswers } = useChat();
await createChat();
</script>

<template>
    <div class="d-flex flex-column chat-container">
        <div class="overflow-y-auto w-100 flex-grow-1">
            <div class="w-chat" v-if="chat">
                <template v-for="chatEvent in chat.events">
                    <Message
                        v-if="chatEvent.eventName == 'userMessage'"
                        name="You"
                        :message="(chatEvent as UserMessage).message"
                    />
                    <Message
                        v-if="chatEvent.eventName == 'expertMessage'"
                        :name="(chatEvent as ExpertMessage).author.name"
                        :avatar="(chatEvent as ExpertMessage).author.avatar"
                        :message="(chatEvent as ExpertMessage).message"
                    />
                </template>
            </div>
        </div>
        <div class="w-chat">
            <InputField :options="possibleAnswers" @send="sendMessage" />
        </div>
    </div>
</template>

<style>
.chat-container {
    height: 92vh;
    width: 100vw;
}
.w-chat {
    width: 64rem;
    margin-left: auto;
    margin-right: auto;
}
</style>
