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
import {fullName} from "@/utils";
import {deleteExerciseList, getExerciseList} from "@/api/exercises_lists";


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
    exercise.value = await getExerciseList(route.params.id);
    console.log(exercise.value)
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
            <template v-if="(store.user.id === exercise.created_by.id && store.isStudent)|| store.isAdmin"
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
        <v-divider className="mt-4"/>
        <v-card-item>
            <v-container>
                <v-card class="pa-4 mb-4">
                    <v-card-item>
                        <h3 class="text-h5 text-center">{{ exercise.description }}</h3>
                    </v-card-item>
                </v-card>
                <v-card class="pa-4 my-4">
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                                <h3 class="text-h5">{{ t('exercises_list.initiation') }}: {{ exercise.initiation }}</h3>
                            </v-col>
                            <v-divider vertical/>
                            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                                <h3 class="text-h5">{{ t('exercises_list.deadline') }}: {{ exercise.deadline }}</h3>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
                <v-card class="pa-4 my-4">
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                                <h3 class="text-h5">{{ t('exercises_list.points') }}: {{ exercise.points }}</h3>
                            </v-col>
                            <v-divider vertical/>
                            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                                <h3 class="text-h5">{{ t('exercises_list.is_active') }}: {{ t(`bool.${exercise.is_active}`) }}</h3>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-container>
        </v-card-item>
        <DeleteModal :dialog="delete_modal" @close="delete_modal = false" @delete="handleDelete"/>
    </template>
</template>