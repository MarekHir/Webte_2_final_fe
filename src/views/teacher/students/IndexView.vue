<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {getStudents} from "@/api/students";
import router from "@/router";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import Student from "@/models/Student";
import CustomTable from "@/components/CustomTable.vue";

const {t} = useI18n({useScope: 'global'});
const students = ref([]);
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

onMounted(async () => {
    students.value = await Student.get();
    await router.isReady();
});

const goToStudent = async (id) => {
    await router.push({name: 'TeacherStudentsShow', params: {id: id}}).catch(() => {
        console.log('Error while routing to TeacherStudentsShow') // TODO: Add error handling
    })
}

</script>
<template>
    <DashboardTitle title_key="teacher.students.index.title"/>
    <v-divider class="mt-2"/>
    <v-card-item>
        <v-container>
            <CustomTable :headers="headers" :data="students"/>
        </v-container>
    </v-card-item>
    <v-divider class="w-75 ma-auto my-2"/>
</template>