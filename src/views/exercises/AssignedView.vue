<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import Exercise from "@/models/Exercise";
import CustomTable from "@/components/CustomTable.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const loading = ref(true);
const route = useRoute();
const exercises = ref([]);
const headers = ref([
    {
        title: 'exercise.attr.name',
        key: 'name',
    }, {
        title: 'exercises_list.attr.points',
        key: 'exercises_lists_sections.exercises_lists.points',
        lodash: true,
    }, {
        title: 'exercise.attr.createdAt',
        key: 'createdAt',
    }
]);

// TODO: Add loading everywhere
onMounted(async () => {
    loading.value = true;
    await router.isReady();
    exercises.value = await Exercise.where('created_by', store.user.id).where('solved', false).get()
    loading.value = false;
});

const goToShow = async (id) => {
    await router.push({name: 'ShowExercise', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowExercise') // TODO: Add error handling
    });
}
</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercise.assigned.title"/>
        <v-divider class="mt-4"/>
        <v-card-item>
            <CustomTable @on-click="goToShow" :data="exercises" :headers="headers"/>
        </v-card-item>
    </template>
</template>