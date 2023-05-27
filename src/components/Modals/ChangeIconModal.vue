<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import {onMounted, ref, watch} from "vue";
import ShowCard from "@/components/ShowCard.vue";
import MathField from "@/components/MathField.vue";
import {uploadIcon} from "@/api/students";

const store = useStateStore();
const {t} = useI18n({useScope: 'global'});
const emit = defineEmits(['close', 'refresh']);
const url = ref('');
const image = ref(null)
const props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
        default: false
    }
})

const dialog = ref(props.dialog);

// TODO: yup validate
const updateUser = async () => {
    if(image.value === null){// TODO: Add validations
        return;
    }
    await uploadIcon(image.value[0], store.user.id)
    emit('refresh');
    dialog.value = false;
}


watch(() => props.dialog, (newVal) => {
    dialog.value = newVal;
})

watch(() => dialog.value, (newVal) => {
    if (newVal === false) {
        emit('close');
    }
})

</script>
<template>
    <v-dialog
            v-model="dialog"
            class="w-50">
        <v-card class="pa-4 pb-7 rounded-lg" elevation="12">
            <v-card-title class="text-center">
                <h1 class="text-h4">
                    {{ t('user.change_icon.title') }}
                </h1>
            </v-card-title>
            <v-card-item>
                <v-file-input
                    class="mt-2"
                    v-model="image"
                    color="primary"
                    :label="t('user.change_icon.upload')"
                    clearable
                    prepend-icon=""
                    append-inner-icon="mdi-image"
                    variant="outlined"
                    accept=".jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.svg,.webp,.gif,.avif,.apng"
                    :show-size="1000"/>
            </v-card-item>
            <v-card-item>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn :color="store.btn_colors.close" variant="outlined" block @click="dialog = false"
                               :text="t('button.close')"/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-btn :color="store.btn_colors.submit" block @click="updateUser" :text="t('button.save')"/>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>