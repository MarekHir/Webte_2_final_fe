<script setup>


import {onMounted, ref, watch} from "vue";
import {useTheme} from "vuetify";
import {useI18n} from "vue-i18n";

const theme = useTheme();
const local_theme = ref(theme.global.name.value);
const {t} = useI18n();
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

onMounted(() => {
    emit('update:modelValue', local_theme.value)
});

const switchTheme = () => {
    local_theme.value = local_theme.value === 'light' ? 'dark' : 'light';
    emit('update:modelValue', local_theme.value);
}

watch(theme.global.name, (value, oldValue) => {
    if (oldValue === local_theme.value)
        local_theme.value = value;
    else
        local_theme.value = oldValue;
    emit('update:modelValue', local_theme.value);
});
</script>

<template>
    <v-btn variant="outlined" @click="switchTheme()" color="secondary" prepend-icon="mdi-theme-light-dark"
           :text="t('instructions.paper_color')"/>
</template>