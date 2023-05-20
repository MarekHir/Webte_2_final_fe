import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerLayouts } from './layouts/register';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { Model } from 'vue-api-query'
import axios from '@/config/axios';
Model.$http = axios;

import App from './App.vue'
import router from './router'
import i18n from './config/i18n';
import createVuetify from "@/config/vuetify";


const app = createApp(App)

const vuetify = createVuetify(i18n);

const toastOptions = {
    position: "top-center",
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    timeout: 3000,
};

const pipia = createPinia();
pipia.use(piniaPluginPersistedstate);

app.use(pipia)
app.use(i18n)
app.use(vuetify)
app.use(router)
app.use(Toast, toastOptions);
registerLayouts(app);

app.mount('#app')

