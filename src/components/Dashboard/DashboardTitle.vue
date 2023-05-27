<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});
const props = defineProps({
    title_key: {
        type: String,
        required: true
    },
    trans_options: {
        type: Object,
        default: () => ({})
    },
    class: {
        type: String,
        default: ''
    }
});
</script>
<template>
    <v-card-title class="text-center" :class="props.class">
        <v-row>
            <v-col cols="12" lg="4" class="d-flex justify-start align-center">
                <slot name="append">
                </slot>
            </v-col>
            <v-col cols="12" lg="4">
                <h1 class="text-h3">
                    {{ t(props.title_key, trans_options) }}

                </h1>
            </v-col>
            <v-col cols="12" lg="4" class="d-flex justify-end align-center">
                <slot name="prepend">
                </slot>
            </v-col>
        </v-row>
    </v-card-title>
</template>