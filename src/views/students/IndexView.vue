<script setup>
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import router from "@/router";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import Student from "@/models/Student";
import CustomTable from "@/components/CustomTable.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import Model from "@/models/Model";

const {t} = useI18n({useScope: 'global'});
const students = ref([]);
const students_options = ref({page: 1, max_page: 1, sort_by: 'id'})
const headers = ref([
    {
        title: 'teacher.students.attr.icon',
        key: 'icon',
        is_icon: true,
        header_style: 'width: 5%',
        no_icon: 'mdi-account-school',
    },
    {
        title: 'teacher.students.attr.id',
        key: 'id',
        sortable: true,
    },
    {
        title: 'teacher.students.attr.first_name',
        key: 'first_name',
        sortable: true,
    }, {
        title: 'teacher.students.attr.surname',
        key: 'surname',
        sortable: true,
    },{
        title: 'teacher.students.attr.email',
        key: 'email',
        sortable: true,
    }, {
        title: 'teacher.students.attr.num_of_gen_exercises',
        key: 'num_of_exercises',
        sortable: true,
    }, {
        title: 'teacher.students.attr.num_of_solved_exercises',
        key: 'num_of_solved',
        sortable: true,
    }, {
        title: 'teacher.students.attr.total_earned_points',
        key: 'total_points',
        sortable: true,
    }
]);
const csv_url = computed(() => {
    return `${students.value[0]?.baseURL()}/students/csv${Model.getQueryParams({sort: students_options.value.sort_by})}`
});

onMounted(async () => {
    await requestData(false);
    await router.isReady();
});

const requestData = async (refresh_page) => {
    if (refresh_page) students_options.value.page = 1;
    let data = await Student.orderBy(students_options.value.sort_by).limit(10).page(students_options.value.page).get();
    students_options.value.page = data.current_page ?? 1;
    students_options.value.max_page = data.last_page ?? 1;
    students.value = data.data.map(student => new Student(student));
}

const goToStudent = async (id) => {
    await router.push({name: 'ShowStudents', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowStudents') // TODO: Add error handling
    })
}
</script>
<template>
    <DashboardTitle title_key="teacher.students.index.title">
        <template v-slot:append>
            <CrudButton action="index" title="teacher.students.buttons.back_to_exercises" route-name="IndexExercises"/>
        </template>
        <template v-slot:prepend>
            <CrudButton v-if="students.length > 0"
                        :href="csv_url"
                        title="teacher.students.buttons.export_csv" action="custom" color="info"
                        prepend_icon="mdi-table-arrow-down"/>
        </template>
    </DashboardTitle>
    <v-divider class="mt-2"/>
    <v-card-item>
        <CustomTable @on-click="goToStudent" v-model:sort-by="students_options.sort_by" @refresh="requestData"
                     v-model:page="students_options.page" :max_page="students_options.max_page" :headers="headers"
                     :data="students"/>
    </v-card-item>
    <v-divider class="w-75 ma-auto my-2"/>
</template>