import api from "@/config/axios";
import {useStateStore} from "@/stores/state";

export const addExerciseList = async (data) => {
    const store = useStateStore()
    let result = false;

    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('name', data.name);
    for(let i = 0; i < data.images.length; i++) {
        formData.append('images[]', data.images[i]);
    }

    await api.post('/api/exercise-list', formData, {headers: {'content-type': 'multipart/form-data'}})
        .then((response) => {
            result = true;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'danger')
        });
    return result;
}

export const getExerciseLists = async () => {
    const store = useStateStore()
    let result = false;

    await api.get('/api/exercise-list')
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'danger')
        });

    return result;
}

export const getExerciseListsByName = async (name) => {
    const store = useStateStore()
    let result = false;

    await api.get('/api/exercise-list', {params: {param: name, search_by: 'name'}})
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'danger')
        });

    return result;
}