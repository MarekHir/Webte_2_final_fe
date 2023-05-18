import api from "@/config/axios";
import {useStateStore} from "@/stores/state";

export const getExercisesSets = async () => {
    const store = useStateStore()
    let result = false;

    await api.get('/api/exercises-set').then((response) => {
        result = response.data;
    }).catch((error) => {
        store.addAlert(error.response.data.message, 'error')
    });

    return result;
}

export const getExercisesSet = async (id) => {
    const store = useStateStore()
    let result = false;

    await api.get('/api/exercises-set/' + id).then((response) => {
        result = response.data;
    }).catch((error) => {
        store.addAlert(error.response.data.message, 'error')
    });

    return result;
}

// TODO: maybe add success message to update delete and create in api files
export const createExercisesSet = async (data) => {
    const store = useStateStore()
    let result = false;

    await api.post('/api/exercises-set', data).then((response) => {
        result = response.data;
    }).catch((error) => {
        store.addAlert(error.response.data.message, 'error')
    });

    return result;
}

export const patchExercisesSet = async (data, id) => {
    const store = useStateStore()
    let result = false;

    await api.patch('/api/exercises-set/' + id, data).then((response) => {
        result = response.data;
    }).catch((error) => {
        store.addAlert(error.response.data.message, 'error')
    });

    return result;
}

export const deleteExercisesSet = async (id) => {
    const store = useStateStore()
    let result = false;

    await api.delete('/api/exercises-set/' + id).then((response) => {
        result = true;
        store.addAlert(response.data.message, 'success');
    }).catch((error) => {
        store.addAlert(error.response.data.message, 'error')
    });

    return result;
}