<script setup>

import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import {ceil} from "lodash/math";

const {t} = useI18n({useScope: 'global'});
const fields = ref([])
const loaded = ref(false);
const props = defineProps({
    object: {
        type: Object,
        default: {}
    },
    fields: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        required: false
    },
    filter_empty: {
        type: Boolean,
        required: false,
        default: false
    }
});

onMounted(() => {
    if (props.filter_empty) {
        fields.value = props.fields.filter((element) => {
            return get_value(element) != null;
        });
    } else
        fields.value = props.fields;
    loaded.value = true;
});

const cols = (offset = 0) => {
    return fields.value.length - offset * 3 > 3 ? 4 : 12 / (fields.value.length - offset * 3);
};

const divider_class = computed(() => {
    return fields.value.length > 1 ? 'w-75' : 'w-25';
});

const get_value = (element) => {
    let value = props.object[element.key];
    if (element.trans_value)
        value = t(value.toString());
    if (element.optional)
        return value || t(element.optional);
    return value;
}
</script>
<template>
    <v-card elevation="2" v-if="loaded" class="pa-4 my-4">
        <v-card-title v-if="props.title">
            <h2 class="text-h4 text-center">{{ t(props.title) }}</h2>
        </v-card-title>
        <v-divider v-if="props.title" class="my-2 mx-auto w-66"/>
        <v-card-item>
            <slot>
                <v-row v-for="(row_num, row_index) in ceil(fields.length / 3)" :key="row_num">
                    <v-col cols="12" :md="cols(row_index)" class="d-flex justify-center align-center">
                        <v-list class="w-100">
                            <template v-if="fields[row_index * 3].title">
                                <h3 class="text-h5 text-center">{{ t(fields[row_index * 3].title) }}</h3>
                                <v-divider class="mx-auto my-2" :class="divider_class"/>
                            </template>
                            <div class="w-100 d-flex justify-center align-center" v-if="fields[row_index * 3].is_icon">
                                <v-avatar :image="get_value(fields[row_index * 3])"
                                          :icon="fields[row_index * 3].no_icon"/>
                            </div>
                            <h3 v-else class="text-h5 text-center">{{ get_value(fields[row_index * 3]) }}</h3>
                        </v-list>
                    </v-col>
                    <template v-for="element in fields.slice(row_index * 3 + 1 , row_index * 3 + 3)" :key="element.key">
                        <v-divider vertical/>
                        <v-col cols="12" :md="cols(row_index)" class="d-flex justify-center align-center">
                            <v-list class="w-100">
                                <template v-if="element.title">
                                    <h3 class="text-h5 text-center">{{ t(element.title) }}</h3>
                                    <v-divider class="w-75 mx-auto my-2"/>
                                </template>
                                <div v-if="element.is_icon" class="w-100 d-flex justify-center align-center">
                                    <v-avatar :image="get_value(element)" :icon="element.no_icon"/>
                                </div>
                                <h3 v-else class="text-h5 text-center">{{ get_value(element) }}</h3>
                            </v-list>
                        </v-col>
                    </template>
                    <v-divider class="my-4" v-if="fields.length > row_num * 3"/>
                </v-row>
            </slot>
        </v-card-item>
    </v-card>
</template>