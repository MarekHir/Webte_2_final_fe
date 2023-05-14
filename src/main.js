import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import {createI18n, useI18n} from 'vue-i18n'
import en from './locales/en.js'
import sk from './locales/sk.js'


const app = createApp(App)

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createVueI18nAdapter} from "vuetify/locale/adapters/vue-i18n";
// import { en, sk } from 'vuetify/locale'

const i18n = createI18n({
    legacy: false,
    locale: 'sk',
    fallbackLocale: 'en',
    messages: {sk: sk, en: en},
})

const vuetify = createVuetify({
    components,
    directives,
    locale: {
        adapter: createVueI18nAdapter({i18n, useI18n}),
    },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
