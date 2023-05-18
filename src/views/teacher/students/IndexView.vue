<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {getStudents} from "@/api/students";
import router from "@/router";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";

const {t} = useI18n({useScope: 'global'});
const data = ref([]);

onMounted(async () => {
    data.value = await getStudents()
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
            <v-table>
                <thead>
                <tr>
                    <th>{{ t('teacher.students.index.table.header.first_name') }}</th>
                    <th>{{ t('teacher.students.index.table.header.surname') }}</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="student in data" :key="student.id">
                    <tr @click.once="goToStudent(student.id)">
                        <td>{{ student.first_name }}</td>
                        <td>{{ student.surname }}</td>
                    </tr>
                </template>
                </tbody>
            </v-table>
        </v-container>
    </v-card-item>
    <v-divider class="w-75 ma-auto my-2"/>
</template>