import {sk} from 'vuetify/locale'
import login from "@/locales/views/auth/login/sk";

export default {
    login: login,
    user: {
        role: {
            admin: 'Administátor',
            teacher: 'Učiteľ',
            student: 'Študent',
        }
    },
    $vuetify: {
        ...sk,
        fileInput: {
            ...sk.fileInput,
            counterSize: '1 súbor ({1} celkovo)',
        }
    },
}