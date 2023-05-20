<script setup>
import {useTheme} from "vuetify";
import {useI18n} from "vue-i18n";
const theme = useTheme();
const {t} = useI18n({useScope: 'global'});

const toggleDarkMode = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
<template>
    <v-switch @update:modelValue="toggleDarkMode()" :label="t('dark_mode_switch')"/>
</template>