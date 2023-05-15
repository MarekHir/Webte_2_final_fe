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

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
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
                        :subtitle="store.userRole"/>
            </v-list>
            <v-divider/>
            <v-list>

            </v-list>
            <template v-slot:append>
                <v-list nav>
                    <v-list-item to="/instructions" as prepend-icon="mdi-help-circle-outline"
                                 :title="t('dashboard.menu.instructions')"/>
                    <ChangeLanguage list_item/>
                    <v-list-item prepend-icon="mdi-logout" @click="handleLogout" :title="t('dashboard.menu.logout')"/>
                </v-list>
            </template>
        </v-navigation-drawer>
        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>
<style scoped>
</style>