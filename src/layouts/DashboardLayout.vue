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
import DarkModeSwitch from "@/components/DarkModeSwitch.vue";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const {user, menuHidden, show_keyboard, theme_name} = storeToRefs(store);
const theme = useTheme();
const screenWidth = ref(window.innerWidth);

const keyboard_height = computed(() => {
    if (!show_keyboard.value) {
        return 0;
    } else if (screenWidth.value < 470) {
        return 210;
    } else if (screenWidth.value < 800) {
        return 220;
    } else if (screenWidth.value < 825) {
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
    theme_name.value = theme.global.name.value;
}
</script>

<template>
    <v-layout :full-height="true" v-if="store.isAuthenticated">
        <v-navigation-drawer v-model:temporary="menuHidden" rail expand-on-hover permanent class="">
            <v-list>
                <v-list-item
                        :to="{name: 'UserProfile'}"
                        :prepend-avatar="store.userPicture"
                        :prepend-icon="store.userPicture ? '' : store.userIcon"
                        :title="store.fullName"
                        class="no-select"
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
                        to="/students"
                        prepend-icon="mdi-account-multiple"
                        :title="t('dashboard.menu.teacher.students')"/>
                <v-list-item
                        to="/exercises"
                        prepend-icon="mdi-clipboard-multiple-outline"
                        :title="t('dashboard.menu.teacher.student_exercises')"/>
            </v-list>
            <template v-slot:append>
                <v-list nav>
                    <v-list-item to="/instructions" prepend-icon="mdi-help-circle-outline"
                                 :title="t('dashboard.menu.instructions')"/>
                    <ChangeLanguage list_item class="no-select"/>
                    <DarkModeSwitch list_item class="no-select"/>
                    <v-list-item prepend-icon="mdi-logout" @click="handleLogout"
                                 :title="t('dashboard.menu.logout')" class="no-select"/>
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

.no-select {
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>