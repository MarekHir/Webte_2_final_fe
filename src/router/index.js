import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useStateStore} from "@/stores/state";
import {policyManager} from "@/utils";
import i18n from "@/config/i18n";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            meta: {
                layout: 'Dashboard'
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/LoginView.vue'),
            meta: {
                layout: 'Default',
                auth: false,
            }
        },
        {
            path: '/registration',
            name: 'Registration',
            component: () => import('../views/RegistrationView.vue'),
            meta: {
                layout: 'Default',
                auth: false,
            }
        },
        {
            path: '/student/exercise',
            redirect: HomeView,
            meta: {
                layout: 'Dashboard',
                allowed: ['student'],
            },
            children: [
                {
                    path: 'new',
                    name: 'GenerateExercises',
                    component: () => import('../views/student/GenerateExercisesView.vue'),
                },
                {
                    path: 'assigned',
                    name: 'AssignedExercises',
                    component: () => import('../views/student/AssignedExercisesView.vue'),
                },
                {
                    path: 'solved',
                    name: 'SolvedExercises',
                    component: () => import('../views/student/SolvedExercisesView.vue'),
                }
            ]
        },
        {
            path: '/teacher',
            redirect: HomeView,
            name: 'Teacher',
            meta: {
                layout: 'Dashboard',
                allowed: ['teacher'],
            },
            children: [
                {
                    path: 'latex/new',
                    name: 'AddLatexFile',
                    component: () => import('../views/exercises_lists/EditView.vue'),
                },
                {
                    path: 'students',
                    name: 'TeacherStudentsIndex',
                    component: () => import('../views/teacher/students/IndexView.vue'),
                },
                {
                    path: 'students/:id',
                    name: 'TeacherStudentsShow',
                    component: () => import('../views/teacher/students/ShowView.vue'),
                },
                {
                    path: 'students/exercises',
                    name: 'StudentsExercises',
                    component: () => import('../views/teacher/StudentsExercisesView.vue'),
                },
                {
                    path: 'student/:id/exercises',
                    name: 'StudentExercises',
                    component: () => import('../views/teacher/StudentExercisesView.vue'),
                },
            ]
        },
        {
            path: '/exercises_lists',
            meta: {
                layout: 'Dashboard',
                allowed: ['teacher'],
            },
            children: [
                {
                    path: '',
                    name: 'IndexExercisesLists',
                    component: () => import('../views/exercises_lists/IndexView.vue'),
                },
                {
                    path: 'new',
                    name: 'NewExercisesList',
                    component: () => import('../views/exercises_lists/EditView.vue'),
                },
                {
                    path: ':id/edit',
                    name: 'EditExercisesList',
                    component: () => import('../views/exercises_lists/EditView.vue'),
                    meta: {
                        allowed: ['owner']
                    }
                },
                {
                    path: ':id',
                    name: 'ShowExercisesList',
                    component: () => import('../views/exercises_lists/ShowView.vue'),
                }
            ],
        },
        {
            path: '/instructions',
            meta: {
                layout: 'Dashboard'
            },
            children: [
                {
                    path: '',
                    name: 'IndexInstructions',
                    component: () => import('../views/instructions/IndexView.vue'),
                },
                {
                    path: 'new',
                    name: 'NewInstruction',
                    component: () => import('../views/instructions/EditView.vue'),
                    meta: {
                        allowed: ['teacher']
                    }
                },
                {
                    path: ':id/edit',
                    name: 'EditInstruction',
                    component: () => import('../views/instructions/EditView.vue'),
                    meta: {
                        allowed: ['owner']
                    }
                },
                {
                    path: ':id',
                    name: 'ShowInstruction',
                    component: () => import('../views/instructions/ShowView.vue'),
                    meta: {
                        allowed: ['student_special_instructions', 'teacher']
                    }
                },
            ],
        },
        {
            path: '/NotFound',
            name: 'NotFound',
            component: () => import('../views/NotFoundView.vue'),
            meta: {
                layout: 'Default',
                auth: false,
            }
        },
        {
            path: '/:catchAll(.*)*',
            redirect: '/NotFound',
            meta: {
                auth: false,
            }
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const store = useStateStore();
    const {t} = i18n.global;

    let pageAuth = to.meta.auth !== undefined ? to.meta.auth : true;
    let pageAllowed = to.meta.allowed !== undefined ? to.meta.allowed : false;
    if (pageAuth && !store.isAuthenticated) {
        store.addAlert(t('error.unauthorized'), 'warning');
        next('/login');
        return;
    }

    if (pageAllowed !== false && !await policyManager(pageAllowed, to.name, to.params.id)) {
        store.addAlert(t('error.forbidden'), 'warning');
        next('/');
        return;
    }

    next();
});

export default router
