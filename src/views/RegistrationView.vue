<script setup>
import {useI18n} from "vue-i18n";
import {register} from "@/api/requests";
import {ref} from "vue";
import router from "@/router";

const {t} = useI18n({useScope: 'global'});
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const onSubmit = () => {
    if (register(name.value, email.value, password.value) === true)
        router.push({name: 'Home'});
}

</script>
<template>
    <v-container fluid class="fill-height">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="12" lg="4" md="6" sm="8">
                <v-card class="py-4 px-2" rounded="lg">
                    <v-card-title class="text-center">
                        <h1>{{ $t('registration.title') }}</h1>
                    </v-card-title>
                    <v-card-item>
                        <v-container>
                            <v-form @submit.prevent="onSubmit" validate-on="input">
                                <v-row class="py-1">
                                    <v-text-field v-model="name" class="ma-auto"
                                                  :label="t('registration.name')"></v-text-field>
                                </v-row>
                                <v-row class="py-1">
                                    <v-text-field v-model="email" class="ma-auto"
                                                  :label="t('registration.email')"></v-text-field>
                                </v-row>
                                <v-row class="py-1">
                                    <v-text-field v-model="password" type="password" class="ma-auto"
                                                  :label="t('registration.password')"></v-text-field>
                                </v-row>
                                <v-row class="py-1">
                                    <v-text-field v-model="password_confirmation" type="password" class="ma-auto"
                                                  :label="t('registration.password_confirmation')"></v-text-field>
                                </v-row>
                                <v-row class="py-1">
                                    <v-btn type="submit" class="ma-auto" color="primary">{{
                                        t('registration.submit')
                                        }}
                                    </v-btn>
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