<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import CrudButton from "@/components/buttons/CrudButton.vue";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {onInvalidSubmit} from "@/utils";
import {createExercisesSet, getExercisesSet, patchExercisesSet} from "@/api/exercises_sets";
import {getExerciseListsByName} from "@/api/exercises_lists";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const route = useRoute();
const loading = ref(true);
const exercise = ref(null);
const autocomplete_loading = ref(false)
const autocomplete_search = ref('')
const autocomplete_result = ref([])

const pageType = ref('create');
const title = computed(() => pageType.value === 'create' ? 'exercises_set.new.title' : 'exercises_set.edit.title');

// TODO: Add validations
const schema = yup.object({
    exercises_list: yup.number().required(),
    points: yup.number().required(),
    deadline: yup.date().required(),
});

const {handleSubmit} = useForm({
    validationSchema: schema
});

const exercises_list = useField('exercises_list');
const points = useField('points');
const deadline = useField('deadline');

const onSubmit = handleSubmit(async (values) => {
    let result;

    values.exercises_lists_id = exercises_list.value.value;
    delete values['exercises_list'];
    if (pageType.value === 'create')
        result = await createExercisesSet(values);
    else {
        delete values['exercises_list'];
        Object.keys(values).forEach((key) => {
            if (values[key] === exercise.value[key])
                delete values[key];
        }); // TODO: Move to utils
        console.log(values)
        result = await patchExercisesSet(values, exercise.value.id);
    }

    if (result !== false)
        await router.push({name: 'ShowExercisesSet', params: {id: result.id}}).catch(() => {
            console.log('Error while routing to ShowExercisesSet') // TODO: Add error handling
        });
}, onInvalidSubmit);

onMounted(async () => {
    loading.value = true;
    await router.isReady();
    if (route.name === 'EditExercisesSet') {
        // TODO: Find better way
        exercise.value = await getExercisesSet(route.params.id);
        autocomplete_result.value = [{title: exercise.value.exercises_lists.name, value: exercise.value.exercises_lists_id}];
        exercises_list.value.value = exercise.value.exercises_lists_id;
        points.value.value = exercise.value.points;
        deadline.value.value = exercise.value.deadline;
        pageType.value = 'edit';
    }

    loading.value = false;
});

const getAutocompleteData = async (search_value) => {
    autocomplete_loading.value = true;
    autocomplete_result.value = await getExerciseListsByName(search_value)
    autocomplete_loading.value = false;
}

watch(autocomplete_search, async (value) => {
    value && value !== exercises_list.value.value && await getAutocompleteData(value)
});
</script>
<template>
    <template v-if="!loading">
        <DashboardTitle :title_key="title">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexExercisesSets"/>
                <CrudButton v-if="pageType === 'edit'" action="show" route-name="ShowExercisesSet"/>
            </template>
            <template v-slot:prepend>
                <CrudButton action="save" route-name="" no-redirect @button-clicked="onSubmit"/>
            </template>
        </DashboardTitle>
        <v-divider class="mt-4"/>
        <v-card-item>
            <v-container>
                <v-form>
                    <div class="mb-5">
                        <v-autocomplete
                                v-model="exercises_list.value.value"
                                v-model:search="autocomplete_search"
                                :items="autocomplete_result"
                                :loading="autocomplete_loading"
                                variant="outlined"
                                :label="t('exercises_set.exercises_list')"
                                hide-no-data
                                hide-details
                                :error-messages="exercises_list.errorMessage.value"/>
                    </div>
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex justify-center align-center">
                            <v-text-field
                                    type="number"
                                    variant="outlined"
                                    v-model="points.value.value"
                                    class="ma-auto"
                                    :label="t('exercises_set.points')"
                                    :error-messages="points.errorMessage.value"/>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex justify-center align-center">
                            <v-text-field
                                    type="datetime-local"
                                    variant="outlined"
                                    v-model="deadline.value.value"
                                    class="ma-auto"
                                    :label="t('exercises_set.deadline')"
                                    :error-messages="deadline.errorMessage.value"/>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card-item>
    </template>
</template>