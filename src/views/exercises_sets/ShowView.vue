<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import {deleteExercisesSet, getExercisesSet} from "@/api/exercises_sets";
import {fullName} from "@/utils";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const exercise = ref(null);
const loading = ref(true);
const route = useRoute();
const delete_modal = ref(false);

// TODO: Add loading everywhere
onMounted(async () => {
    loading.value = true;
    await router.isReady();
    exercise.value = await getExercisesSet(route.params.id);
    console.log(exercise.value)
    loading.value = false;
});

const handleDelete = async () => {
    if (await deleteExercisesSet(exercise.value.id))
        await router.push({name: 'IndexExercisesSets'}).catch(() => {
            console.log('Error while routing to IndexExercisesSets') // TODO: Add error handling
        });
}

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercises_set.show.title">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexExercisesSets"/>
            </template>
            <template v-if="store.user.id === exercise.created_by.id|| store.isAdmin" v-slot:prepend>
                <CrudButton action="edit" route-name="EditExercisesSet" :id="$props.id"/>
                <CrudButton action="delete" @button-clicked="delete_modal = true" route-name="" no-redirect
                            :id="$props.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle
            :subtitle="exercise.exercises_lists.name"
            subtitle_size="h4"
            :description="fullName(exercise.created_by)"/>
        <v-divider className="mt-4"/>
        <v-card-item>
            <v-container>
               <v-card class="pa-4">
                   <v-card-item>
                       <v-row>
                           <v-col cols="12" md="6" class="d-flex justify-center align-center">
                               <h3 class="text-h5">{{t('exercises_set.points')}}: {{exercise.points}}</h3>
                           </v-col>
                           <v-divider vertical/>
                           <v-col cols="12" md="6" class="d-flex justify-center align-center">
                               <h3 class="text-h5">{{t('exercises_set.deadline')}}: {{exercise.deadline}}</h3>
                           </v-col>
                       </v-row>
                   </v-card-item>
               </v-card>
            </v-container>
        </v-card-item>
        <DeleteModal :dialog="delete_modal" @close="delete_modal = false" @delete="handleDelete"/>
    </template>
</template>