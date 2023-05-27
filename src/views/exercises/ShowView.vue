<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import {deleteInstruction} from "@/api/instructions";
import {useRoute} from "vue-router";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import Exercise from "@/models/Exercise";
import ShowCard from "@/components/ShowCard.vue";
import MathField from "@/components/MathField.vue";
import EditPointsModal from "@/components/Modals/EditPointsModal.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const exercise = ref(null);
const loading = ref(true);
const edit_modal = ref(false)
const route = useRoute();

const dateFields = [
    {title: 'exercises_list.attr.initiation', key: 'startDate', optional: 'not_set_date'},
    {title: 'exercises_list.attr.deadline', key: 'endDate', optional: 'not_set_date'},
    {title: 'exercise.attr.created_at', key: 'createdAt'},]

const pointsFields = [
    {title: 'exercises_list.attr.points', key: 'maxPoints'},
    {title: 'exercise.attr.points', key: 'points'}]

// TODO: Add loading everywhere
onMounted(async () => {
    loading.value = true;
    await router.isReady();
    await refreshData()
    loading.value = false;
});

const refreshData = async () => {
    exercise.value = await Exercise.with('created_by').find(route.params.id);
}

const handleDelete = async () => {
    if (await deleteInstruction(exercise.value.id))
        await router.push({name: 'IndexInstructions'}).catch(() => {
            console.log('Error while routing to IndexInstructions') // TODO: Add error handling
        });

}

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercise.show.title">
            <template v-slot:append>
                <template v-if="store.isStudent">
                    <CrudButton action="index" title="exercise.buttons.back_to_assigned" color="surface-variant"
                                route-name="AssignedExercises"/>
                    <CrudButton action="index" title="exercise.buttons.back_to_solved" color="secondary"
                                route-name="SolvedExercises"/>
                </template>
                <template v-if="store.isTeacher">
                    <CrudButton action="index" route-name="IndexExercises"/>
                </template>
            </template>
            <template v-slot:prepend>
                <CrudButton v-if="(store.user.id === exercise.created_by.id || store.isAdmin) && exercise.canBeSolved"
                            action="custom" title="exercise.buttons.solve" color="primary"
                            variant="elevated"
                            route-name="SolveExercise" :id="$props.id"/>
                <CrudButton v-if="store.isTeacher" action="show" title="exercise.student.show_student"
                            route-name="ShowStudents"
                            :id="exercise.created_by.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle
                :subtitle="exercise.name"
                subtitle_size="h4"
                :description="exercise.tastDescription">
            <template v-if="exercise.solved && store.isTeacher" v-slot:prepend>
                <CrudButton action="edit" no-redirect title="exercise.buttons.change_points" @button-clicked="edit_modal = true"/>
            </template>
        </DashboardSubtitle>
        <v-divider class="mt-2"/>
        <v-card-item>
            <v-container>
                <ShowCard :object="exercise" title="exercise.show.dates" :fields="dateFields"/>
                <ShowCard filter_empty title="exercise.show.points" :fields="pointsFields" :object="exercise"/>
                <template v-if="exercise.solved">
                    <ShowCard title="exercise.show.solution">
                        <v-row>
                            <v-col cols="12" class="d-flex justify-center align-center">
                                <math-field v-model="exercise.solution" read-only class="border-0 my-4 mx-auto"/>
                            </v-col>
                            <template v-if="exercise.description">
                                <div class="w-33 mx-auto">
                                    <v-divider/>
                                </div>
                                <v-col cols="12">
                                    <h3 class="text-center text-h5">{{ exercise.description }}</h3>
                                </v-col>
                            </template>
                        </v-row>
                    </ShowCard>
                </template>
            </v-container>
        </v-card-item>
        <EditPointsModal @refresh="refreshData" :exercise="exercise" @close="edit_modal = false" v-model:dialog="edit_modal"/>
    </template>
</template>