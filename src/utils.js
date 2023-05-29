import {getInstruction} from "@/api/instructions";
import {useStateStore} from "@/stores/state";
import {getUser} from "@/api/auth";
import Exercise from "@/models/Exercise";
import ExercisesList from "@/models/ExercisesList";
import i18n from "@/config/i18n";

export const fullName = (user) => {
    return user ? user.first_name + ' ' + user.surname : '';
};

export const getLocaleMessagesForNamespace = (nameSpace) => {
    const t = i18n.global.t;
    return {
        mixed: {
            notType: ({path, type}) => t('validation.notType', {path: `${nameSpace}.${path}`, type}),
            required: ({path}) => t('validation.required', {path: `${nameSpace}.${path}`}),
        },
        string: {
            min: ({path, min}) => t('validation.string.min', {path: `${nameSpace}.${path}`, min}),
            max: ({path, max}) => t('validation.string.max', {path: `${nameSpace}.${path}`, max}),
            email: ({path}) => t('validation.string.email', {path: `${nameSpace}.${path}`}),
            minLowercase: ({path, min}) => t('validation.string.minLowercase', {path: `${nameSpace}.${path}`, min}),
            minUppercase: ({path, min}) => t('validation.string.minUppercase', {path: `${nameSpace}.${path}`, min}),
            minNumbers: ({path, min}) => t('validation.string.minNumbers', {path: `${nameSpace}.${path}`, min}),
            minSymbols: ({path, min}) => t('validation.string.minSymbols', {path: `${nameSpace}.${path}`, min}),
        },
        number: {
            min: ({path, min}) => t('validation.number.min', {path: `${nameSpace}.${path}`, min}),
            max: ({path, max}) => t('validation.number.max', {path: `${nameSpace}.${path}`, max}),
        },
        array: {
            length: ({path, length}) => t('validation.array.length', {path: `${nameSpace}.${path}`, length}),
        }
    }
}


export const onInvalidSubmit = ({errors}) => {
    const store = useStateStore();
    if (errors == null || errors.length === 0)
        return;

    Object.keys(errors).forEach((field_key) => {
        store.addAlert(errors[field_key], 'warning');
    });
}

const getDataForPath = async (path_name, id) => {
    let data;
    switch (path_name) {
        case 'ShowInstruction':
        case 'EditInstruction':
            data = await getInstruction(id).catch(() => null); // TODO: handle error
            break;
        case 'EditExercisesList':
            data = await ExercisesList.with('created_by').find(id).catch(() => null); // TODO: handle error
            break;
        case 'ShowExercise':
        case 'SolveExercise':
            data = await Exercise.with('created_by').find(id).catch(() => null); // TODO: handle error
            break;
    }
    return data;
};

export const policyManager = async (allowed_roles, path_name, id) => {
    const store = useStateStore();

    if (!store.user) return false;
    if (store.isAdmin) return true;

    for (const role of allowed_roles) {
        let data;
        switch (role) {
            case 'student':
                if (store.isStudent) return true;
                break;
            case 'teacher':
                if (store.isTeacher) return true;
                break;
            case 'owner':
                if (id == null) return false;
                data = await getDataForPath(path_name, id);
                if(data == null) break;
                if(data.created_by === store.user.id || data.created_by?.id === store.user.id ) return true;
                break;
            case 'student_special_instructions':
                if(!store.isStudent) break;
                if (id == null) return false;
                data = await getDataForPath(path_name, id);
                if(data == null) break;
                if(['student', 'all'].includes(data.for_user_type)) return true;
                break;
        }
    }

    return false;
}