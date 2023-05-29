<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import DeleteModal from "@/components/Modals/DeleteModal.vue";
import {fullName} from "@/utils";
import {deleteExerciseList, getExerciseList} from "@/api/exercises_lists";
import ShowCard from "@/components/ShowCard.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const exercise = ref(null);
const loading = ref(true);
const route = useRoute();
const delete_modal = ref(false);
const points_card = [
    {
        title: 'exercises_list.attr.points',
        key: 'points',
        optional: 'not_set',
    },
    {
        title: 'exercises_list.attr.is_active',
        key: 'is_active',
        trans_value: true,
    }
]
const deadlines_card = [
    {
        title: 'exercises_list.attr.initiation',
        key: 'initiation',
        optional: 'not_set',
    },
    {
        title: 'exercises_list.attr.deadline',
        key: 'deadline',
        optional: 'not_set',
    }
]

onMounted(async () => {
    loading.value = true;
    await router.isReady();
    exercise.value = await getExerciseList(route.params.id);
    loading.value = false;
});

const handleDelete = async () => {
    if (await deleteExerciseList(exercise.value.id))
        await router.push({name: 'IndexExercisesLists'}).catch(() => {
            console.log('Error while routing to IndexExercisesLists') // TODO: Add error handling
        });
}

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercises_list.show.title">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexExercisesLists"/>
            </template>
            <template v-if="(store.user.id === exercise.created_by?.id && store.isTeacher)|| store.isAdmin"
                      v-slot:prepend>
                <CrudButton action="edit" route-name="EditExercisesList" :id="$props.id"/>
                <CrudButton action="delete" @button-clicked="delete_modal = true" route-name="" no-redirect
                            :id="$props.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle
                :subtitle="exercise.name"
                subtitle_size="h4"
                :description="fullName(exercise.created_by)"/>
        <v-divider class="mt-4"/>
        <v-card-item>
            <v-container>
                <ShowCard :object="exercise" title="exercises_list.attr.description"
                          :fields="[{key: 'description', optional: 'not_set'}]"/>
                <ShowCard :object="exercise" :fields="points_card"/>
                <ShowCard :object="exercise" :fields="deadlines_card"/>
            </v-container>
        </v-card-item>
        <DeleteModal :dialog="delete_modal" @close="delete_modal = false" @delete="handleDelete"/>
    </template>
</template>
<style scoped>
</style>