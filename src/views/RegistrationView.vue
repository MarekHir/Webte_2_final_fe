<script setup>
import {useI18n} from "vue-i18n";
import {register} from "@/api/auth";
import {ref} from "vue";
import router from "@/router";

const {t} = useI18n({useScope: 'global'});
const first_name = ref('');
const surname = ref('');
const role = ref('student');
const roles = ref([
    {title: t('registration.roles.student'), value: 'student'},
    {title: t('registration.roles.teacher'), value: 'teacher'}]);
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const onSubmit = async () => {
    let result = await register({
        first_name: first_name.value,
        surname: surname.value,
        role: role.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
    });
    if (result === true)
        await router.push({name: 'Home'});
}

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
                            <v-form @submit.prevent="onSubmit" validate-on="input">
                                <v-row class="py-1">
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-text-field v-model="first_name"
                                                      class="ma-auto"
                                                      append-inner-icon="mdi-account-arrow-left"
                                                      :label="t('registration.first_name')"/>
                                    </v-col>
                                    <v-col cols="12" md="6" class="py-0">
                                        <v-text-field v-model="surname"
                                                      class="ma-auto"
                                                      append-inner-icon="mdi-account-arrow-right"
                                                      :label="t('registration.surname')"/>
                                    </v-col>
                                </v-row>
                                <v-row class="py-1">
                                    <v-col cols="12" md="8" class="py-0">
                                        <v-text-field v-model="email"
                                                      append-inner-icon="mdi-email"
                                                      class="ma-auto"
                                                      :label="t('registration.email')"/>
                                    </v-col>
                                    <v-col cols="12" md="4" class="py-0">
                                        <v-select v-model="role"
                                                  :items="roles"
                                                  :prepend-inner-icon="'mdi-account-' + (role === 'teacher' ? 'tie' : 'school')"
                                                  class="ma-auto"
                                                  :label="t('registration.role')"/>
                                    </v-col>
                                </v-row>
                                <v-row class="py-1">
                                    <v-col cols="12" class="py-0">
                                        <v-text-field v-model="password"
                                                      type="password"
                                                      class="ma-auto"
                                                      append-inner-icon="mdi-lock"
                                                      :label="t('registration.password')"/>
                                    </v-col>
                                </v-row>
                                <v-row class="py-1">
                                    <v-col cols="12" class="py-0">
                                        <v-text-field v-model="password_confirmation"
                                                      type="password"
                                                      class="ma-auto"
                                                      :append-inner-icon="'mdi-lock' + (password === password_confirmation ? '-check' : '-remove')"
                                                      :label="t('registration.password_confirmation')"/>
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
                            </v-form>
                        </v-container>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
</style>