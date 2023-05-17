import {createI18n} from "vue-i18n";
import sk from "@/locales/sk";
import en from "@/locales/en";


export default createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {sk, en},
})