import api from "@/config/axios";

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