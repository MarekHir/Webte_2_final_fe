<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});
const props = defineProps({
    title_key: {
        type: String,
        required: true
    }
});
</script>
<template>
    <v-card-item class="text-center">
        <h1 class="text-h3">
            {{ t(props.title_key) }}
        </h1>
    </v-card-item>
</template>