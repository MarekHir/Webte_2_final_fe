<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {getStudents} from "@/api/teacher";
import router from "@/router";

const {t} = useI18n({useScope: 'global'});
const data = ref([]);

onMounted(async () => {
    data.value = await getStudents()
});

const goToStudent = async (id) => {
    console.log(id)
    await router.push({name: 'TeacherStudentsShow', params: {id: id}}).catch(() => {
        console.log('Error while routing to TeacherStudentsShow')
    })
}

</script>
<template>
    <v-card-title class="text-center">
        <h1 class="text-h3">
            {{ t('teacher.students.index.title') }}
        </h1>
    </v-card-title>
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