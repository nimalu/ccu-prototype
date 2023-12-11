<script setup lang="ts">
import { firstMessages, type Message } from "~/composables/useChat";
const { sendMessage } = useChat();

function onSend(message: Message) {
    sendMessage(message);
    navigateTo(`/chats/${message.id}`);
}
</script>

<template>
    <div class="d-flex align-center justify-center w-100 h-100">
        <v-card class="w-50 h-50">
            <v-card-text class="w-100">
                <InputField class="w-100" :options="firstMessages" @send="onSend" />
            </v-card-text>
        </v-card>
    </div>
</template>
