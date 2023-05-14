<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n({ useScope: 'global' });
const rules = [
    (v) => !!v || t('login.error.email_required'),
    (v) => /.+@.+/.test(v) || t('login.error.email_invalid'),
]

const onSubmit = () => {
    console.log('submit');
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
                            <v-form @submit.prevent="onSubmit">
                                <v-row class="py-1">
                                    <v-text-field :rules="rules" class="ma-auto" :label="t('login.email')"></v-text-field>
                                </v-row>
                                <v-row class="py-1">
                                    <v-text-field class="ma-auto" :label="t('login.password')"></v-text-field>
                                </v-row>
                                <v-row class="py-1">
                                    <v-btn type="submit" class="ma-auto" color="primary">{{ t('login.login_button') }}</v-btn>
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
.main_container {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    text-align: center;
    padding: 50px;
}

.login-form {
    display: inline-block;
    text-align: left;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-form input[type="text"],
.login-form input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login-form input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>