<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import CrudButton from "@/components/buttons/CrudButton.vue";
import CustomTable from "@/components/CustomTable.vue";
import Instruction from "@/models/Instruction";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const instructions = ref([]);
const instructions_options = ref({page: 1, max_page: 1, sort_by: '-updated_at'})
const headers = [
    {
        title: 'teacher.students.attr.icon',
        key: 'created_by.icon',
        lodash: true,
        is_icon: true,
        header_style: 'width: 5%',
        no_icon: 'mdi-account-tie',
    },
    {
        title: 'exercises_list.attr.published_by',
        key: 'full_name',
        sortable: true,
    },
    {
        title: 'instructions.attr.name',
        key: 'name',
        sortable: true,
    },
    {
        title: 'instructions.attr.description',
        key: 'description',
        sortable: true,
    },
    {
        title: 'instructions.attr.for_user_type',
        key: 'forTypeKey',
        sortable: true,
        trans_value: true,
        custom_sort_key: 'for_user_type'
    }
]

onMounted(async () => {
    await requestData(false)
    await router.isReady();
});


const requestData = async (refresh_page) => {
    if (refresh_page) instructions_options.value.page = 1;
    let data = await Instruction.orderBy(instructions_options.value.sort_by)
        .with('created_by').limit(10).page(instructions_options.value.page).get();
    instructions_options.value.page = data.current_page ?? 1;
    instructions_options.value.max_page = data.last_page ?? 1;
    instructions.value = data.data.map(instruction => new Instruction(instruction));
}

const goToShow = async (id) => {
    await router.push({name: 'ShowInstruction', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowInstruction') // TODO: Add error handling
    });
}
</script>
<template>
    <DashboardTitle title_key="instructions.indexTitle">
        <template v-if="store.isTeacher" v-slot:prepend>
            <CrudButton action="create" route-name="NewInstruction"/>
        </template>
    </DashboardTitle>
    <v-divider class="mt-4"/>
    <v-card-item>
        <CustomTable :data="instructions" :headers="headers" v-model:page="instructions_options.page"
                     @refresh="requestData" v-model:sort-by="instructions_options.sort_by"
                     :max_page="instructions_options.max_page" @on-click="goToShow"/>
    </v-card-item>
</template>
<style scoped>
</style>