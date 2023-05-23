<script setup>
const props = defineProps({
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '',
        required: false
    },
    subtitle_size: {
        type: String,
        default: 'h5',
        required: false
    }
});
</script>
<template>
    <v-card-subtitle class="text-center">
        <v-row>
            <v-col cols="12" lg="4">
                <slot name="append">
                </slot>
            </v-col>
            <v-col cols="12" lg="4">
                <h1 :class="`text-${props.subtitle_size}`">
                    {{ props.subtitle }}
                </h1>
            </v-col>
            <v-col cols="12" lg="4">
                <slot name="prepend">
                </slot>
            </v-col>
        </v-row>
    </v-card-subtitle>
    <v-card-item v-if="props.description !== ''" class="text-disabled py-0">
        <p class="mx-auto w-75 text-subtitle-1 text-center text-break">
            {{ props.description }}
        </p>
    </v-card-item>
</template>