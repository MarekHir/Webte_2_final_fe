import api from "@/config/axios";
import {useStateStore} from "@/stores/state";

export const getInstructions = async () => {
    const store = useStateStore();
    let result = [];

    await api.get('/api/instructions')
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

    await api.get('/api/instructions/' + id)
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

    await api.patch('/api/instructions/' + id, data)
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

    await api.post('/api/instructions', data)
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

    await api.delete('/api/instructions/' + id)
        .then((response) => {
            result = true;
            store.addAlert(response.data.message, 'success');
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error');
        });

    return result;
}