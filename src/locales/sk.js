import {sk} from 'vuetify/locale'
import login from "@/locales/views/auth/login/sk";
import registration from "@/locales/views/auth/registration/sk";
import dashboard from "@/locales/layouts/dashboard/sk";
import teacher from "@/locales/views/teacher/sk";
import instructions from "@/locales/views/instructions/sk";
import exercises_list from "@/locales/views/exercises_lists/sk";

export default {
    login: login,
    registration: registration,
    instructions: instructions,
    exercises_list: exercises_list,
    language: {
        title: 'Prepnite na {lang}',
        en: 'Angličtinu',
        sk: 'Slovenský',
    },
    dashboard: dashboard,
    user: {
        role: {
            admin: 'Admin',
            teacher: 'Učiteľ',
            student: 'Študent',
        }
    },
    error: {
        forbidden: 'Nemáte oprávnenie na prístup na túto stránku.',
        unauthorized: 'Nemáte oprávnenie na prístup na túto stránku. Najprv sa prihláste.',
        not_found: {
            title: 'Stránka nebola nájdená',
            text: 'Stránka, ktorú hľadáte, neexistuje.',
        },
        failed_connection: 'Nepodarilo sa pripojiť na server',
    },
    true: 'Áno',
    false: 'Nie',
    not_set: 'Nie je nastavené',
    button: {
        index: 'Späť na zoznam',
        show: 'Zobraziť',
        edit: 'Upraviť',
        create: 'Vytvoriť',
        delete: 'Odstrániť',
        save: 'Uložiť',
        close: 'Zatvoriť',
    },
    delete_modal: {
        title: 'Ste si istí, že chcete túto položku odstrániť?',
    },
    teacher: teacher,
    $vuetify: {
        ...sk,
    }
}