import api from "@/config/axios";
import {useStateStore} from "@/stores/state";

export const login = async (data) => {
    const store = useStateStore();

    let result = false;
    await api.get('/sanctum/csrf-cookie');
    await api.post('/api/auth/login', data).then(response => {
        if (response.status === 200) {
            store.login(response.data.user);
            store.addAlert(response.data.message, 'success');
            result = true;
        } else {
            const store = useStateStore();
            store.addAlert(response.data.message, 'error');
            result = false;
        }
    }).catch(error => {
        store.addAlert(error.message, 'error');
        result = false;
    });

    return result;
}

export const logout = async () => {
    const store = useStateStore();

    let result = false;
    await api.post('/api/auth/logout').then(response => {
        if (response.status === 200) {
            store.logout();
            store.addAlert(response.data.message, 'success');
            result = true;
        } else {
            store.addAlert(response.data.message, 'error');
            result = false;
        }
    }).catch(error => {
        console.log(error);
        store.addAlert(error.message, 'error');
        result = false;
    });

    return result;
}

export const register = async (data) => {
    const store = useStateStore();

    let result = false;
    await api.get('/sanctum/csrf-cookie');
    await api.post('/api/auth/registration', data)
        .then(response => {
        if (response.status === 200) {
            store.login(response.data.user);
            store.addAlert(response.data.message, 'success');
            result = true;
        } else {
            store.addAlert(response.data.message, 'error');
            result = false;
        }
    }).catch(error => {
        store.addAlert(error.message, 'error');
        result = false;
    });

    return result;
}