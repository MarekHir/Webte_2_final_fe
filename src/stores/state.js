import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

export const useStateStore = defineStore('state', () => {
    const alerts = ref([])
    const user = ref(null);

    const isAuthenticated = computed(() => {
        return user.value != null;
    });

    const fullName = computed(() => {
        return user.value ? user.value.first_name + ' ' + user.value.surname : '';
    });

    const userRole = computed(() => {
        return user.value ? user.value.role.charAt(0).toUpperCase() + user.value.role.slice(1) : '';
    });

    const userPicture = computed(() => {
        return user.value && user.value.icon ? user.value.icon : '';
    });

    const isTeacher = computed(() => {
        return user.value ? user.value.role === 'teacher' : false;
    });

    const isStudent = computed(() => {
        return user.value ? user.value.role === 'student' : false;
    });

    const userIcon = computed(() => {
        return isTeacher ? 'mdi-account-tie' : 'mdi-account-school';
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
        userRole,
        userIcon,
        userPicture
    };
})
