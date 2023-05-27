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
import {useTheme} from "vuetify";
import CrudButton from "@/components/buttons/CrudButton.vue";

const {t} = useI18n({useScope: 'global'});
const student = ref(null);
const route = useRoute();
const theme = useTheme();
const loading = ref(true);
const assigned_exercises = ref([])
const solved_exercises = ref([])
const show_more = ref({assigned: false, solved: false})
const limit = 3;
const assigned_header = ref([
    {
        title: 'exercise.attr.name',
        key: 'name',
    }, {
        title: 'exercises_list.attr.points',
        key: 'maxPoints',
    }, {
        title: 'exercise.attr.points',
        key: 'points',
    }, {
        title: 'exercise.attr.createdAt',
        key: 'createdAt',
    }
])
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
    await getData();
    assigned_header.value = assigned_header.value.filter(header => header.key !== 'points')
    loading.value = false;
});

const getData = async () => {
    student.value = await Student.find(route.params.id);
    let result = await Exercise.where({created_by: student.value.id})
        .where({solved: false}).orderBy('-updated_at').limit(limit).get()
    assigned_exercises.value = result.data.map(e => new Exercise(e));
    show_more.value.assigned = result.last_page !== 1;
    result = await Exercise.where({created_by: student.value.id})
        .where({solved: true}).orderBy('-updated_at').limit(limit).get();
    solved_exercises.value = result.data.map(e => new Exercise(e));
    show_more.value.solved = result.last_page !== 1;
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
        <DashboardTitle title_key="teacher.students.show.title">
            <template v-slot:append>
                <CrudButton action="index" title="teacher.students.buttons.back_to_students" color="surface-variant"
                            route-name="IndexStudents"/>
                <CrudButton action="index" title="teacher.students.buttons.back_to_exercises" color="secondary"
                            route-name="IndexExercises"/>
            </template>
            <template v-slot:prepend>
                <CrudButton action="show" title="teacher.students.buttons.show_exercises"
                            route-name="ShowStudentsExercises" :id="student.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle :subtitle="student.fullName"/>
        <v-divider class="mt-2"/>
        <v-card-item>
            <v-container>
                <ShowCard filter_empty title="teacher.students.show.info_card" :fields="infoFields" :object="student"/>
                <ShowCard title="teacher.students.show.assigned_exercises">
                    <template v-if="assigned_exercises.length > 0">
                        <CustomTable :headers="assigned_header" :data="assigned_exercises" @on-click="goToExercise"/>
                        <h3 v-if="show_more.assigned" class="text-h5 text-center link"
                            @click="goToExercises">
                            {{ t('teacher.students.show.show_more') }}</h3>
                    </template>
                    <h3 v-else class="text-h5 text-center">{{ t('teacher.students.show.no_assigned_exercises') }}</h3>
                </ShowCard>
                <ShowCard title="teacher.students.show.solved_exercises">
                    <template v-if="solved_exercises.length > 0">
                        <CustomTable :headers="solved_header" :data="solved_exercises" @on-click="goToExercise"/>
                        <h3 v-if="show_more.solved" class="text-h5 text-center link"
                            @click="goToExercises">
                            {{ t('teacher.students.show.show_more') }}</h3>
                    </template>
                    <h3 v-else class="text-h5 text-center">{{ t('teacher.students.show.no_solved_exercises') }}</h3>
                </ShowCard>
            </v-container>
        </v-card-item>
    </template>
</template>
<style scoped>
.link {
    color: v-bind('theme.current.value.colors["primary"]');
    cursor: pointer;
}

.link:hover {
    color: v-bind('theme.current.value.colors["secondary"]');
}
</style>