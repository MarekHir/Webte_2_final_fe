<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import Exercise from "@/models/Exercise";
import MathField from "@/components/MathField.vue";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import katex from 'katex'
import 'katex/dist/katex.min.css'
import {storeToRefs} from "pinia";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const {show_keyboard} = storeToRefs(store);
const loading = ref(true);
const route = useRoute();
const exercise = ref();
const mathValue = ref('');
const description = ref('');
const taskContainer = ref(null)

onMounted(async () => {
    loading.value = true;
    await router.isReady();
    exercise.value = await Exercise.with('created_by').find(route.params.id)
    loading.value = false;
    setTimeout(() => {
        katex.render(exercise.value.task, taskContainer.value, {displayMode: true, maxSize: 1})
    }, 10)
});
const handleSubmit = async () => {
    exercise.value.solution = mathValue.value;
    exercise.value.description = description.value;
    await exercise.value.patch()
    show_keyboard.value = false;
    await router.push({name: 'ShowExercise', params: {id: exercise.value.id}})
}

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercise.solve.title">
            <template v-slot:append>
                <CrudButton action="show" route-name="ShowExercise"/>
            </template>
            <template v-if="store.user.id === exercise.created_by?.id || store.isAdmin" v-slot:prepend>
                <CrudButton action="submit" title="exercise.buttons.submit"
                            variant="elevated" no-redirect @button-clicked="handleSubmit"/>
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
                <v-list class="mt-0">
                    <v-list-item>
                        <v-list-item-title class="overflow-y-auto">
                            <span ref="taskContainer"></span>
                        </v-list-item-title>
                        <v-card v-if="exercise.task_picture" class="pa-3 w-75 mx-auto my-3">
                            <v-img :src="exercise.task_picture"/>
                        </v-card>
                    </v-list-item>
                    <v-divider class="my-2"/>
                    <v-list-item class="py-2">
                        <MathField class="mt-2" v-model="mathValue" color="primary"
                                   :label="t('exercise.solve.solution')"/>
                        <v-text-field v-model="description" color="primary" variant="outlined"
                                      :label="t('exercise.solve.description')"
                                      math-virtual-keyboard-policy="manual"/>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-card-item>
    </template>
</template>
<style>
.katex { line-height: 1.75 !important; }
</style>
