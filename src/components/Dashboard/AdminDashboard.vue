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
import ExercisesList from "@/models/ExercisesList";
import vuetify_colors from 'vuetify/lib/util/colors'
import User from "@/models/User";


Chart.register(DoughnutController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);

const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
})
const colors = ref([])
const new_headers = ref([
    {
        title: 'user.attr.icon',
        key: 'icon',
        is_icon: true,
        header_style: 'width: 5%',
        no_icon: 'mdi-account',
    },
    {
        title: 'user.attr.id',
        key: 'id',
    },
    {
        title: 'user.attr.first_name',
        key: 'first_name',
    }, {
        title: 'user.attr.surname',
        key: 'surname',
    },{
        title: 'user.attr.created_at',
        key: 'createdAt',
    },
]);
const updated_headers = ref([
    {
        title: 'user.attr.icon',
        key: 'icon',
        is_icon: true,
        header_style: 'width: 5%',
        no_icon: 'mdi-account',
    },
    {
        title: 'user.attr.id',
        key: 'id',
    },
    {
        title: 'user.attr.first_name',
        key: 'first_name',
    }, {
        title: 'user.attr.surname',
        key: 'surname',
    },{
        title: 'user.attr.updated_at',
        key: 'updatedAt',
    },
]);
const new_users = ref([])
const updated_users = ref([])
const statistics = ref({types: [], counts: []})
const loaded = ref(false);
const theme = useTheme();
const {t} = useI18n({useScope: 'global'});

onMounted(() => {
    new_users.value = props.data.latest_new.map(user => new User(user));
    updated_users.value = props.data.latest_updated.map(user => new User(user));
    statistics.value.types = props.data.users;
    statistics.value.counts = props.data.counts;
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

const types_graph = computed(() => {
    return {
        labels: statistics.value.types.map(type => t(`user.role.${type.role}`)),
        datasets: [
            {
                data: statistics.value.types.map(type => type.count),
                backgroundColor: [
                    theme.global.current.value.colors.success,
                    theme.global.current.value.colors.info,
                    theme.global.current.value.colors.warning,
                ],
                borderColor: theme.global.current.value.colors.background,
                datalabels: {
                    color: [
                        theme.global.current.value.colors["on-success"],
                        theme.global.current.value.colors["on-info"],
                        theme.global.current.value.colors["on-warning"],
                    ]
                }
            },
        ],
    }
});

const counts_graph = computed(() => {
    return {
        labels: [t('home.admin.graph.types.exercises'), t('home.admin.graph.types.exercises_lists'), t('home.admin.graph.types.instructions')],
        datasets: [
            {
                label: t('home.admin.graph.records'),
                data: statistics.value.counts,
                backgroundColor: [
                    theme.global.current.value.colors.success,
                    theme.global.current.value.colors.info,
                    theme.global.current.value.colors.warning,
                ],
                datalabels: {
                    color: [
                        theme.global.current.value.colors["on-success"],
                        theme.global.current.value.colors["on-info"],
                        theme.global.current.value.colors["on-warning"],
                    ]
                },
                borderColor: theme.global.current.value.colors.background,
            },
        ],
    }
});

const counts_options = computed(() => {
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
</script>
<template>
    <v-card-item v-if="loaded" class="pt-0 mt-0">
        <ShowCard class="mt-3 mb-2" title="home.admin.graph.title">
            <v-row>
                <v-col cols="12" md="6" class="d-flex flex-column justify-center align-center">
                    <h3 class="text-h6">{{t('home.admin.graph.types_title')}}</h3>
                    <DoughnutChart :height="200" :width="300" :plugins="[datalabels]" :options="general_options"
                                   :chartData="types_graph"/>
                </v-col>
                <v-col cols="12" md="6" class="d-flex flex-column justify-center align-center">
                    <h3 class="text-h6">{{t('home.admin.graph.counts_title')}}</h3>
                    <BarChart :height="200" :width="400" :plugins="[datalabels]" :options="counts_options"
                              :chartData="counts_graph"/>
                </v-col>
            </v-row>
        </ShowCard>
        <v-row>
            <v-col cols="12" md="6">
                <ShowCard class="mt-3 mb-2" title="home.admin.new.title">
                    <CustomTable v-if="new_users.length > 0" :headers="new_headers" :data="new_users"/>
                    <h3 v-else class="text-h6 text-center">{{ t('home.admin.new.none') }}</h3>
                </ShowCard>
            </v-col>
            <v-col cols="12" md="6">
                <ShowCard class="mt-3 mb-2" title="home.admin.updated.title">
                    <CustomTable v-if="updated_users.length > 0" :headers="updated_headers" :data="updated_users"/>
                    <h3 v-else class="text-h6 text-center">{{ t('home.admin.updated.none') }}</h3>
                </ShowCard>
            </v-col>
        </v-row>
    </v-card-item>
</template>