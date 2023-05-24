<script setup>
import {useI18n} from "vue-i18n";
import router from "@/router";
import {onMounted} from "vue";
import {useStateStore} from "@/stores/state";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const props = defineProps({
    routeName: {
        type: String,
        required: false,
    },
    action: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: false
    },
    noRedirect: {
        type: Boolean,
        required: false,
        default: false
    },
    noText: {
        type: Boolean,
        required: false,
        default: false
    },
    title: {
        type: String,
        required: false,
        default: null
    },
    href: {
        type: String,
        required: false,
        default: null
    },
    target: {
        type: String,
        required: false,
        default: null
    },
    prepend_icon: {
        type: String,
        required: false,
        default: null
    }
});
const emit = defineEmits(['button-clicked']);

const actionsToIcons = {
    create: 'mdi-plus',
    edit: 'mdi-pencil',
    show: 'mdi-text-box',
    index: 'mdi-text-box-multiple',
    delete: 'mdi-delete',
    save: 'mdi-content-save',
    submit: 'mdi-check',
    close: 'mdi-close',
}

onMounted(async () => {
    await router.isReady();
});

const redirect = async () => {
    if (props.noRedirect) {
        emit('button-clicked');
        return;
    }
    if (props.id != null) {
        await router.push({name: props.routeName, params: {id: props.id}}).catch(() => {
            console.log('Error while routing to ' + props.routeName) // TODO: Add error handling
        });
    } else {
        await router.push({name: props.routeName}).catch(() => {
            console.log('Error while routing to ' + props.routeName) // TODO: Add error handling
        });
    }
}
</script>
<template>
    <v-btn @click="redirect()"
           class="mx-1 my-2"
           variant="outlined"
           :href="props.href"
           :target="props.target"
           :text="t(props.title ?? `button.${props.action}`)"
           :color="store.btn_colors[props.action]"
           :prepend-icon="props.prepend_icon ?? actionsToIcons[props.action]"/>
</template>