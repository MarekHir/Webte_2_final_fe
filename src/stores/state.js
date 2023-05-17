import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
    const alerts = ref([])
    const user = ref({first_name: 'Marek', surname: 'Hirschner', role: 'admin'});
    //
    //

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
        return user.value ? user.value.role === 'admin'  : false;
    });

    const isTeacher = computed(() => {
        return user.value ? ['teacher', 'admin'].includes(user.value.role) : false;
    });

    const isStudent = computed(() => {
        return user.value ? ['student', 'admin'].includes(user.value.role) : false;
    });

    const userIcon = computed(() => {
        if(!user.value) return '';
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
        const alert = {
            message,
            type
        };

        alerts.value.push(alert);

        setTimeout(() => {
            removeAlert(alert);
        }, 5000);
    };

    const removeAlert = (alert) => {
        alerts.value.splice(alerts.value.indexOf(alert), 1);
    }

    const login = (newUser) => {
        user.value = newUser;
    }

    const logout = () => {
        user.value = null;
    }

    const userAllowed = (roles) => {
        if(!user.value) return false;
        if(isAdmin.value) return true;
        return !!roles.includes(user.value.role);
    };

    return {
        alerts,
        user,
        addAlert,
        removeAlert,
        isAuthenticated,
        logout,
        login,
        fullName,
        isTeacher,
        isStudent,
        isAdmin,
        userIcon,
        userPicture,
        userAllowed
    };
})
