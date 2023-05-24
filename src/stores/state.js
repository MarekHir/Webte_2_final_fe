import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {useToast} from 'vue-toastification';
import {useTheme} from "vuetify";
import i18n from "@/config/i18n";
import {getUser} from "@/api/auth";

export const useStateStore = defineStore('state', () => {
    const toast = useToast();
    const menuHidden = ref(false);
    const show_keyboard = ref(false);
    const theme_name = ref('light');
    const language = ref('en');
    const btn_colors = ref({
        index: 'surface-variant',
        show: 'info',
        edit: 'warning',
        create: 'success',
        delete: 'error',
        save: 'primary',
        submit: 'success',
        close: 'dark'
    })
    const user = ref(null);
    //
    //{id: 2,first_name: 'Marek', surname: 'Hirschner', role: 'admin'}

    const isAuthenticated = computed(() => {
        return user.value != null;
    });

    const fullName = computed(() => {
        return user.value ? user.value.first_name + ' ' + user.value.surname : '';
    });

    const userPicture = computed(() => {
        return user.value && user.value.icon ? user.value.icon : '';
    });

    const isAdmin = computed(() => {
        return user.value ? user.value.role === 'admin' : false;
    });

    const isTeacher = computed(() => {
        return user.value ? ['teacher', 'admin'].includes(user.value.role) : false;
    });

    const isStudent = computed(() => {
        return user.value ? ['student', 'admin'].includes(user.value.role) : false;
    });

    const userIcon = computed(() => {
        if (!user.value) return '';
        switch (user.value.role) {
            case 'admin':
                return 'mdi-account-cog';
            case 'teacher':
                return 'mdi-account-tie';
            case 'student':
                return 'mdi-account-school';
            default:
                return 'mdi-account';
        }
    });

    const addAlert = (message, type) => {
        toast(message, {type: type});
    };

    const login = (newUser) => {
        user.value = newUser;
    }

    const logout = () => {
        user.value = null;
    }

    const userAllowed = (roles) => {
        if (!user.value) return false;
        if (isAdmin.value) return true;
        return !!roles.includes(user.value.role);
    };

    return {
        user,
        addAlert,
        isAuthenticated,
        logout,
        login,
        fullName,
        isTeacher,
        menuHidden,
        isStudent,
        btn_colors,
        isAdmin,
        userIcon,
        userPicture,
        userAllowed,
        show_keyboard,
        language,
        theme_name
    };
}, {
    persist: {
        paths: ['user', 'theme_name', 'language'], afterRestore: async (ctx) => {
            let theme = useTheme()
            theme.global.name.value = ctx.store.theme_name;
            i18n.global.locale.value = ctx.store.language;
            await getUser()
        }
    }
})
// TODO: Callback refresh user data