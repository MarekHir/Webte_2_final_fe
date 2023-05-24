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
            path: '/students',
            meta: {
                layout: 'Dashboard',
                allowed: ['teacher'],
            },
            children: [
                {
                    path: '',
                    name: 'IndexStudents',
                    component: () => import('../views/students/IndexView.vue'),
                },
                {
                    path: ':id',
                    name: 'ShowStudents',
                    component: () => import('../views/students/ShowView.vue'),
                },
            ]
        },
        {
            path: '/exercises',
            meta: {
                layout: 'Dashboard',
            },
            children: [
                {
                    path: '',
                    name: 'IndexExercises',
                    component: () => import('../views/exercises/IndexView.vue'),
                    meta: {
                        allowed: ['teacher'],
                    }
                },
                {
                    path: ':id/student',
                    name: 'ShowStudentsExercises',
                    component: () => import('../views/exercises/StudentShowView.vue'),
                    meta: {
                        allowed: ['teacher'],
                    }
                },
                {
                    path: 'assigned',
                    name: 'AssignedExercises',
                    component: () => import('../views/exercises/AssignedView.vue'),
                    meta: {
                        allowed: ['student'],
                    }
                },
                {
                    path: 'solved',
                    name: 'SolvedExercises',
                    component: () => import('../views/exercises/SolvedView.vue'),
                    meta: {
                        allowed: ['student'],
                    }
                },
                {
                    path: 'generate',
                    name: 'GenerateExercises',
                    component: () => import('../views/exercises/GenerateView.vue'),
                    meta: {
                        allowed: ['student'],
                    }
                },
                {
                    path: ':id/solve',
                    name: 'SolveExercise',
                    component: () => import('../views/exercises/SolveView.vue'),
                    meta: {
                        allowed: ['student'],
                    }
                },
                {
                    path: ':id',
                    name: 'ShowExercise',
                    component: () => import('../views/exercises/ShowView.vue'),
                }
            ],
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
