<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {useI18n} from "vue-i18n";
import Alerts from "@/components/Alerts.vue";
import {useStateStore} from "@/stores/state";
import {storeToRefs} from "pinia";

const {t, locale} = useI18n({useScope: 'global'});
const store = useStateStore();
const {alerts} = storeToRefs(store);

const otherLanguage = () => {
    if (locale.value === 'en') {
        return 'sk'
    }
    return 'en'
}

const changeTo = () => {
    if (locale.value === 'en') {
        locale.value = 'sk';
        return;
    }
    locale.value = 'en';
}

</script>

<template>
    <v-app>
        <header>
            <Alerts/>
            <div class="wrapper">
                <nav v-if="false">
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/about">About</RouterLink>
                    <RouterLink to="/login">Login</RouterLink>
                </nav>
                <div class="float-end">
                    <v-btn @click="changeTo()" rounded="lg">{{ otherLanguage() }}</v-btn>
                </div>
            </div>
        </header>

        <RouterView/>
    </v-app>
</template>

<style scoped>
</style>
