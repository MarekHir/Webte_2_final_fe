<script setup>
import api from '@/config/axios.js'
import {ref} from "vue";

const status = ref('Nothing yet')
const data = ref('Nothing yet')
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
    </main>
</template>
