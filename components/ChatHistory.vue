<script setup lang="ts">
import { useChats } from "~/composables/useChat";
const { chats, fetchChats } = useChats();
fetchChats();

const filterTerm = ref("");
const items = computed(() => {
    if (filterTerm.value == "") {
        return chats.value
    }
    const term = filterTerm.value.toLowerCase()
    function containsTerm(c: Chat) {
        if (c.title.toLowerCase().includes(term)) {
            return true
        }
        if (c.events.find(e => {
            if (e.eventName == "expertMessage") {
                let ex = e as ExpertMessage
                if (ex.author.name.toLowerCase().includes(term)) {
                    return true
                }
                if (ex.message.toLowerCase().includes(term)) {
                    return true
                }
                if (ex.simpleMessage.toLowerCase().includes(term)) {
                    return true
                }
            } else if (e.eventName == "userMessage") {
                let ex = e as UserMessage
                if (ex.message.toLowerCase().includes(term)) {
                    return true
                }
            }
        })) {
            return true
        }
    }
    return chats.value.filter(containsTerm)
});

const fetcher = setInterval(fetchChats, 2000);
onUnmounted(() => clearInterval(fetcher));

const searchInput = ref("");
function createDebounce() {
    let timeout: ReturnType<typeof setTimeout>;
    return function <T extends Function>(fnc: T, delayMs?: number) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, delayMs || 500);
    };
}
const debounce = createDebounce()
watch(searchInput, (newInput) =>
    debounce(() => (filterTerm.value = newInput), 400)
);
</script>
<template>
    <div class="pa-2">
        <v-text-field
            v-model="searchInput"
            density="compact"
            label="Search conversations"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
        />
        <v-list>
            <v-list-item
                v-for="chat in items"
                :key="chat.id"
                :value="chat"
                :prepend-avatar="
                    (chat.events[1] as ExpertMessage).author.avatar
                "
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
    </div>
</template>
