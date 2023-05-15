import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStateStore } from "@/stores/state";
import i18n from "@/config/i18n";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            meta: {
                layout: 'Dashboard'
            }
        }, {
            path: '/login',
            name: 'Login',
            component: () => import('../views/LoginView.vue'),
            meta: {
                layout: 'Default',
                auth: false,
            }
        },
        {
            path: '/registration',
            name: 'Registration',
            component: () => import('../views/RegistrationView.vue'),
            meta: {
                layout: 'Default',
                auth: false,
            }
        },
        {
            path: '/instructions',
            name: 'Instructions',
            component: () => import('../views/InstructionsView.vue'),
            meta: {
                layout: 'Dashboard'
            }
        },
        {
            path: '/NotFound',
            name: 'NotFound',
            component: () => import('../views/NotFoundView.vue'),
            meta: {
                layout: 'Default',
                auth: false,
            }
        },
        {
            path: '/:catchAll(.*)*',
            redirect: '/NotFound',
            meta: {
                auth: false,
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const store = useStateStore();
    const {t} = i18n.global;

    let pageAuth = to.meta.auth !== undefined ? to.meta.auth : true;
    if (pageAuth && !store.isAuthenticated) {
        store.addAlert(t('error.unauthorized'), 'warning');
        next('/login');
    }
    next();
});

export default router
