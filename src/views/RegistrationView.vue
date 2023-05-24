<script setup>
import {useI18n} from "vue-i18n";
import {register} from "@/api/auth";
import router from "@/router";
import {useField, useForm} from "vee-validate";
import * as yup from 'yup';
import YupPassword from 'yup-password';
import {useStateStore} from "@/stores/state";
import {ref} from "vue";

YupPassword(yup);

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();

const schema = yup.object().shape({
    first_name: yup.string().required().min(5).max(30),
    surname: yup.string().required().min(5).max(30),

    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(30)
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character'),
    password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    role: yup.string().required(),
});

const {handleSubmit} = useForm({
    validationSchema: schema
});

const first_name = useField('first_name');
const surname = useField('surname');
const role = useField('role');

const roles = ref([
    {title: t('registration.roles.student'), value: 'student'},
    {title: t('registration.roles.teacher'), value: 'teacher'}]);

const email = useField('email');
const password = useField('password');
const password_confirmation = useField('password_confirmation');


function onInvalidSubmit({errors}) {
    if (errors == null || errors.length === 0)
        return;

    Object.keys(errors).forEach((field_key) => {
        store.addAlert(errors[field_key], 'warning');
    });
}

const onSubmit = handleSubmit(async (values) => {
    let result = await register(values);
    if (result === true)
        await router.push({name: 'Home'});
}, onInvalidSubmit);

</script>
<template>
    <v-container fluid class="fill-height">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="12" lg="6" md="8" sm="10">
                <v-card class="py-4 px-2" rounded="lg">
                    <v-card-title class="text-center">
                        <h1>{{ $t('registration.title') }}</h1>
                    </v-card-title>
                    <v-card-item>
                        <v-container>
                            <form @submit.prevent="onSubmit">
                                <v-row class="py-1">
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-text-field
                                                v-model="first_name.value.value" class="ma-auto"
                                                append-inner-icon="mdi-account-arrow-left"
                                                variant="outlined" color="primary"
                                                :label="t('registration.first_name')"
                                                :error-messages="first_name.errorMessage.value"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-text-field
                                                v-model="surname.value.value" class="ma-auto"
                                                append-inner-icon="mdi-account-arrow-right"
                                                variant="outlined" color="primary"
                                                :label="t('registration.surname')"
                                                :error-messages="surname.errorMessage.value"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row class="py-1">
                                    <v-col cols="12" md="8" class="py-0">
                                        <v-text-field
                                                v-model="email.value.value" class="ma-auto"
                                                append-inner-icon="mdi-email"
                                                variant="outlined" color="primary"
                                                :label="t('registration.email')"
                                                :error-messages="email.errorMessage.value"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="4" class="py-0">
                                        <v-select
                                                v-model="role.value.value" class="ma-auto"
                                                :items="roles"
                                                variant="outlined" color="primary"
                                                :prepend-inner-icon="'mdi-account-' + (role === 'teacher' ? 'tie' : 'school')"
                                                :label="t('registration.role')"
                                                :error-messages="role.errorMessage.value"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row class="py-1">
                                    <v-col cols="12" class="py-0">
                                        <v-text-field
                                                v-model="password.value.value" class="ma-auto"
                                                append-inner-icon="mdi-lock"
                                                variant="outlined" color="primary"
                                                :label="t('registration.password')" type="password"
                                                :error-messages="password.errorMessage.value"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row class="py-1">
                                    <v-col cols="12" class="py-0">
                                        <v-text-field
                                                v-model="password_confirmation.value.value"
                                                type="password"
                                                variant="outlined" color="primary"
                                                class="ma-auto"
                                                :append-inner-icon="'mdi-lock' + (password === password_confirmation ? '-check' : '-remove')"
                                                :label="t('registration.password_confirmation')"
                                                :error-messages="password_confirmation.errorMessage.value"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row class="py-1">
                                    <v-btn type="submit" class="ma-auto" color="primary">
                                        {{ t('registration.submit') }}
                                    </v-btn>
                                </v-row>
                                <v-row class="pt-4 pb-0">
                                    <p class="text-center w-100">
                                        {{ t('registration.login.text') }}
                                        <router-link to="Login" class="text-primary text-decoration-none">
                                            {{ t('registration.login.link') }}
                                        </router-link>
                                    </p>
                                </v-row>
                            </form>
                        </v-container>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
</style>