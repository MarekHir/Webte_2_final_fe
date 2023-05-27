<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import ShowCard from "@/components/ShowCard.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import User from "@/models/User";
import {useStateStore} from "@/stores/state";
import ChangeIconModal from "@/components/Modals/ChangeIconModal.vue";
import {storeToRefs} from "pinia";

const {t} = useI18n({useScope: 'global'});
const loading = ref(true);
const store = useStateStore();
const {user} = storeToRefs(store)
const change_icon_modal = ref(false);
const sys_info_fields = [
    {
        'title': 'user.attr.id',
        'key': 'id'
    },
    {
        title: 'user.attr.role',
        key: 'roleKey',
        trans_value: true
    },
    {
        title: 'user.attr.created_at',
        key: 'createdAt'
    },
];
const user_info_fields = [
    {
        title: 'user.attr.first_name',
        key: 'first_name'
    },
    {
        title: 'user.attr.surname',
        key: 'surname'
    },
    {
        title: 'user.attr.icon',
        key: 'icon',
        is_icon: true,
        no_icon: 'mdi-account',
    },
    {
        title: 'user.attr.email',
        key: 'email'
    }
];

onMounted(async () => {
    loading.value = true;
    await requestUser();
    loading.value = false;
});

const requestUser = async () => {
    user.value = await User.find(store.user.id);

};

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="user.profile.title">
            <template v-slot:prepend>
                <CrudButton action="edit" title="user.buttons.change_icon" no-redirect
                            @button-clicked="change_icon_modal = true"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle :subtitle="user.fullName"/>
        <v-divider class="mt-2"/>
        <v-card-item>
            <v-container>
                <ShowCard title="user.profile.sys_info" :object="user" :fields="sys_info_fields"/>
                <ShowCard title="user.profile.user_info" :object="user" :fields="user_info_fields"/>
            </v-container>
        </v-card-item>
        <ChangeIconModal v-model:dialog="change_icon_modal" @close="change_icon_modal = false"
                         @refresh="requestUser"/>
    </template>
</template>