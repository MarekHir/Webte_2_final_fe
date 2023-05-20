<script setup>
import api from '@/config/axios.js'
import {ref} from "vue";
import {useTheme} from "vuetify";

const status = ref('Nothing yet')
const data = ref('Nothing yet')
const theme = useTheme();
const getData = () => {
    api.get('/api/user').then((response) => {
        status.value = response.status;
        data.value = response.data;
    }).catch(() => {
        status.value = "Error";
    });
}
</script>

<template>
    <main>
        <p>Main page</p>
        <v-btn @click="getData"></v-btn>
        <p>{{ status }}</p>
        <p>{{ data }}</p>
        <p v-for="(value, key) in theme.global.current.value.colors" :style="`color: ${value};`" class="text-center">{{key}}</p>
    </main>
</template>
