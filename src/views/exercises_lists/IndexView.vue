<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import CrudButton from "@/components/buttons/CrudButton.vue";
import CustomTable from "@/components/CustomTable.vue";
import ExercisesList from "@/models/ExercisesList";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const exercises_lists = ref([]);
const exercises_options = ref({page: 1, max_page: 1, sort_by: '-updated_at'})
const headers = [
    {
        title: 'teacher.students.attr.icon',
        key: 'created_by.icon',
        lodash: true,
        is_icon: true,
        header_style: 'width: 5%',
        no_icon: 'mdi-account-tie',
    }, {
        title: 'exercises_list.attr.published_by',
        key: 'full_name',
        sortable: true,
    }, {
        title: 'exercises_list.attr.name',
        key: 'name',
        sortable: true,
    }, {
        title: 'exercises_list.attr.points',
        key: 'points',
        sortable: true,
    }, {
        title: 'exercises_list.attr.is_active',
        key: 'is_active',
        trans_value: true,
        sortable: true,
    }, {
        title: 'exercises_list.attr.deadline',
        key: 'deadlineDate',
        trans_null: true,
        default: 'not_set',
        sortable: true,
    }, {
        title: 'exercises_list.attr.initiation',
        key: 'initiationDate',
        trans_null: true,
        default: 'not_set',
        sortable: true,
    }
]

onMounted(async () => {
    await requestData(false);
    await router.isReady();
});

const requestData = async (refresh_page) => {
    if (refresh_page) exercises_options.value.page = 1;
    let data = await ExercisesList.orderBy(exercises_options.value.sort_by).with('created_by').limit(10).page(exercises_options.value.page).get();
    exercises_options.value.page = data.current_page ?? 1;
    exercises_options.value.max_page = data.last_page ?? 1;
    exercises_lists.value = data.data.map(exercise_list => new ExercisesList(exercise_list));
}

const goToShow = async (id) => {
    await router.push({name: 'ShowExercisesList', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowExercisesList') // TODO: Add error handling
    });
}
</script>
<template>
    <DashboardTitle title_key="exercises_list.index.title">
        <template v-slot:prepend>
            <CrudButton action="create" route-name="NewExercisesList"/>
        </template>
    </DashboardTitle>
    <v-divider class="mt-4"/>
    <v-card-item>
        <CustomTable :data="exercises_lists" :headers="headers" v-model:page="exercises_options.page"
                     @refresh="requestData" v-model:sort-by="exercises_options.sort_by"
                     :max_page="exercises_options.max_page" @on-click="goToShow"/>
    </v-card-item>
</template>
<style scoped>
</style>