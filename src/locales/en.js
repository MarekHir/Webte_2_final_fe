import { en } from 'vuetify/locale'
import login from "@/locales/views/auth/login/en";
import registration from "@/locales/views/auth/registration/en";
import dashboard from "@/locales/layouts/dashboard/en";
import teacher from "@/locales/views/teacher/en";
import instructions from '@/locales/views/instructions/en'
import exercises_list from '@/locales/views/exercises_set/en'

export default {
    login: login,
    registration: registration,
    instructions: instructions,
    exercises_list: exercises_list,
    language: {
        title: 'Switch to {lang}',
        en: 'English',
        sk: 'Slovak',
    },
    dashboard: dashboard,
    user: {
        role: {
            admin: 'Admin',
            teacher: 'Teacher',
            student: 'Student',
        }
    },
    error: {
        forbidden: 'You are not authorized to access this page.',
        unauthorized: 'You are not authorized to access this page. Please login first.',
        not_found: {
            title: '404 Page not found',
            text: 'The page you are looking for does not exist.',
        },
    },
    bool: {
        true: 'Yes',
        false: 'No',
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