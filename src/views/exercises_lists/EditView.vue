<script setup>

import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import CrudButton from "@/components/buttons/CrudButton.vue";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {onInvalidSubmit} from "@/utils";
import {createExerciseList, getExerciseList, patchExerciseList} from "@/api/exercises_lists";

const {t} = useI18n({useScope: 'global'});
const route = useRoute();
const loading = ref(true);
const exercise = ref(null);

const pageType = ref('create');
const title = computed(() => pageType.value === 'create' ? 'exercises_list.new.title' : 'exercises_list.edit.title');

const schema = yup.object({
    files: yup.array().required(),
    images: yup.array().nullable(),
    name: yup.string().required().min(5).max(30),
    description: yup.string().required().min(10).max(150),
    points: yup.number().required().min(0),
    is_active: yup.boolean().nullable(),
    initiation: yup.date().nullable(),
    deadline: yup.date().nullable().test('is-greater', 'Initiation must be before deadline', function (value) {
        const initiation = this.resolve(yup.ref('initiation'));
        return !initiation || !value || initiation <= value;
    }),
});

const {handleSubmit} = useForm({
    validationSchema: schema
});

const files = useField('files');
const images = useField('images');
const name = useField('name');
const description = useField('description');
const points = useField('points');
const is_active = useField('is_active');
const initiation = useField('initiation');
const deadline = useField('deadline');

const onSubmit = handleSubmit(async (values) => {
    let result;

    console.log(values['is_active'])
    values['is_active'] = values['is_active'] != null ? 'true' : 'false';

    if (pageType.value === 'create') {
        values.file = values['files'][0];
        delete values['files'];

        console.log(values)
        if (!values.images || values.images.length === 0)
            values.images = [];

        result = await createExerciseList(values);
    } else {
        delete values['files'];
        delete values['images'];
        Object.keys(values).forEach((key) => {
            if (values[key] === exercise.value[key])
                delete values[key];
        }); // TODO: Move to utils
        result = await patchExerciseList(values, exercise.value.id);
    }

    if (result !== false)
        await router.push({name: 'ShowExercisesList', params: {id: result.id}}).catch(() => {
            console.log('Error while routing to ShowExercisesList') // TODO: Add error handling
        });
}, onInvalidSubmit);

onMounted(async () => {
    loading.value = true;
    await router.isReady();
    if (route.name === 'EditExercisesSet') {
        // TODO: Find better way
        exercise.value = await getExerciseList(route.params.id);
        name.value.value = exercise.value.name;
        description.value.value = exercise.value.description;
        points.value.value = exercise.value.points;
        is_active.value.value = exercise.value.is_active;
        initiation.value.value = exercise.value.initiation;
        deadline.value.value = exercise.value.deadline;
        pageType.value = 'edit';
    }

    loading.value = false;
});
</script>
<template>
    <template v-if="!loading">
        <DashboardTitle :title_key="title">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexExercisesLists"/>
                <CrudButton v-if="pageType === 'edit'" action="show" route-name="ShowExercisesList"/>
            </template>
            <template v-slot:prepend>
                <CrudButton action="save" route-name="" no-redirect @button-clicked="onSubmit"/>
            </template>
        </DashboardTitle>
        <v-divider class="mt-4"/>
        <v-card-item>
            <v-container>
                <form @submit.prevent="onSubmit">
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex justify-center align-center">
                            <v-text-field
                                    v-model="name.value.value"
                                    variant="outlined"
                                    color="primary"
                                    :label="t('exercises_list.name')"
                                    :error-messages="name.errorMessage.value"/>
                        </v-col>
                        <v-col cols="12" md="2" class="d-flex justify-center align-center">
                            <v-switch
                                v-model="is_active.value.value"
                                color="primary"
                                :label="t('exercises_list.is_active')"
                                :error-messages="is_active.errorMessage.value"/>
                        </v-col>
                        <v-col cols="12" md="4" class="d-flex justify-center align-center">
                            <v-text-field
                                    type="number"
                                    variant="outlined"
                                    color="primary"
                                    v-model="points.value.value"
                                    class="ma-auto"
                                    :label="t('exercises_list.points')"
                                    :error-messages="points.errorMessage.value"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="8" class="d-flex justify-center align-center">
                            <v-text-field
                                    v-model="description.value.value"
                                    variant="outlined"
                                    color="primary"
                                    :label="t('exercises_list.description')"
                                    class="mt-2"
                                    :error-messages="description.errorMessage.value"/>
                        </v-col>
                        <v-col cols="12" md="4" class="d-flex justify-center align-center">
                            <v-file-input
                                    class="mt-2"
                                    v-model="files.value.value"
                                    color="primary"
                                    :label="t('exercises_list.fileInput')"
                                    clearable
                                    prepend-icon=""
                                    append-inner-icon="mdi-paperclip"
                                    variant="outlined"
                                    accept=".tex"
                                    :error-messages="files.errorMessage.value"
                                    :show-size="1000">
                                <template v-slot:selection="{ fileNames }">
                                    <v-chip color="primary" label size="small" class="me-2">
                                        {{ fileNames[0] }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-file-input
                                    v-model="images.value.value"
                                    color="primary"
                                    counter clearable multiple
                                    :label="t('exercises_list.imageInput.title')"
                                    accept=".jpg,.png,.jpeg,.gif"
                                    variant="outlined"
                                    prepend-icon=""
                                    append-inner-icon="mdi-image-multiple"
                                    :error-messages="images.errorMessage.value"
                                    :show-size="1000">
                                <template v-slot:selection="{ fileNames }">
                                    <template v-for="(fileName, index) in fileNames" :key="fileName">
                                        <v-chip v-if="index < 5" color="primary" label size="small" class="me-2">
                                            {{ fileName }}
                                        </v-chip>

                                        <span v-else-if="index === 5" class="text-overline text-grey-darken-3 mx-2">
                                        +{{
                                            images.value.value.length - 5
                                            }} {{ t('exercises_list.edit.imageInput.count') }}
                                    </span>
                                    </template>
                                </template>
                            </v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex justify-center align-center">
                            <v-text-field
                                    type="datetime-local"
                                    variant="outlined"
                                    v-model="initiation.value.value"
                                    color="primary"
                                    class="ma-auto"
                                    clearable
                                    :label="t('exercises_list.initiation')"
                                    :error-messages="initiation.errorMessage.value"/>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex justify-center align-center">
                            <v-text-field
                                    type="datetime-local"
                                    variant="outlined"
                                    color="primary"
                                    clearable
                                    v-model="deadline.value.value"
                                    class="ma-auto"
                                    :label="t('exercises_list.deadline')"
                                    :error-messages="deadline.errorMessage.value"/>
                        </v-col>
                    </v-row>
                </form>
            </v-container>
        </v-card-item>
    </template>
</template>