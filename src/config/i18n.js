import {createI18n} from "vue-i18n";
import sk from "@/locales/sk";
import en from "@/locales/en";


export default createI18n({
    legacy: false,
    locale: 'sk',
    fallbackLocale: 'en',
    messages: {sk: sk, en: en},
})