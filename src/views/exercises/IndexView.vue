<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import Exercise from "@/models/Exercise";
import CustomTable from "@/components/CustomTable.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const loading = ref(true);
const route = useRoute();
const exercises = ref([]);
const headers = ref([
    {
        title: 'exercise.attr.name',
        key: 'name',
    }, {
        title: 'exercises_list.attr.points',
        key: 'exercises_lists_sections.exercises_lists.points',
        lodash: true,
    }, {
        title: 'exercise.attr.solved',
        key: 'solved',
        trans_value: true,
    }, {
        title: 'exercise.attr.points',
        key: 'points',
    }, {
        title: 'exercise.attr.createdAt',
        key: 'createdAt',
    }
]);

// TODO: Add loading everywhere
onMounted(async () => {
    loading.value = true;
    await router.isReady();
    exercises.value = await Exercise.get()
    loading.value = false;
});

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercise.index.title"/>
        <v-divider class="mt-4"/>
        <v-card-item>
            <CustomTable :data="exercises" :headers="headers"/>
        </v-card-item>
    </template>
</template>