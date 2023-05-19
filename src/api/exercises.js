import {useStateStore} from "@/stores/state";
import api from "@/config/axios";
import i18n from "@/config/i18n";

export const generateExercises = async (exercises) => {
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