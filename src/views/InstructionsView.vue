<script setup>

import {useStateStore} from "@/stores/state";

const store = useStateStore();
</script>
<template>
    <h1>
        Instructions
    </h1>
    <p>Is authenticated: {{store.isAuthenticated}}</p>
</template>