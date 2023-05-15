<script setup>
import {useI18n} from "vue-i18n";
import { login } from "@/api/auth";
import {ref} from "vue";
import router from "@/router";

const { t } = useI18n({ useScope: 'global' });
const email = ref('');
const password = ref('');

const onSubmit = async () => {
    let result = await login(email.value, password.value);
    if (result === true)
        await router.push({name: 'Home'});
}

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
                            <v-form @submit.prevent="onSubmit" validate-on="input">
                                <v-row class="py-1">
                                    <v-text-field v-model="email"
                                                  class="ma-auto"
                                                  append-inner-icon="mdi-email"
                                                  :label="t('login.email')"/>
                                </v-row>
                                <v-row class="py-1">
                                    <v-text-field v-model="password"
                                                  type="password"
                                                  class="ma-auto"
                                                  append-inner-icon="mdi-lock"
                                                  :label="t('login.password')"/>
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