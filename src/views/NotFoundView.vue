<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});
</script>
<template>
    <v-container fluid class="fill-height">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="12" lg="4" md="6" sm="8">
                <v-card class="py-4 px-2" rounded="lg">
                    <v-card-title class="text-center">
                        <h1>{{ t('error.not_found.title') }}</h1>
                    </v-card-title>
                    <v-card-item>
                        <v-container>
                            <p class=" text-center text-subtitle-2">{{ t('error.not_found.text') }}</p>
                        </v-container>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>