<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "DefaultLayout",
});
</script>
<script setup>

import {computed} from "vue";
import ChangeLanguage from "@/components/ChangeLanguage.vue";
import DarkModeSwitch from "@/components/DarkModeSwitch.vue";
import PortfolioTooltip from "@/components/PortfolioTooltip.vue";
import {useRoute} from "vue-router";

const route = useRoute();

const portfolio = computed(() => {
    return (import.meta.env.VITE_PORTFOLIO === 'true' &&
        (route.name === 'Login' || route.name === 'Registration')) || false;
})
</script>

<template>
    <v-layout full-height>
        <v-app-bar collapse height="48">
            <v-container class="d-flex justify-center align-center">
                <ChangeLanguage/>
                <DarkModeSwitch/>
            </v-container>
        </v-app-bar>
        <PortfolioTooltip v-if="portfolio"/>
        <v-main style="margin-top: -48px;">
            <slot></slot>
        </v-main>
    </v-layout>
</template>