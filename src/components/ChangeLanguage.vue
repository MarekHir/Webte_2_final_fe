<script setup>
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const {t, locale} = useI18n({useScope: 'global'});
const props = defineProps({
    list_item: {
        type: Boolean,
        default: false
    }
});

const otherLanguage = computed(() => {
    if (locale.value === 'en') {
        return 'SK';
    }
    return 'EN';
});

const changeTo = () => {
    if (locale.value === 'en') {
        locale.value = 'sk';
        return;
    }
    locale.value = 'en';
}
</script>

<template>
    <template v-if="props.list_item">
        <v-list-item
                prepend-icon="mdi-translate"
                @click="changeTo"
                :title="t('language.title', {lang: t('language.' + otherLanguage.toLocaleLowerCase())})"/>
    </template>
    <template v-else>
        <v-btn @click="changeTo">{{ otherLanguage }}</v-btn>
    </template>
</template>