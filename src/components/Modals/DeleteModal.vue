<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import {ref, watch} from "vue";

const store = useStateStore();
const {t} = useI18n({useScope: 'global'});
const emit = defineEmits(['close', 'delete']);
const props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
        default: false
    }
})

const dialog = ref(props.dialog);

const deleteItem = () => {
    dialog.value = false;
    emit('delete');
}

watch(() => props.dialog, (newVal) => {
    dialog.value = newVal;
})

watch(() => dialog.value, (newVal) => {
    if(newVal === false){
        emit('close');
    }
})

</script>
<template>
    <v-dialog
            v-model="dialog"
            width="auto">
        <v-card class="pa-4">
            <v-card-title class="text-center">
                <h1 class="text-h4">
                    {{t('delete_modal.title')}}
                </h1>
            </v-card-title>
            <v-card-text>
                <slot></slot>
            </v-card-text>
            <v-card-item>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn :color="store.btn_colors.close" variant="outlined" block @click="dialog = false" :text="t('button.close')"/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-btn :color="store.btn_colors.delete" block @click="deleteItem" :text="t('button.delete')"/>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>