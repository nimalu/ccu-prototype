<script setup lang="ts">
import { firstMessages } from "~/utils/messages";

const chatId = ref<string>()
const { createChat, sendMessage } = useChat(chatId);

async function onSend(msg: string) {
    chatId.value = await createChat();
    sendMessage(msg);
    navigateTo(`/chats/${chatId.value}`);
}
</script>

<template>
    <div class="d-flex align-center justify-center w-100 h-100">
        <v-card class="w-50 h-50" :style="{ overflow: 'visible' }">
            <v-card-text class="w-100">
                <InputField
                    class="w-100"
                    :options="firstMessages"
                    @send="onSend"
                />
            </v-card-text>
        </v-card>
    </div>
</template>
