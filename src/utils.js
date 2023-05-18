import {getInstruction} from "@/api/instructions";
import {useStateStore} from "@/stores/state";

export const fullName = (user) => {
    return user ? user.first_name + ' ' + user.surname : '';
};

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
        case 'EditExercisesSet':
            data = await getExercisesSet(id).catch(() => null); // TODO: handle error
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
                if(data.created_by === store.user.id || data.created_by.id === store.user.id ) return true;
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