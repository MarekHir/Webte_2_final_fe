import {sk} from 'vuetify/locale'
import login from "@/locales/views/auth/Login/sk";
import registration from "@/locales/views/auth/Registration/sk";
import dashboard from "@/locales/layouts/Dashboard/sk";
import teacher from "@/locales/views/teacher/sk";
import instructions from '@/locales/views/instructions/sk'
import exercises_list from '@/locales/views/exercises_lists/sk'
import exercise from '@/locales/views/exercise/sk'
import user from '@/locales/user/sk';
import home from '@/locales/views/home/sk';
import validation from '@/locales/validation/sk';

export default {
    login: login,
    registration: registration,
    home: home,
    instructions: instructions,
    exercises_list: exercises_list,
    exercise: exercise,
    language: {
        title: 'Prepnúť na {lang}',
        en: 'Angličtina',
        sk: 'Slovenčina',
    },
    dashboard: dashboard,
    user: user,
    error: {
        forbidden: 'Nemáte oprávnenie na prístup k tejto stránke.',
        unauthorized: 'Nemáte oprávnenie na prístup k tejto stránke. Prosím, prihláste sa.',
        not_found: {
            title: '404 Stránka nenájdená',
            text: 'Stránka, ktorú hľadáte, neexistuje.',
        },
        failed_connection: 'Pripojenie k serveru zlyhalo',
    },
    true: 'Áno',
    false: 'Nie',
    not_set: 'Nenastavené',
    not_set_date: 'Neobmedzené',
    theme_mode: {
        dark: 'Prepnúť na svetlý režim',
        light: 'Prepnúť na tmavý režim',
    },
    button: {
        index: 'Späť na zoznam',
        show: 'Zobraziť',
        edit: 'Upraviť',
        create: 'Vytvoriť',
        delete: 'Zmazať',
        save: 'Uložiť',
        close: 'Zavrieť',
    },
    delete_modal: {
        title: 'Ste si istí, že chcete zmazať túto položku?',
    },
    validation: validation,
    teacher: teacher,
    $vuetify: {
        ...sk,
    }
}