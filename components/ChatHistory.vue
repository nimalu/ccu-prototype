<script setup lang="ts">
import { useChats } from "~/composables/useChat";
const { chats, fetchChats } = useChats();
fetchChats();

const items = chats;

const fetcher = setInterval(fetchChats, 2000);
onUnmounted(() => clearInterval(fetcher));
</script>
<template>
    <v-list>
        <v-list-item
            v-for="chat in items"
            :key="chat.id"
            :value="chat"
            :prepend-avatar="(chat.events[1] as ExpertMessage).author.avatar"
            :to="`/chats/${chat.id}`"
        >
            <v-list-item-title>
                {{ chat.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ (chat.events[1] as ExpertMessage).author.name }}
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>
