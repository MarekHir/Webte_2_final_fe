<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref, watch} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import CrudButton from "@/components/buttons/CrudButton.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import {getExerciseLists} from "@/api/exercises_lists";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const loading = ref(true);
const route = useRoute();
const exercises_lists = ref([])
const selected_exercises = ref([])
const alert_color = ref('')

// TODO: Add loading everywhere
onMounted(async () => {
    loading.value = true;
    exercises_lists.value = await getExerciseLists();
    await router.isReady();
    loading.value = false;
});

const onSubmit = async () => {
    if(selected_exercises.value.length === 0) {
        store.addAlert(t('exercises.generate.no_selected'), 'error')
        alert_color.value = 'text-red'
        return;
    }
    if(await deleteInstruction(instruction.value.id))
        await router.push({name: 'IndexInstructions'}).catch(() => {
            console.log('Error while routing to IndexInstructions') // TODO: Add error handling
        });

}

watch(selected_exercises, () => {
    alert_color.value = ''
});

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercises.generate.title">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexInstructions"/>
            </template>
            <template v-slot:prepend>
                <CrudButton action="save" title="exercises.generate.save_button" @button-clicked="onSubmit" route-name="" no-redirect/>
            </template>
        </DashboardTitle>
        <v-card-subtitle>
            <h5 class="text-center text-h5">{{t('exercises.generate.tooltip')}}</h5>
        </v-card-subtitle>
        <v-divider class="mt-4"/>
        <v-card-item>
            <v-container>
                <v-item-group v-model="selected_exercises" mandatory multiple>
                    <v-container class="w-75">
                        <h5 class="text-h5 text-center" :class="alert_color">{{t('exercises.generate.exercises_list')}}</h5>
                        <v-item v-for="option in exercises_lists"
                                :key="option.id"
                                :value="option.id"
                                v-slot="{ isSelected, toggle }">
                            <v-card :color="isSelected ? 'success' : ''"
                                    class="ma-2"
                                    @click="toggle">
                                <div class="pa-3">
                                    <v-icon v-if="isSelected" icon="mdi-check"/>
                                    <span :class="alert_color">{{ option.name }} - {{ option.description }}</span>
                                </div>
                            </v-card>
                        </v-item>
                    </v-container>
                </v-item-group>
            </v-container>
        </v-card-item>
    </template>
</template>