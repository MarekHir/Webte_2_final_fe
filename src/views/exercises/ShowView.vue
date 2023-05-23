<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {MdPreview} from "md-editor-v3";
import {onMounted, ref} from "vue";
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import {getInstruction, deleteInstruction} from "@/api/instructions";
import {useRoute} from "vue-router";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import Exercise from "@/models/Exercise";
import ShowCard from "@/components/ShowCard.vue";
import MathField from "@/components/MathField.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const exercise = ref(null);
const loading = ref(true);
const route = useRoute();
const delete_modal = ref(false);

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
    exercise.value = await Exercise.find(route.params.id);
    loading.value = false;
});

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
                <CrudButton action="index" title="exercise.buttons.back_to_assigned" color="surface-variant"
                            route-name="AssignedExercises"/>
                <CrudButton action="index" title="exercise.buttons.back_to_solved" color="secondary"
                            route-name="SolvedExercises"/>
            </template>
            <template v-if="store.user.id === exercise.created_by || store.isAdmin" v-slot:prepend>
                <CrudButton v-if="exercise.canBeSolved" action="custom" title="exercise.buttons.solve" color="primary"
                            variant="elevated"
                            route-name="SolveExercise" :id="$props.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle
                :subtitle="exercise.name"
                subtitle_size="h4"
                :description="exercise.tastDescription"
        />
        <v-divider class="mt-2"/>
        <v-card-item>
            <v-container>
                <ShowCard :object="exercise" title="exercise.show.dates" :fields="dateFields"/>
                <ShowCard filter_empty title="exercise.show.points" :fields="pointsFields" :object="exercise"/>
                <ShowCard v-if="exercise.solved" title="exercise.show.solution" :object="exercise">
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center align-center">
                            <math-field v-model="exercise.solution" read-only class="border-0 my-4 mx-auto"/>
                        </v-col>
                    </v-row>
                </ShowCard>
            </v-container>
        </v-card-item>
    </template>
</template>