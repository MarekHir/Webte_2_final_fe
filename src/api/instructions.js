import api from "@/config/axios";
import {useStateStore} from "@/stores/state";
import i18n from "@/config/i18n";

export const getInstructions = async () => {
    const store = useStateStore();
    let result = [];

    await api.get(`/api/${i18n.global.locale.value}/instructions`)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}

export const getInstruction = async (id) => {
    const store = useStateStore();
    let result = null;

    await api.get(`/api/${i18n.global.locale.value}/instructions/${id}`)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}

export const patchInstruction = async (data, id) => {
    const store = useStateStore();
    let result = null;

    await api.patch(`/api/${i18n.global.locale.value}/instructions/${id}`, data)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}

export const createInstruction = async (data) => {
    const store = useStateStore();
    let result = null;

    await api.post(`/api/${i18n.global.locale.value}/instructions`, data)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}

export const deleteInstruction = async (id) => {
    const store = useStateStore();
    let result = false;

    await api.delete(`/api/${i18n.global.locale.value}/instructions/${id}`)
        .then((response) => {
            result = true;
            store.addAlert(response.data.message, 'success');
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}