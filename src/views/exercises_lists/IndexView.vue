<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import {fullName} from "@/utils";
import router from "@/router";
import CrudButton from "@/components/buttons/CrudButton.vue";
import {getExerciseLists} from "@/api/exercises_lists";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const data = ref([]);

onMounted(async () => {
    data.value = await getExerciseLists()
    await router.isReady();
});

const goToShow = async (id) => {
    await router.push({name: 'ShowExercisesList', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowExercisesList') // TODO: Add error handling
    });
}
</script>
<template>
    <DashboardTitle title_key="exercises_list.index.title">
        <template v-slot:prepend>
            <CrudButton action="create" route-name="NewExercisesList"/>
        </template>
    </DashboardTitle>
    <v-divider class="mt-4"/>
    <v-card-item>
        <v-table>
            <thead>
            <tr>
                <th>{{t('exercises_list.name')}}</th>
                <th>{{t('exercises_list.points')}}</th>
                <th>{{t('exercises_list.is_active')}}</th>
                <th>{{t('exercises_list.deadline')}}</th>
                <th>{{t('exercises_list.initiation')}}</th>
                <th>{{t('exercises_list.published_by')}}</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="exercises_list in data" :key="exercises_list.id">
                <tr @click="goToShow(exercises_list.id)">
                    <td>{{ exercises_list.name }}</td>
                    <td>{{ exercises_list.points }}</td>
                    <td>{{ t(`bool.${exercises_list.is_active}`) }}</td>
                    <td>{{ exercises_list.initiation }}</td>
                    <td>{{ exercises_list.deadline }}</td>
                    <td>{{ fullName(exercises_list.created_by) }}</td>
                </tr>
            </template>
            </tbody>
        </v-table>
    </v-card-item>
</template>
<style scoped>
</style>