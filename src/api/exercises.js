import {useStateStore} from "@/stores/state";
import api from "@/config/axios";
import i18n from "@/config/i18n";

export const generateExercises = async (data) => {
    const store = useStateStore();
    let result = false;

    await api.post(`/api/${i18n.global.locale.value}/exercises`, data)
        .then((response) => {
            store.addAlert(response.data.message, 'success')
            result = true;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}

export const getDashboard = async () => {
    const store = useStateStore();
    let result = {};

    await api.get(`/api/${i18n.global.locale.value}/dashboard/${store.user.role}`)
        .then((response) => {
            result = response.data;
        }).catch((error) => { // TODO error handling
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}