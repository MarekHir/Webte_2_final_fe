<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import Exercise from "@/models/Exercise";
import CustomTable from "@/components/CustomTable.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const loading = ref(true);
const route = useRoute();
const exercises = ref([]);
const exercises_options = ref({page: 1, max_page: 1, sort_by: '-updated_at'})
const headers = ref([
    {
        title: 'exercise.attr.list_name',
        key: 'listName',
        custom_sort_key: 'list_name',
        sortable: true,
    }, {
        title: 'exercise.attr.section',
        key: 'section',
        sortable: true,
    }, {
        title: 'exercises_list.attr.points',
        key: 'maxPoints',
        custom_sort_key: 'max_points',
        sortable: true,
    }, {
        title: 'exercise.attr.solvable',
        key: 'canBeSolved',
        trans_value: true,
    }, {
        title: 'exercise.attr.createdAt',
        key: 'createdAt',
        custom_sort_key: 'created_at',
        sortable: true,
    }
]);

onMounted(async () => {
    loading.value = true;
    await router.isReady();
    requestData(false);
    loading.value = false;
});

const requestData = async (refresh_page) => {
    if (refresh_page) exercises_options.value.page = 1;
    let data = await Exercise.where('created_by', store.user.id).where('solved', false)
        .orderBy(exercises_options.value.sort_by).limit(10).page(exercises_options.value.page).get();
    exercises_options.value.page = data.current_page ?? 1;
    exercises_options.value.max_page = data.last_page ?? 1;
    exercises.value = data.data.map(exercise => new Exercise(exercise));
}

const goToShow = async (id) => {
    await router.push({name: 'ShowExercise', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowExercise') // TODO: Add error handling
    });
}
</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercise.assigned.title">
            <template v-slot:append>
                <CrudButton action="index" title="exercise.buttons.back_to_solved"
                            route-name="SolvedExercises"/>
            </template>
            <template v-slot:prepend>
                <CrudButton action="create" title="exercise.buttons.generate"
                            route-name="GenerateExercises"/>
            </template>
        </DashboardTitle>
        <v-divider class="mt-4"/>
        <v-card-item>
            <CustomTable @on-click="goToShow" :data="exercises" :headers="headers"
                         :max_page="exercises_options.max_page" @refresh="requestData"
                         v-model:sort-by="exercises_options.sort_by" v-model:page="exercises_options.page"/>
        </v-card-item>
    </template>
</template>