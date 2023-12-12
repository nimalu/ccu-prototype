<script setup lang="ts">
defineProps<{
    name: string;
    avatar?: string;
    message: string;
    simpleMessage?: string;
    favored?: boolean;
    loading?: boolean;
}>();
const emit = defineEmits(["update:favored"]);
const simplified = ref(false);
</script>
<template>
    <div class="d-flex my-6">
        <v-avatar color="surface-variant">
            <v-img :src="avatar" />
        </v-avatar>
        <div class="ml-4 flex-grow-1">
            <div class="font-weight-bold">{{ name }}</div>
            <v-skeleton-loader :loading="loading" type="paragraph" class="px-0">
                <p>
                    {{ simplified ? simpleMessage : message }}
                </p>
                <div class="d-flex align-center mt-2 w-100">
                    <v-btn
                        @click.stop="emit('update:favored', !favored)"
                        :prepend-icon="
                            favored ? 'mdi-heart' : 'mdi-heart-outline'
                        "
                        variant="outlined"
                    >
                        Favor
                    </v-btn>
                    <div class="flex-grow-1"></div>
                    <div v-if="simpleMessage">
                        <v-switch
                            label="Simple Language"
                            v-model="simplified"
                            inset
                            hide-details
                        />
                    </div>
                </div>
            </v-skeleton-loader>
        </div>
    </div>
</template>

<style>
.v-skeleton-loader__text {
    margin-left: 0 !important;
}
</style>
