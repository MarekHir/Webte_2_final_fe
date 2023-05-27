import {en} from 'vuetify/locale'
import login from "@/locales/views/auth/login/en";
import registration from "@/locales/views/auth/registration/en";
import dashboard from "@/locales/layouts/dashboard/en";
import teacher from "@/locales/views/teacher/en";
import instructions from '@/locales/views/instructions/en'
import exercises_list from '@/locales/views/exercises_lists/en'
import exercise from '@/locales/views/exercise/en'
import user from '@/locales/user/en';
import home from '@/locales/views/home/en';

export default {
    login: login,
    registration: registration,
    home: home,
    instructions: instructions,
    exercises_list: exercises_list,
    exercise: exercise,
    language: {
        title: 'Switch to {lang}',
        en: 'English',
        sk: 'Slovak',
    },
    dashboard: dashboard,
    user: user,
    error: {
        forbidden: 'You are not authorized to access this page.',
        unauthorized: 'You are not authorized to access this page. Please login first.',
        not_found: {
            title: '404 Page not found',
            text: 'The page you are looking for does not exist.',
        },
        failed_connection: 'Failed connecting to the server',
    },
    true: 'Yes',
    false: 'No',
    not_set: 'Not set',
    not_set_date: 'Unlimited',
    theme_mode: {
        dark: 'Switch to light mode',
        light: 'Switch to dark mode',
    },
    button: {
        index: 'Back to list',
        show: 'Show',
        edit: 'Edit',
        create: 'Create',
        delete: 'Delete',
        save: 'Save',
        close: 'Close',
    },
    delete_modal: {
        title: 'Are you sure you want to delete this item?',
    },
    teacher: teacher,
    $vuetify: {
        ...en,
    }
}