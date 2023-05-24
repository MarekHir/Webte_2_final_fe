<script setup>
import {useI18n} from "vue-i18n";
import {login} from "@/api/auth";
import router from "@/router";

import {useField, useForm} from "vee-validate";
import * as yup from 'yup';
import {useStateStore} from "@/stores/state";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const {handleSubmit} = useForm({
    validationSchema: schema
});

const email = useField('email');
const password = useField('password');

function onInvalidSubmit({errors}) {
    if (errors == null || errors.length === 0)
        return;

    Object.keys(errors).forEach((field_key) => {
        store.addAlert(errors[field_key], 'warning');
    });
}

const onSubmit = handleSubmit(async (values) => {
    let result = await login(values);
    if (result === true)
        await router.push({name: 'Home'});
}, onInvalidSubmit);

</script>
<template>
    <v-container fluid class="fill-height">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="12" lg="4" md="6" sm="8">
                <v-card class="py-4 px-2" rounded="lg">
                    <v-card-title class="text-center">
                        <h1>{{ $t('login.title') }}</h1>
                    </v-card-title>
                    <v-card-item>
                        <v-container>
                            <form @submit.prevent="onSubmit">
                                <v-row class="py-1">
                                    <v-text-field
                                            v-model="email.value.value" class="ma-auto" color="primary"
                                            :label="t('login.email')" variant="outlined"
                                            :error-messages="email.errorMessage.value"/>
                                </v-row>
                                <v-row class="py-1">
                                    <v-text-field
                                            v-model="password.value.value" class="ma-auto" color="primary"
                                            :label="t('login.password')" type="password" variant="outlined"
                                            :error-messages="password.errorMessage.value"/>
                                </v-row>
                                <v-row class="py-1">
                                    <v-btn type="submit" class="ma-auto" color="primary">{{ t('login.submit') }}</v-btn>
                                </v-row>
                                <v-row class="pt-4 pb-0">
                                    <p class="text-center w-100">
                                        {{ t('login.registration.text') }}
                                        <router-link to="Registration" class="text-primary text-decoration-none">
                                            {{ t('login.registration.link') }}
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