<script setup>
import ShowCard from "@/components/ShowCard.vue";
import {computed, onMounted, ref} from "vue";
import Exercise from "@/models/Exercise";
import CustomTable from "@/components/CustomTable.vue";
import router from "@/router";
import {DoughnutChart, BarChart} from "vue-chart-3";
import {
    Chart,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import {useI18n} from "vue-i18n";
import {useTheme} from "vuetify";
import datalabels from "chartjs-plugin-datalabels"

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);

const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
})
const assigned_headers = ref([
    {
        title: 'exercise.attr.list_name',
        key: 'listName',
        custom_sort_key: 'list_name',
    }, {
        title: 'exercise.attr.section',
        key: 'section',
    }, {
        title: 'exercises_list.attr.points',
        key: 'maxPoints',
    }, {
        title: 'exercise.attr.createdAt',
        key: 'createdAt',
    }
]);
const solved_headers = ref([
    {
        title: 'exercise.attr.list_name',
        key: 'listName',
        custom_sort_key: 'list_name',
    }, {
        title: 'exercise.attr.section',
        key: 'section',
    }, {
        title: 'exercises_list.attr.points',
        key: 'maxPoints',
        custom_sort_key: 'max_points',
    }, {
        title: 'exercise.attr.points',
        key: 'points',
    }
]);
const assigned_exercises = ref([])
const solved_exercises = ref([])
const statistics = ref([])
const loaded = ref(false);
const theme = useTheme();
const {t} = useI18n({useScope: 'global'});

onMounted(() => {
    assigned_exercises.value = props.data.assigned.map(ex => new Exercise(ex));
    solved_exercises.value = props.data.solved.map(ex => new Exercise(ex));
    statistics.value = props.data.statistics;
    statistics.value.total_generated = Number.parseInt(statistics.value.total_generated);
    statistics.value.total_solved = Number.parseInt(statistics.value.total_solved);
    statistics.value.earned_point = Number.parseFloat(statistics.value.earned_point);
    statistics.value.total_points = Number.parseFloat(statistics.value.total_points);
    statistics.value.average_points = Number.parseFloat(statistics.value.average_points)?.toFixed(2) || 0;
    statistics.value.points_percentage = (statistics.value.earned_point / statistics.value.total_points) * 100;
    statistics.value.total_average = Number.parseFloat(statistics.value.total_average)?.toFixed(2) || 0;
    loaded.value = true;
})

const general_options = computed(() => {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.global.current.value.colors["surface-variant"],
                }
            },
            tooltip: {
                bodyColor: theme.global.current.value.colors.background,
            }
        }
    }
})

const count_graph = computed(() => {
    return {
        labels: [t('home.student.graph.assigned'), t('home.student.graph.solved')],
        datasets: [
            {
                data: [statistics.value.total_generated, statistics.value.total_solved],
                backgroundColor: [theme.global.current.value.colors.warning, theme.global.current.value.colors.success],
                borderColor: theme.global.current.value.colors.background,
                datalabels: {
                    color: [theme.global.current.value.colors["on-warning"], theme.global.current.value.colors["on-success"]]
                },
            },
        ],
    }
});

const count_options = computed(() => {
    return {
        ...general_options.value,
    }
})

const points_graph = computed(() => {
    return {
        labels: [t('home.student.graph.average_point'), t('home.student.graph.average_total'),
            t('home.student.graph.earned_points'), t('home.student.graph.total_points')],
        datasets: [
            {
                label: t('home.student.graph.points'),
                data: [
                    statistics.value.average_points,
                    statistics.value.total_average,
                    statistics.value.earned_point,
                    statistics.value.total_points,
                ],
                backgroundColor: [
                    theme.global.current.value.colors.warning,
                    theme.global.current.value.colors.info,
                    theme.global.current.value.colors.success,
                    theme.global.current.value.colors.error,
                ],
                datalabels: {
                    color: [
                        theme.global.current.value.colors["on-warning"],
                        theme.global.current.value.colors["on-info"],
                        theme.global.current.value.colors["on-success"],
                        theme.global.current.value.colors["on-error"],
                    ]
                },
                borderColor: theme.global.current.value.colors.background,
            },
        ],
    }
});

const points_options = computed(() => {
    return {
        ...general_options.value,
        plugins: {
            ...general_options.value.plugins,
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    color: theme.global.current.value.colors["surface-variant"],
                },
                grid: {
                    color: theme.global.current.value.colors["surface-variant"],
                },
            },
            y: {
                ticks: {
                    color: theme.global.current.value.colors["surface-variant"],
                },
                grid: {
                    color: theme.global.current.value.colors["surface-variant"],
                }
            }
        },
    }
});

const goToShow = async (id) => {
    await router.push({name: 'ShowExercise', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowExercise') // TODO: Add error handling
    });
}
</script>
<template>
    <v-card-item v-if="loaded" class="pt-0 mt-0">
        <ShowCard class="mt-3 mb-2" title="home.student.graph.title">
            <v-row>
                <v-col cols="12" md="6" class="d-flex justify-center align-center">
                    <DoughnutChart :height="200" :width="300" :plugins="[datalabels]" :options="count_options"
                                   :chartData="count_graph"/>
                </v-col>
                <v-col cols="12" md="6" class="d-flex justify-center align-center">
                    <BarChart :height="200" :width="400" :plugins="[datalabels]" :options="points_options"
                              :chartData="points_graph"/>
                </v-col>
            </v-row>
        </ShowCard>
        <v-row>
            <v-col cols="12" md="6">
                <ShowCard class="mt-3 mb-2" title="home.student.assigned.title">
                    <CustomTable :headers="assigned_headers" :data="assigned_exercises" @on-click="goToShow"/>
                </ShowCard>
            </v-col>
            <v-col cols="12" md="6">
                <ShowCard class="mt-3 mb-2" title="home.student.solved.title">
                    <CustomTable :headers="solved_headers" :data="solved_exercises" @on-click="goToShow"/>
                </ShowCard>
            </v-col>
        </v-row>
    </v-card-item>
</template>