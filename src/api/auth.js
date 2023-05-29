import api from "@/config/axios";
import {useStateStore} from "@/stores/state";
import i18n from "@/config/i18n";

export const login = async (data) => {
    const store = useStateStore();

    let result = false;

    let network_error = await api.get('/sanctum/csrf-cookie')
        .then(() => false).catch(() => true);

    if (network_error) {
        store.addAlert(i18n.global.t('error.failed_connection'), 'error');
        return false;
    }
    await api.post(`/api/${i18n.global.locale.value}/auth/login`, data).then(response => {
            store.login(response.data.user);
            store.addAlert(response.data.message, 'success');
            result = true;
        }).catch(error => {
        store.addAlert(error.response.data.message, 'error');
        result = false;
    });

    return result;
}

export const logout = async () => {
    const store = useStateStore();

    let result = false;
    await api.post(`/api/${i18n.global.locale.value}/auth/logout`).then(response => {
        store.logout();
        store.addAlert(response.data.message, 'success');
        result = true;
    }).catch(error => {
        store.logout();
        store.addAlert(error.response.data.message, 'error');
        result = false;
    });

    return result;
}

export const register = async (data) => {
    const store = useStateStore();

    let result = false;

    let network_error = await api.get('/sanctum/csrf-cookie')
        .then(() => false).catch(() => true);

    if (network_error) {
        store.addAlert(i18n.global.t('error.failed_connection'), 'error');
        return false;
    }

    await api.post(`/api/${i18n.global.locale.value}/auth/registration`, data)
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
            store.addAlert(error.response.data.message, 'error');
            result = false;
        });

    return result;
}

export const getUser = async () => {
    const store = useStateStore();

    await api.get(`/api/${i18n.global.locale.value}/auth/user`).then(response => {
        store.login(response.data);
    }).catch(error => {
        store.logout();
    });
}