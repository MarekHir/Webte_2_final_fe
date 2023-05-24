<script setup>
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useStateStore} from "@/stores/state";
import {storeToRefs} from "pinia";

const {t, locale} = useI18n({useScope: 'global'});
const store = useStateStore();
const {language} = storeToRefs(store);
const props = defineProps({
    list_item: {
        type: Boolean,
        default: false
    }, class: {
        type: String,
        default: ''
    }
});

const otherLanguage = computed(() => {
    if (locale.value === 'en') {
        return 'SK';
    }
    return 'EN';
});

const changeTo = () => {
    if (locale.value === 'en')
        locale.value = 'sk';
    else
        locale.value = 'en';

    language.value = locale.value;
}
</script>

<template>
    <template v-if="props.list_item">
        <v-list-item
                :class="props.class"
                prepend-icon="mdi-translate"
                @click="changeTo"
                :title="t('language.title', {lang: t('language.' + otherLanguage.toLocaleLowerCase())})"/>
    </template>
    <template v-else>
        <v-btn @click="changeTo">{{ otherLanguage }}</v-btn>
    </template>
</template>