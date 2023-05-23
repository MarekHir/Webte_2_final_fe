<script setup>

import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";

const {t} = useI18n({useScope: 'global'});
const fields = ref([])
const loaded = ref(false);
const props = defineProps({
    object: {
        type: Object,
        required: true
    },
    fields: {
        type: Array,
        required: true
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

const cols = computed(() => {
    return 12 / fields.value.length;
});

const divider_class = computed(() => {
    return fields.value.length > 1 ? 'w-75' : 'w-25';
});

const get_value = (element) => {
    if (element.optional)
        return props.object[element.key] || t(element.optional);
    return props.object[element.key];
}
</script>
<template>
    <v-card elevation="2" v-if="loaded" class="pa-4 my-4">
        <v-card-title v-if="props.title">
            <h2 class="text-h4 text-center">{{  t(props.title) }}</h2>
        </v-card-title>
        <v-divider class="my-2 mx-auto w-66"/>
        <v-card-item>
            <slot>
                <v-row>
                    <v-col cols="12" :md="cols" class="d-flex justify-center align-center">
                        <v-list class="w-100">
                            <h3 class="text-h5 text-center">{{ t(fields[0].title) }}</h3>
                            <v-divider class="mx-auto my-2" :class="divider_class"/>
                            <h3 class="text-h5 text-center">{{ get_value(fields[0]) }}</h3>
                        </v-list>
                    </v-col>
                    <template v-for="element in fields.slice(1)" :key="element.key">
                        <v-divider vertical/>
                        <v-col cols="12" :md="cols" class="d-flex justify-center align-center">
                            <v-list class="w-100">
                                <h3 class="text-h5 text-center">{{ t(element.title) }}</h3>
                                <v-divider class="w-75 mx-auto my-2"/>
                                <h3 class="text-h5 text-center">{{ get_value(element) }}</h3>
                            </v-list>
                        </v-col>
                    </template>
                </v-row>
            </slot>
        </v-card-item>
    </v-card>
</template>