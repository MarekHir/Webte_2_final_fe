import { sk } from 'vuetify/locale'
import login from "@/locales/views/auth/login/sk";
import registration from "@/locales/views/auth/registration/sk";
import dashboard from "@/locales/layouts/dashboard/sk";
import teacher from "@/locales/views/teacher/sk";

export default {
    login: login,
    registration: registration,
    language: {
        title: 'Prepnite na {lang}',
        en: 'Anglický',
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
    },
    teacher: teacher,
    $vuetify: {
        ...sk,
    }
}