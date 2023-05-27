<script setup>
// import ShowCard from "@/components/ShowCard.vue";
// import {computed, onMounted, ref} from "vue";
// import Exercise from "@/models/Exercise";
// import CustomTable from "@/components/CustomTable.vue";
// import router from "@/router";
// import {DoughnutChart, BarChart} from "vue-chart-3";
// import {
//     Chart,
//     DoughnutController,
//     ArcElement,
//     Tooltip,
//     Legend,
//     BarController,
//     BarElement,
//     CategoryScale,
//     LinearScale
// } from 'chart.js';
// import {useI18n} from "vue-i18n";
// import {useTheme} from "vuetify";
// import datalabels from "chartjs-plugin-datalabels"
// import ExercisesList from "@/models/ExercisesList";
// import vuetify_colors from 'vuetify/lib/util/colors'
//
//
// Chart.register(DoughnutController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);
//
// const props = defineProps({
//     data: {
//         type: Object,
//         required: true,
//     }
// })
// const colors = ref([])
// const exercises_lists_headers = ref([
//     {
//         title: 'exercises_list.attr.name',
//         key: 'name',
//     }, {
//         title: 'home.teacher.exercises_lists.total_generated',
//         key: 'total_generated',
//     }, {
//         title: 'home.teacher.exercises_lists.total_solved',
//         key: 'total_solved',
//     }, {
//         title: 'home.teacher.exercises_lists.solved_average',
//         key: 'solved_average',
//     }, {
//         title: 'exercises_list.attr.is_active',
//         key: 'is_active',
//         trans_value: true,
//     }
// ]);
// const exercises_headers = ref([
//     {
//         title: 'exercise.attr.list_name',
//         key: 'listName',
//         custom_sort_key: 'list_name',
//     }, {
//         title: 'exercise.attr.section',
//         key: 'section',
//     }, {
//         title: 'exercise.attr.points',
//         key: 'points',
//         default: 'exercise.not_solved',
//         trans_null: true,
//     }, {
//         title: 'exercise.attr.created_by',
//         key: 'createdBy'
//     }
// ]);
// const exercises_lists = ref([])
// const exercises = ref([])
// const statistics = ref([])
// const show_more = ref({exercises_lists: false, exercises: false,})
// const loaded = ref(false);
// const theme = useTheme();
// const {t} = useI18n({useScope: 'global'});
//
// onMounted(() => {
//     exercises_lists.value = props.data.exercises_lists.map(ex => new ExercisesList(ex));
//     show_more.value.exercises_lists = exercises_lists.value.length === 3;
//     exercises.value = props.data.exercises.map(ex => new Exercise(ex));
//     show_more.value.exercises = exercises.value.length === 3;
//     statistics.value = props.data.statistics
//     colors.value = Object.keys(vuetify_colors).map(color => vuetify_colors[color].base);
//     loaded.value = true;
// })
//
// const general_options = computed(() => {
//     return {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'top',
//                 labels: {
//                     color: theme.global.current.value.colors["surface-variant"],
//                 }
//             },
//             tooltip: {
//                 bodyColor: theme.global.current.value.colors.background,
//             }
//         }
//     }
// })
//
// const generated_graph = computed(() => {
//     return {
//         labels: statistics.value.lists.filter(list => list.count > 0).map(list => list.name),
//         datasets: [
//             {
//                 data: statistics.value.lists.filter(list => list.count > 0).map(list => list.count),
//                 backgroundColor: statistics.value.lists.filter(list => list.count > 0).map(
//                     (_, index) => colors.value[index * 5 % colors.value.length]),
//                 borderColor: theme.global.current.value.colors.background,
//                 datalabels: {
//                     color: statistics.value.lists.filter(list => list.count > 0)
//                         .map(_ => theme.global.current.value.colors["on-background"]),
//                 }
//             },
//         ],
//     }
// });
//
// const average_graph = computed(() => {
//     return {
//         labels: statistics.value.lists.filter(list => list.count > 0).map(list => list.name),
//         datasets: [
//             {
//                 data: statistics.value.lists.filter(list => list.count > 0).map(list => list.average),
//                 backgroundColor: statistics.value.lists.filter(list => list.count > 0).map(
//                     (_, index) => colors.value[(colors.value.length + 1 - index * 5) % colors.value.length]),
//                 borderColor: theme.global.current.value.colors.background,
//                 datalabels: {
//                     color: statistics.value.lists.filter(list => list.count > 0)
//                         .map(_ => theme.global.current.value.colors["on-background"]),
//                 }
//             },
//         ],
//     }
// });
//
// const points_graph = computed(() => {
//     return {
//         labels: statistics.value.top_students.map(student => student.name),
//         datasets: [
//             {
//                 label: t('home.student.graph.points'),
//                 data: statistics.value.top_students.map(student => student.sum_points),
//                 backgroundColor: [
//                     theme.global.current.value.colors.success,
//                     theme.global.current.value.colors.info,
//                     theme.global.current.value.colors.warning,
//                     theme.global.current.value.colors.error,
//                     theme.global.current.value.colors.secondary,
//                 ],
//                 datalabels: {
//                     color: [
//                         theme.global.current.value.colors["on-success"],
//                         theme.global.current.value.colors["on-info"],
//                         theme.global.current.value.colors["on-warning"],
//                         theme.global.current.value.colors["on-error"],
//                         theme.global.current.value.colors["on-secondary"],
//                     ]
//                 },
//                 borderColor: theme.global.current.value.colors.background,
//             },
//         ],
//     }
// });
//
// const points_options = computed(() => {
//     return {
//         ...general_options.value,
//         plugins: {
//             ...general_options.value.plugins,
//             legend: {
//                 display: false,
//             }
//         },
//         scales: {
//             x: {
//                 ticks: {
//                     color: theme.global.current.value.colors["surface-variant"],
//                 },
//                 grid: {
//                     color: theme.global.current.value.colors["surface-variant"],
//                 },
//             },
//             y: {
//                 ticks: {
//                     color: theme.global.current.value.colors["surface-variant"],
//                 },
//                 grid: {
//                     color: theme.global.current.value.colors["surface-variant"],
//                 }
//             }
//         },
//     }
// });
//
// const goToListShow = async (id) => {
//     await router.push({name: 'ShowExercisesList', params: {id: id}}).catch(() => {
//         console.log('Error while routing to ShowExercisesList') // TODO: Add error handling
//     });
// }
// const goToLists = async () => {
//     await router.push({name: 'IndexExercisesLists'})
// }
//
// const goToExercises = async () => {
//     await router.push({name: 'IndexExercises'})
// }
//
// const goToExerciseShow = async (id) => {
//     await router.push({name: 'ShowExercise', params: {id: id}}).catch(() => {
//         console.log('Error while routing to ShowExercise') // TODO: Add error handling
//     });
// }
</script>
<template>
<!--    <v-card-item v-if="loaded" class="pt-0 mt-0">-->
<!--        <ShowCard class="mt-3 mb-2" title="home.teacher.graph.title">-->
<!--            <v-row>-->
<!--                <v-col cols="12" md="4" class="d-flex flex-column justify-center align-center">-->
<!--                    <h3 class="text-h6">{{t('home.teacher.graph.generated_title')}}</h3>-->
<!--                    <DoughnutChart :height="200" :width="300" :plugins="[datalabels]" :options="general_options"-->
<!--                                   :chartData="generated_graph"/>-->
<!--                </v-col>-->
<!--                <v-col cols="12" md="4" class="d-flex flex-column justify-center align-center">-->
<!--                    <h3 class="text-h6">{{t('home.teacher.graph.average_title')}}</h3>-->
<!--                    <DoughnutChart :height="200" :width="300" :plugins="[datalabels]" :options="count_options"-->
<!--                                   :chartData="average_graph"/>-->
<!--                </v-col>-->
<!--                <v-col cols="12" md="4" class="d-flex flex-column justify-center align-center">-->
<!--                    <h3 class="text-h6">{{t('home.teacher.graph.top_students')}}</h3>-->
<!--                    <BarChart :height="200" :width="400" :plugins="[datalabels]" :options="points_options"-->
<!--                              :chartData="points_graph"/>-->
<!--                </v-col>-->
<!--            </v-row>-->
<!--        </ShowCard>-->
<!--        <v-row>-->
<!--            <v-col cols="12" md="6">-->
<!--                <ShowCard class="mt-3 mb-2" title="home.teacher.exercises_lists.title">-->
<!--                    <CustomTable :headers="exercises_lists_headers" :data="exercises_lists" @on-click="goToListShow"/>-->
<!--                    <h3 v-if="show_more.exercises_lists" class="text-h6 text-center link"-->
<!--                        @click="goToLists">-->
<!--                        {{ t('home.teacher.exercises_lists.more') }}</h3>-->
<!--                </ShowCard>-->
<!--            </v-col>-->
<!--            <v-col cols="12" md="6">-->
<!--                <ShowCard class="mt-3 mb-2" title="home.teacher.exercises.title">-->
<!--                    <CustomTable :headers="exercises_headers" :data="exercises" @on-click="goToExerciseShow"/>-->
<!--                    <h3 v-if="show_more.exercises" class="text-h6 text-center link"-->
<!--                        @click="goToExercises">-->
<!--                        {{ t('home.teacher.exercises.more') }}</h3>-->
<!--                </ShowCard>-->
<!--            </v-col>-->
<!--        </v-row>-->
<!--    </v-card-item>-->
</template>
<style scoped>
.link {
    color: v-bind('theme.current.value.colors["primary"]');
    cursor: pointer;
}

.link:hover {
    color: v-bind('theme.current.value.colors["secondary"]');
}
</style>