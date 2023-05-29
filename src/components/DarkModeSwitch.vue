<script setup>
import {useTheme} from "vuetify";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {useStateStore} from "@/stores/state";
const theme = useTheme();
const store = useStateStore();
const {theme_name} = storeToRefs(store);
const {t} = useI18n({useScope: 'global'});
const props = defineProps({
    list_item: {
        type: Boolean,
        default: false
    }, class: {
        type: String,
        default: ''
    }
});

const toggleDarkMode = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
<template>
    <v-list-item  v-if="props.list_item" prepend-icon="mdi-theme-light-dark"
                  :title="t(`theme_mode.${theme.global.name.value}`)" @click="toggleDarkMode()" :class="props.class">
    </v-list-item>
    <v-btn v-else @click="toggleDarkMode()" prepend-icon="mdi-theme-light-dark"/>
</template>