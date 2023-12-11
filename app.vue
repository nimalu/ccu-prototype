<script setup lang="ts">
const drawer = ref(false);
</script>
<template>
    <NuxtLayout>
        <v-app>
            <v-app-bar>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <v-app-bar-title>Walletwise</v-app-bar-title>
                <v-spacer />
                <v-btn icon="mdi-account-circle" />
            </v-app-bar>
            <v-navigation-drawer v-model="drawer">
                <v-list>
                    <v-list-item title="Navigation drawer"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main>
                <v-layout class="h-100 w-100">
                    <NuxtPage />
                </v-layout>
            </v-main>
        </v-app>
    </NuxtLayout>
</template>
