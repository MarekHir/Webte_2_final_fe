<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {getStudent} from "@/api/students";
import {fullName} from "@/utils";
import {useRoute} from "vue-router";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import router from "@/router";

const {t} = useI18n({useScope: 'global'});
const data = ref(null);
const route = useRoute();

onMounted(async () => {
    await router.isReady()
    data.value = await getStudent(route.params.id)
});

</script>
<template>
    <DashboardTitle title_key="teacher.students.show.title"/>
    <DashboardSubtitle :subtitle="fullName(data)"/>
    <v-divider class="mt-2"/>
    <v-card-item>
        <v-container>
            <template v-if="data != null">
                <v-table>
                    <thead>
                    <tr>
                        <th>{{ t('teacher.students.show.table_info.header.icon') }}</th>
                        <th>{{ t('teacher.students.show.table_info.header.first_name') }}</th>
                        <th>{{ t('teacher.students.show.table_info.header.surname') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{ data.icon }}</td>
                        <td>{{ data.first_name }}</td>
                        <td>{{ data.surname }}</td>
                    </tr>
                    </tbody>
                </v-table>
            </template>
        </v-container>
    </v-card-item>
    <v-divider class="w-75 ma-auto my-2"/>
</template>