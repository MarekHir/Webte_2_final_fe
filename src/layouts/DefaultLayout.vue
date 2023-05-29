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

const location = computed(() => {
    return 'Login';

});
</script>

<template>
    <v-layout full-height>
        <v-app-bar collapse height="48">
            <v-container class="d-flex justify-center align-center">
                <ChangeLanguage/>
                <DarkModeSwitch/>
            </v-container>
        </v-app-bar>
        <v-main style="margin-top: -48px;">
            <slot></slot>
        </v-main>
    </v-layout>
</template>