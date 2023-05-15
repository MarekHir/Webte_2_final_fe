<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "DashboardLayout",
});
</script>
<script setup>
import ChangeLanguage from "@/components/ChangeLanguage.vue";
import {useI18n} from "vue-i18n";
import {logout} from "@/api/auth";
import router from "@/router";
import {useStateStore} from "@/stores/state";
import {storeToRefs} from "pinia";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const {user} = storeToRefs(store);
const handleLogout = async () => {
    let result = await logout();
    if (result === true)
        await router.push({name: 'Login'});
}
</script>

<template>
    <v-layout :full-height="true">
        <v-navigation-drawer rail expand-on-hover>
            <v-list>
                <v-list-item
                        :prepend-avatar="store.userPicture"
                        :prepend-icon="store.userIcon"
                        :title="store.fullName"
                        :subtitle="t('user.role.' + user.role)"/>
            </v-list>
            <v-divider/>
            <v-list nav>
                <v-list-item
                        to="/"
                        prepend-icon="mdi-home"
                        :title="t('dashboard.menu.home')"/>
            </v-list>
            <v-list-item v-if="store.isAdmin" :subtitle="t('user.role.student') + ':'"/>
            <v-list nav v-if="store.isStudent">
                <v-list-item
                        to="/student/exercise/new"
                        prepend-icon="mdi-clipboard-plus"
                        :title="t('dashboard.menu.student.generate')"/>
                <v-list-item
                        to="/student/exercise/assigned"
                        prepend-icon="mdi-clipboard-clock"
                        :title="t('dashboard.menu.student.assigned')"/>
                <v-list-item
                        to="/student/exercise/solved"
                        prepend-icon="mdi-clipboard-check"
                        :title="t('dashboard.menu.student.solved')"/>
            </v-list>
            <v-list-item v-if="store.isAdmin" :subtitle="t('user.role.teacher') + ':'"/>
            <v-list nav v-if="store.isTeacher">
                <v-list-item
                        to="/teacher/latex/new"
                        prepend-icon="mdi-file-plus"
                        :title="t('dashboard.menu.teacher.latex')"/>
                <v-list-item
                        to="/teacher/exercise/create"
                        prepend-icon="mdi-book-plus-multiple"
                        :title="t('dashboard.menu.teacher.exercise')"/>
                <v-list-item
                        to="/teacher/students"
                        prepend-icon="mdi-account-multiple"
                        :title="t('dashboard.menu.teacher.students')"/>
                <v-list-item
                        to="/teacher/students/exercises"
                        prepend-icon="mdi-clipboard-multiple-outline"
                        :title="t('dashboard.menu.teacher.student_exercises')"/>
            </v-list>
            <template v-slot:append>
                <v-list nav>
                    <v-list-item to="/instructions" prepend-icon="mdi-help-circle-outline"
                                 :title="t('dashboard.menu.instructions')"/>
                    <ChangeLanguage list_item/>
                    <v-list-item prepend-icon="mdi-logout" @click="handleLogout"
                                 :title="t('dashboard.menu.logout')"/>
                </v-list>
            </template>
        </v-navigation-drawer>
        <v-main>
            <div class="pa-4 fill-height">
                <v-card height="100%" class="pa-4">
                    <slot></slot>
                </v-card>
            </div>
        </v-main>
    </v-layout>
</template>
<style scoped>
</style>