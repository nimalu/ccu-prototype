<script setup lang="ts">
const drawer = ref(false);
</script>
<template>
    <NuxtLayout>
        <v-app>
            <v-app-bar>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <v-app-bar-title>
                    <NuxtLink to="/" class="walletwise-title">
                        Walletwise
                    </NuxtLink>
                </v-app-bar-title>
                <v-spacer />
                <v-btn icon="mdi-account-circle" />
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" :width="400">
                <ChatHistory />
            </v-navigation-drawer>

            <v-main>
                <v-layout class="h-100">
                    <NuxtPage />
                </v-layout>
            </v-main>
        </v-app>
    </NuxtLayout>
</template>

<style>
.walletwise-title {
    color: inherit;
    text-decoration: none;
}
</style>
