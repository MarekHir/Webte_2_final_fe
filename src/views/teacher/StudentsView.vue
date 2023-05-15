<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});

</script>
<template>
    <v-card-title class="text-center">
        <h1 class="text-h3">
            {{ t('teacher.students.index.title') }}
        </h1>
    </v-card-title>
    <v-divider class="mt-2"/>
    <v-card-item>
        <v-container>
        </v-container>
    </v-card-item>
    <v-divider class="w-75 ma-auto my-2"/>
</template>