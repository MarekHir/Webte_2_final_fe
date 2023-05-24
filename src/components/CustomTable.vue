<script setup>
import _ from 'lodash';
import {useI18n} from "vue-i18n";
import {useTheme} from "vuetify";
import {onMounted, ref, watch} from "vue";

const {t} = useI18n({useScope: 'global'});
const theme = useTheme();
const current_sort = ref('');
const page = ref(1);

const emit = defineEmits(['onClick', 'update:sortBy', 'update:page', 'refresh']);
const props = defineProps({
    data: {
        type: Array,
        required: true
    }, headers: {
        type: Array,
        required: true
    }, sortBy: {
        type: String,
        default: ''
    }, page: {
        type: Number,
        required: false,
        default: 1
    }, max_page: {
        type: Number,
        required: false,
        default: 1
    }
});

onMounted(() => {
    current_sort.value = props.sortBy;
    page.value = props.page;
});

const sort_icon = (header) => {
    if (!header.sortable) return '';
    let sort_key = header.custom_sort_key ?? header.key;
    if (sort_key === current_sort.value) return 'mdi-sort-ascending';
    if (`-${sort_key}` === current_sort.value) return 'mdi-sort-descending';
    return 'mdi-sort';
};

const trans_value = (header, item) => {
    return header.trans_value || header.trans_null && getItem(item, header, true) == null;
}

const getItem = (item, header, no_default = false) => {
    let value;
    if (!header.lodash)
        value = item[header.key];
    else
        value = _.get(item, header.key);

    if (no_default)
        return value;

    return value ?? header.default ?? '';
};

const sort_by = (header) => {
    if (!header.sortable) return;
    let sort_key = header.custom_sort_key ?? header.key;
    if (current_sort.value === sort_key)
        current_sort.value = `-${sort_key}`;
    else if (current_sort.value === `-${sort_key}`)
        current_sort.value = '';
    else
        current_sort.value = sort_key;
    emit('update:sortBy', current_sort.value);
    emit('refresh', true)
};

const get_header_class = (header) => {
    let header_class = header.header_class;
    if (header.sortable)
        header_class += ' sortable';
    return header_class;
};

watch(props, () => {
    current_sort.value = props.sortBy;
    page.value = props.page;
});

watch(page, () => {
    emit('update:page', page.value);
    emit('refresh', false)
});
</script>
<template>
    <v-table>
        <thead>
        <tr>
            <th v-for="header in props.headers" :key="header.title" :class="get_header_class(header)"
                :style="header.header_style" @click="sort_by(header)">
                {{ t(header.title) }}
                <v-icon v-if="header.sortable" :icon="sort_icon(header)"/>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr @click="emit('onClick', item.id)" v-for="item in props.data">
            <td v-for="header in props.headers">
                <v-avatar v-if="header.is_icon" :image="getItem(item, header).toString()" :icon="header.no_icon"/>
                <span v-else>{{
                    trans_value(header, item) ? t(getItem(item, header).toString()) : getItem(item, header)
                    }}</span>
            </td>
        </tr>
        </tbody>
    </v-table>
    <v-pagination v-if="props.max_page > 1" v-model="page" :length="props.max_page"/>
</template>
<style scoped>
thead tr th {
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.sortable:hover {
    color: v-bind('theme.current.value.colors["on-surface"]');
    cursor: pointer;
}

tbody tr:hover {
    background-color: v-bind('theme.current.value.colors["on-surface-variant"]');
    cursor: pointer;
}
</style>