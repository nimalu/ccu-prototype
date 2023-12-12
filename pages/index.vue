<script setup lang="ts">
import { firstMessages } from "~/utils/messages";

const { createChat, sendMessage } = useChat();

async function onSend(msg: string) {
    const chatId = await createChat();
    sendMessage(msg);
    navigateTo(`/chats/${chatId}`);
}
</script>

<template>
    <div class="d-flex align-center justify-center w-100 h-100">
        <v-card class="w-50 h-50">
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
