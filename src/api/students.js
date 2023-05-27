import {useStateStore} from "@/stores/state";
import api from "@/config/axios";
import i18n from "@/config/i18n";

export const getStudents = async () => {
    const store = useStateStore();
    let result = [];
    await api.get(`/api/${i18n.global.locale.value}/students`)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            result = [];
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}

export const getStudent = async (id) => {
    const store = useStateStore();
    let result = null;
    await api.get(`/api/${i18n.global.locale.value}/teacher/students/${id}`)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            result = [];
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}

export const uploadIcon = async (image, id) => {
    const store = useStateStore();
    let formData = new FormData();
    formData.append('image', image);
    await api.post(`/api/${i18n.global.locale.value}/users/${id}`, formData, {headers: {'content-type': 'multipart/form-data'}})
        .then((response) => {
            store.addAlert(response.data.message, 'success');
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });
}