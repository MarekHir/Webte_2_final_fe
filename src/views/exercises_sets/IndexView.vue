<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import {fullName} from "@/utils";
import router from "@/router";
import CrudButton from "@/components/buttons/CrudButton.vue";
import {getExercisesSets} from "@/api/exercises_sets";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const data = ref([]);

onMounted(async () => {
    data.value = await getExercisesSets()
    await router.isReady();
});

const goToShow = async (id) => {
    await router.push({name: 'ShowExercisesSet', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowExercisesSet') // TODO: Add error handling
    });
}
</script>
<template>
    <DashboardTitle title_key="exercises_set.index.title">
        <template v-slot:prepend>
            <CrudButton action="create" route-name="NewExercisesSet"/>
        </template>
    </DashboardTitle>
    <v-divider class="mt-4"/>
    <v-card-item>
        <v-table>
            <thead>
            <tr>
                <th>{{t('exercises_set.exercises_list')}}</th>
                <th>{{t('exercises_set.points')}}</th>
                <th>{{t('exercises_set.deadline')}}</th>
                <th>{{t('exercises_set.published_by')}}</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="exercise_set in data" :key="exercise_set.id">
                <tr @click="goToShow(exercise_set.id)">
                    <td>{{ exercise_set.exercises_lists.name }}</td>
                    <td>{{ exercise_set.points }}</td>
                    <td>{{ exercise_set.deadline }}</td>
                    <td>{{ fullName(exercise_set.created_by) }}</td>
                </tr>
            </template>
            </tbody>
        </v-table>
    </v-card-item>
</template>
<style scoped>
</style>