import {useStateStore} from "@/stores/state";
import api from "@/config/axios";

export const getStudents = async () => {
    const store = useStateStore();
    let result = [];
    await api.get('/api/teacher/students')
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
    await api.get('/api/teacher/students/' + id)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            result = [];
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}