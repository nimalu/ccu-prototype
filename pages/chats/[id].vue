<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
const { options, chat, sendMessage } = useChat();
</script>

<template>
    <div class="d-flex flex-column chat-container">
        <div class="overflow-y-auto w-100 flex-grow-1">
            <div class="w-chat">
                <Message
                    v-for="message in chat"
                    :favored="false"
                    :name="message.author.name"
                    :message="message.message"
                    :simple-message="message.simpleMessage"
                    :avatar="message.author.avatar"
                    :loading="message.loading"
                />
            </div>
        </div>
        <div class="w-chat">
            <InputField :options="options" @send="sendMessage" />
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
