import api from "@/api/axios";
import { createCookie } from "@/api/axios";
import {useStateStore} from "@/stores/state";

export const login = async (email, password) => {
    const store = useStateStore();

    await createCookie();
    await api.post('/auth/login', {
        email,
        password
    }).then(response => {
        if(response.code === 200) {
            return true;
        } else{
            const store = useStateStore();
            store.addAlert(response.data.message, 'error');
            return false;
        }
    }).catch(error => {
        store.addAlert(error.message, 'error');
        return false;
    });
}

export const logout = async () => {
    const store = useStateStore();

    await api.post('/logout').then(response => {
        if(response.code === 200) {
            return true;
        } else{
            store.addAlert(response.data.message, 'error');
            return false;
        }
    }).catch(error => {
        store.addAlert(error.message, 'error');
        return false;
    });
}

export const register = async (name, email, password) => {
    const store = useStateStore();

    await createCookie();
    await api.post('/auth/registration', {
        name,
        email,
        password,
    }).then(response => {
        if(response.code === 200) {
            return true;
        } else{
            store.addAlert(response.data.message, 'error');
            return false;
        }
    }).catch(error => {
        store.addAlert(error.message, 'error');
        return false;
    });
}