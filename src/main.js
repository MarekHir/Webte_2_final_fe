import {createApp} from 'vue'
import {createPinia} from 'pinia'
import { registerLayouts } from './layouts/register';
import '@/assets/main.css'


import App from './App.vue'
import router from './router'
import i18n from './config/i18n';
import createVuetify from "@/config/vuetify";


const app = createApp(App)

const vuetify = createVuetify(i18n);

app.use(createPinia())
app.use(i18n)
app.use(vuetify)
app.use(router)
registerLayouts(app);


app.mount('#app')

