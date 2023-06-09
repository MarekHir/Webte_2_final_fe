<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import router from "@/router";
import Student from "@/models/Student";
import ShowCard from "@/components/ShowCard.vue";
import CustomTable from "@/components/CustomTable.vue";
import Exercise from "@/models/Exercise";
import CrudButton from "@/components/buttons/CrudButton.vue";

const {t} = useI18n({useScope: 'global'});
const student = ref(null);
const route = useRoute();
const loading = ref(true);
const assigned_exercises = ref([])
const solved_exercises = ref([])
const assigned_options = ref({page: 1, max_page: 1, sort_by: '-created_at'})
const solved_options = ref({page: 1, max_page: 1, sort_by: '-created_at'})
const limit = 5;
const assigned_header = ref([
    {
        title: 'exercise.attr.list_name',
        key: 'listName',
        custom_sort_key: 'list_name',
        sortable: true,
    }, {
        title: 'exercise.attr.section',
        key: 'section',
        sortable: true,
    }, {
        title: 'exercises_list.attr.points',
        key: 'maxPoints',
        custom_sort_key: 'max_points',
        sortable: true,
    }, {
        title: 'exercise.attr.points',
        key: 'points',
        sortable: true,
    }, {
        title: 'exercise.attr.createdAt',
        key: 'createdAt',
        custom_sort_key: 'created_at',
        sortable: true,
    }
]);
const solved_header = ref(assigned_header.value)

const infoFields = [
    {title: 'teacher.students.attr.id', key: 'id'},
    {title: 'teacher.students.attr.first_name', key: 'first_name'},
    {title: 'teacher.students.attr.surname', key: 'surname'},
    {title: 'teacher.students.attr.icon', key: 'icon', is_icon: true, no_icon: 'mdi-account-school'},
    {title: 'teacher.students.attr.created_at', key: 'createdAt'},
]

onMounted(async () => {
    loading.value = true;
    await router.isReady()
    student.value = await Student.find(route.params.id);
    await requestAssigned();
    await requestSolved();
    assigned_header.value = assigned_header.value.filter(header => header.key !== 'points')
    loading.value = false;
});

const requestAssigned = async (refresh_page) => {
    if (refresh_page) assigned_options.value.page = 1;
    let data = await Exercise.where({created_by: student.value.id})
        .where({solved: false}).orderBy(assigned_options.value.sort_by).limit(limit).page(assigned_options.value.page).get();
    assigned_options.value.page = data.current_page ?? 1;
    assigned_options.value.max_page = data.last_page ?? 1;
    assigned_exercises.value = data.data.map(exercise => new Exercise(exercise));
}

const requestSolved = async (refresh_page) => {
    if (refresh_page) solved_options.value.page = 1;
    let data = await Exercise.where({created_by: student.value.id})
        .where({solved: true}).orderBy(solved_options.value.sort_by).limit(limit).page(solved_options.value.page).get();
    solved_options.value.page = data.current_page ?? 1;
    solved_options.value.max_page = data.last_page ?? 1;
    solved_exercises.value = data.data.map(exercise => new Exercise(exercise));
}

const goToExercise = async (id) => {
    await router.push({name: 'ShowExercise', params: {id: id}})
}

const goToExercises = async () => {
    await router.push({name: 'ShowStudentsExercises', params: {id: student.value.id}})
}

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="exercise.student.title">
            <template v-slot:append>
                <CrudButton action="index" title="teacher.students.buttons.back_to_students" color="surface-variant"
                            route-name="IndexStudents"/>
                <CrudButton action="index" title="teacher.students.buttons.back_to_exercises" color="secondary"
                            route-name="IndexExercises"/>
            </template>
            <template v-slot:prepend>
                <CrudButton action="show" title="exercise.student.show_student" route-name="ShowStudents"
                            :id="student.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle :subtitle="student.fullName"/>
        <v-divider class="mt-2"/>
        <v-card-item>
            <v-container>
                <ShowCard title="teacher.students.show.assigned_exercises">
                    <template v-if="assigned_exercises.length > 0">
                        <CustomTable :headers="assigned_header" v-model:page="assigned_options.page"
                                     :max_page="assigned_options.max_page" v-model:sort-by="assigned_options.sort_by"
                                     :data="assigned_exercises" @on-click="goToExercise" @refresh="requestAssigned"/>
                    </template>
                    <h3 v-else class="text-h5 text-center">{{ t('teacher.students.show.no_assigned_exercises') }}</h3>
                </ShowCard>
                <ShowCard title="teacher.students.show.solved_exercises">
                    <template v-if="solved_exercises.length > 0">
                        <CustomTable :headers="solved_header" v-model:page="solved_options.page"
                                     :max_page="solved_options.max_page" v-model:sort-by="solved_options.sort_by"
                                     :data="solved_exercises" @on-click="goToExercise" @refresh="requestSolved"/>
                    </template>
                    <h3 v-else class="text-h5 text-center">{{ t('teacher.students.show.no_solved_exercises') }}</h3>
                </ShowCard>
            </v-container>
        </v-card-item>
    </template>
</template>