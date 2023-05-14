<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {useI18n} from "vue-i18n";

const { t, locale } = useI18n({ useScope: 'global' });

const otherLanguage = () => {
    if(locale.value === 'en') {
        return 'sk'
    }
    return 'en'
}

const changeTo = () => {
    if(locale.value === 'en') {
        locale.value = 'sk';
        return;
    }
    locale.value = 'en';
}

</script>

<template>
    <v-app>
        <header>
            <div class="wrapper">
                <nav v-if="false">
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/about">About</RouterLink>
                    <RouterLink to="/login">Login</RouterLink>
                </nav>
                <v-btn @click="changeTo()">{{otherLanguage()}}</v-btn>
            </div>
        </header>

        <RouterView/>
    </v-app>
</template>

<style scoped>
</style>
