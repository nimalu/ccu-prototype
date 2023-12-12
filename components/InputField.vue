<script setup lang="ts">
defineProps<{
    options: string[];
}>();
const emit = defineEmits(["send"]);

const selectionOpen = ref(false);
const message = ref<string>();

function select(option: string) {
    selectionOpen.value = false;
    message.value = option;
}

function send() {
    emit("send", message.value);
    message.value = undefined;
}
</script>
<template>
    <div>
        <v-sheet class="mb-4" v-if="selectionOpen">
            <div v-if="options.length == 0">No options</div>
            <v-card
                v-for="option in options"
                link
                variant="outlined"
                class="mt-1"
                @click="() => select(option)"
            >
                <v-card-item>
                    {{ option}}
                </v-card-item>
            </v-card>
        </v-sheet>
        <v-text-field
            :value="message"
            placeholder="Message Ethan Reynolds"
            @click:control="selectionOpen = !selectionOpen"
        >
            <template v-slot:append>
                <v-btn :disabled="message == undefined" icon="mdi-send" variant="text" @click="send" />
            </template>
        </v-text-field>
    </div>
</template>
