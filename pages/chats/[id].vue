<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
</script>

<template>
    <div class="d-flex flex-column chat-container">
        <div class="overflow-y-auto w-100">
            <div class="w-chat">
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
        </div>
        <div class="w-chat">
            <v-text-field placeholder="Message Ethan Reynolds">
                <template v-slot:append>
                    <v-btn icon="mdi-send" variant="text" />
                </template>
            </v-text-field>
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
