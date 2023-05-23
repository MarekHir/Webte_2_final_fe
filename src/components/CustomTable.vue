<script setup>
import _ from 'lodash';
import {useI18n} from "vue-i18n";
import {useTheme} from "vuetify";
import {ref} from "vue";

const {t} = useI18n({useScope: 'global'});
const theme = useTheme();

const emit = defineEmits(['onClick']);
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    headers: {
        type: Array,
        required: true
    }
})
const getItem = (item, header) => {
    if(!header.lodash) return item[header.key];
    return _.get(item, header.key);
}
</script>
<template>
    <v-table>
        <thead>
        <tr>
            <th v-for="header in props.headers" :key="header.trans_key">
                {{ t(header.title) }}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr @click="emit('onClick', item.id)" v-for="item in props.data">
            <td v-for="header in props.headers">
                {{header.trans_value ? t(getItem(item, header).toString()) : getItem(item, header)}}
            </td>
        </tr>
        </tbody>
    </v-table>
</template>
<style scoped>
tbody tr:hover {
    background-color: v-bind('theme.current.value.colors["on-surface-variant"]');
    cursor: pointer;
}
</style>