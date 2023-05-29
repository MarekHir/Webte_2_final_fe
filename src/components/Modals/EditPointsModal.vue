<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import ShowCard from "@/components/ShowCard.vue";
import MathField from "@/components/MathField.vue";
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {setLocale} from "yup";
import {getLocaleMessagesForNamespace, onInvalidSubmit} from "@/utils";

const store = useStateStore();
const {t, locale} = useI18n({useScope: 'global'});
const emit = defineEmits(['close', 'refresh']);
const props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
        default: false
    },
    exercise: {
        type: Object,
        required: true
    }
})

yup.setLocale(getLocaleMessagesForNamespace('exercise.change_points_modal'))

const schema = computed(() => { return yup.object({
    points: yup.number().required().min(0).max(props.exercise.exercises_lists.points)
})});

const {handleSubmit, validate} = useForm({
    validationSchema: schema,
});

const points = useField('points');


onMounted(() => {
    points.value.value = props.exercise.points;
});

const dialog = ref(props.dialog);

const updateExercise = handleSubmit(async (values) => {
    props.exercise.points = values.points;
    await props.exercise.patch();
    emit('refresh');
    dialog.value = false;
}, onInvalidSubmit)


watch(() => props.dialog, (newVal) => {
    dialog.value = newVal;
})

watch(() => props.exercise, (newVal) => {
    points.value.value = newVal.points;
})

watch(() => dialog.value, (newVal) => {
    if(newVal === false){
        emit('close');
    }
})
watch(locale, () => {
    validate();
})
</script>
<template>
    <v-dialog
            v-model="dialog"
            class="w-50">
        <v-card class="pa-4 pb-7 rounded-lg" elevation="12">
            <v-card-title class="text-center">
                <h1 class="text-h4">
                    {{t('exercise.change_points_modal.title')}}
                </h1>
            </v-card-title>
            <v-card-text>
                <ShowCard elevation="0" variant="outlined" title="exercise.show.solution">
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
            </v-card-text>
            <v-card-item>
                <v-text-field
                        v-model="points.value.value"
                        color="primary"
                        :label="t('exercise.change_points_modal.points')"
                        variant="outlined"
                        :error-messages="points.errorMessage.value"
                        class="w-100 py-2"/>
            </v-card-item>
            <v-card-item>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn :color="store.btn_colors.close" variant="outlined" block @click="dialog = false" :text="t('button.close')"/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-btn :color="store.btn_colors.submit" block @click="updateExercise" :text="t('button.save')"/>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>