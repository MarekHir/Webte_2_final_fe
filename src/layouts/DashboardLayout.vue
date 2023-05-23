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
import {useTheme} from "vuetify";
import {computed, onMounted, onUnmounted, ref} from "vue";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const {user, menuHidden, show_keyboard} = storeToRefs(store);
const theme = useTheme();
const screenWidth = ref(window.innerWidth);

const keyboard_height = computed(() => {
    if(!show_keyboard.value) {
        return 0;
    } else if(screenWidth.value < 470) {
        return 210;
    } else if(screenWidth.value < 800) {
        return 220;
    } else if(screenWidth.value < 825) {
        return 250;
    } else {
        return 320;
    }
});

const updateWidth = () => {
    screenWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});

const handleLogout = async () => {
    await logout();
    await router.push({name: 'Login'});
}
const toggleDarkMode = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>

<template>
    <v-layout :full-height="true" v-if="store.isAuthenticated">
        <v-navigation-drawer v-model:temporary="menuHidden" rail expand-on-hover permanent class="">
            <v-list>
                <v-list-item
                        :prepend-avatar="store.userPicture"
                        :prepend-icon="store.userPicture ? '' : store.userIcon"
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
                        :to="{name: 'GenerateExercises'}"
                        prepend-icon="mdi-clipboard-plus"
                        :title="t('dashboard.menu.student.generate')"/>
                <v-list-item
                        :to="{name: 'AssignedExercises'}"
                        prepend-icon="mdi-clipboard-clock"
                        :title="t('dashboard.menu.student.assigned')"/>
                <v-list-item
                        :to="{name: 'SolvedExercises'}"
                        prepend-icon="mdi-clipboard-check"
                        :title="t('dashboard.menu.student.solved')"/>
            </v-list>
            <v-list-item v-if="store.isAdmin" :subtitle="t('user.role.teacher') + ':'"/>
            <v-list nav v-if="store.isTeacher">
                <v-list-item
                        to="/exercises_lists/new"
                        prepend-icon="mdi-file-plus"
                        :title="t('dashboard.menu.teacher.latex')"/>
                <v-list-item
                        to="/exercises_lists"
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
                    <v-list-item prepend-icon="mdi-theme-light-dark" :title="t(`theme_mode.${theme.global.name.value}`)"
                                 @click="toggleDarkMode()">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-logout" @click="handleLogout"
                                 :title="t('dashboard.menu.logout')"/>
                </v-list>
            </template>
        </v-navigation-drawer>
        <v-main scrollable>
            <div class="pa-4 fill-height overflow-y-auto">
                <v-card class="pa-4" style="min-height: 100%">
                    <slot></slot>
                </v-card>
            </div>
        </v-main>
        <v-bottom-navigation id="Latex-keyboard-container" :height="keyboard_height"/>
    </v-layout>
</template>
<style scoped>
:deep(::-webkit-scrollbar) {
    width: 0;
    background: transparent;
}
</style>