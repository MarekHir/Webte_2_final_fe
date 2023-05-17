import api from "@/config/axios";
import {useStateStore} from "@/stores/state";

export const addExerciseList = async (data) => {
    let result = false;

    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('name', data.name);
    for(let i = 0; i < data.images.length; i++) {
        formData.append('images[]', data.images[i]);
    }

    await api.post('/api/teacher/exercise-list', formData, {headers: {'content-type': 'multipart/form-data'}})
        .then((response) => {
        result = true;
    }).catch((error) => {
    });
    return result;
}

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