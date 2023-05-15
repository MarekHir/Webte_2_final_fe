import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createVueI18nAdapter} from "vuetify/locale/adapters/vue-i18n";
import {useI18n} from 'vue-i18n'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// import { en, sk } from 'vuetify/locale'

export default (i18n) =>{
    return createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
        },
        locale: {
            adapter: createVueI18nAdapter({i18n, useI18n}),
        },
    })
}