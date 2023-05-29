<script setup>
import {onMounted, ref} from "vue";
import {useTheme} from "vuetify";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import StudentDashboard from "@/components/Dashboard/StudentDashboard.vue";
import {getDashboard} from "@/api/exercises";
import {useStateStore} from "@/stores/state";
import TeacherDashboard from "@/components/Dashboard/TeacherDashboard.vue";
import AdminDashboard from "@/components/Dashboard/AdminDashboard.vue";

const data = ref({})
const loaded = ref(false)
const theme = useTheme();
const store = useStateStore();

onMounted(async () => {
    data.value = await getDashboard()
    loaded.value = true
});
</script>

<template>
    <DashboardTitle title_key="home.title" class="mb-0 pb-0"/>
    <template v-if="loaded">
        <AdminDashboard v-if="store.isAdmin" :data="data"/>
        <TeacherDashboard v-else-if="store.isTeacher" :data="data"/>
        <StudentDashboard v-else-if="store.isStudent" :data="data"/>
    </template>
</template>
