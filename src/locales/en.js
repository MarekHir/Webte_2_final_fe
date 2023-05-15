export default {
    login: {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        submit: 'Login',
        error: {
            email_required: 'Email is required',
            email_invalid: 'Email is invalid',
        },
        registration: {
            text: 'Don\'t have an account?',
            link: 'Click here to register',
        }
    },
    registration: {
        title: 'Registration',
        first_name: 'First name',
        surname: 'Surname',
        role: 'Account type',
        roles: {
            student: 'Student',
            teacher: 'Teacher',
        },
        email: 'Email',
        password: 'Password',
        password_confirmation: 'Password confirmation',
        submit: 'Register',
        login: {
            text: 'Already have an account?',
            link: 'Click here to login',
        }
    },
    language: {
        title: 'Switch to {lang}',
        en: 'English',
        sk: 'Slovak',
    },
    dashboard: {
        menu: {
            title: 'Menu',
            instructions: 'Instructions',
            logout: 'Logout',
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
    $vuetify: {
        close: 'Close',
    }
}