import api from "@/config/axios";
import {useStateStore} from "@/stores/state";
import i18n from "@/config/i18n";

export const createExerciseList = async (data) => {
    const store = useStateStore()
    let result = false;

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
        if(key === 'images') {
            for(let i = 0; i < data.images.length; i++) {
                formData.append('images[]', data.images[i]);
            }
        } else {
            if(!data[key])
                data[key] = '';
            formData.append(key, data[key]);
        }
    });


    await api.post(`/api/${i18n.global.locale.value}/exercises-list`, formData, {headers: {'content-type': 'multipart/form-data'}})
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error')
        });
    return result;
}

export const getExerciseLists = async (options = null) => {
    const store = useStateStore()
    let result = false;
    await api.get(`/api/${i18n.global.locale.value}/exercises-list`, options ? {params: options} : null)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error')
        });

    return result;
}

export const getExerciseListsByName = async (name) => {
    const store = useStateStore()
    let result = false;

    await api.get(`/api/${i18n.global.locale.value}/exercises-list`, {params: {param: name, search_by: 'name'}})
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error')
        });

    return result;
}

export const getExerciseList = async (id) => {
    const store = useStateStore()
    let result = false;

    await api.get(`/api/${i18n.global.locale.value}/exercises-list/${id}`)
        .then((response) => {
            result = response.data;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error')
        });

    return result;
}


// TODO: maybe add success message to update delete and create in api files

export const patchExerciseList = async (data, id) => {
    const store = useStateStore()
    let result = false;

    await api.patch(`/api/${i18n.global.locale.value}/exercises-list/${id}`, data)
        .then(() => {
            result = true;
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error')
        });

    return result;
}

export const deleteExerciseList = async (id) => {
    const store = useStateStore()
    let result = false;

    await api.delete(`/api/${i18n.global.locale.value}/exercises-list/${id}`)
        .then((response) => {
            result = true;
            store.addAlert(response.data.message, 'success');
        }).catch((error) => {
            store.addAlert(error.response.data.message, 'error')
        });

    return result;
}

