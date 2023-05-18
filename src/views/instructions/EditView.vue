<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {MdEditor} from "md-editor-v3";
import {computed, onMounted, ref, watch} from "vue";
import 'md-editor-v3/lib/style.css';
import {useRoute} from "vue-router";
import router from "@/router";
import {getInstruction, patchInstruction, createInstruction} from "@/api/instructions";
import {storeToRefs} from "pinia";
import CrudButton from "@/components/buttons/CrudButton.vue";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const route = useRoute();
const loading = ref(true);
const instruction = ref(null);

// Menu hiding for fullscreen editor
const editorRef = ref(null);
const pageFullscreen = ref(false);
const fullscreen = ref(false);
const {menuHidden} = storeToRefs(store);

const pageType = ref('create');
const title = computed(() => pageType.value === 'create' ? 'instructions.edit.title.new' : 'instructions.edit.title.edit');
const user_types = [
    {title: t('instructions.for_user_type.all'), value: 'all'},
    {title: t('instructions.for_user_type.teacher'), value: 'teacher'},
    {title: t('instructions.for_user_type.student'), value: 'student'},
]

// TODO: Add validations
const schema = yup.object({
    name: yup.string().required(),
    for_user_type: yup.string().required(),
    description: yup.string().required(),
    markdown: yup.string().required(),
});

const {handleSubmit} = useForm({
    validationSchema: schema
});

const name = useField('name');
const for_user_type = useField('for_user_type');
const description = useField('description');
const markdown = useField('markdown');

function onInvalidSubmit({errors}) {
    if (errors == null || errors.length === 0)
        return;

    Object.keys(errors).forEach((field_key) => {
        store.addAlert(errors[field_key], 'warning');
    });
}

const onSubmit = handleSubmit(async (values) => {
    let result;

    if(pageType.value === 'create')
        result = await createInstruction(values);
    else {
        Object.keys(values).forEach((key) => {
            if (values[key] === instruction.value[key])
                delete values[key];
        });
        result = await patchInstruction(values, instruction.value.id);
    }

    if (result === true)
        menuHidden.value = false;
        await router.push({name: 'ShowInstruction', params: {id: result.id}}).catch(() => {
            console.log('Error while routing to ShowInstruction') // TODO: Add error handling
        });
}, onInvalidSubmit);

onMounted(async () => {
    loading.value = true;
    await router.isReady();
    if (route.name === 'EditInstruction') {
        instruction.value = await getInstruction(route.params.id);
        name.value.value = instruction.value.name;
        for_user_type.value.value = instruction.value.for_user_type;
        description.value.value = instruction.value.description;
        markdown.value.value = instruction.value.markdown;
        pageType.value = 'edit';
    }

    loading.value = false;
    setTimeout(() => {
        editorRef.value?.on('pageFullscreen', (status) => pageFullscreen.value = status);
        editorRef.value?.on('fullscreen', (status) => fullscreen.value = status);
    }, 100);
});

const hideMenu = () => {
    menuHidden.value = pageFullscreen.value || fullscreen.value;
}

watch(pageFullscreen, () => {
    hideMenu();
});

watch(fullscreen, () => {
    hideMenu();
});

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle :title_key="title">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexInstructions"/>
                <CrudButton v-if="pageType === 'edit'" action="show" route-name="ShowInstruction"/>
            </template>
            <template v-slot:prepend>
                <CrudButton action="save" route-name="" no-redirect @button-clicked="onSubmit"/>
            </template>
        </DashboardTitle>
        <v-divider class="mt-4"/>
        <v-card-item>
            <v-container>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="name.value.value"
                                class="ma-auto"
                                :label="t('instructions.edit.name')"
                                :error-messages="name.errorMessage.value"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="for_user_type.value.value"
                                class="ma-auto"
                                :items="user_types"
                                :label="t('instructions.for_user_type.title')"
                                :error-messages="description.errorMessage.value"/>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-model="description.value.value"
                        class="ma-auto"
                        :label="t('instructions.edit.description')"
                        :error-messages="description.errorMessage.value"/>
                </v-form>
                <label>MarkDown</label>
                <p v-if="markdown.errorMessage.value" class="text-red">{{markdown.errorMessage.value}}</p>
                <MdEditor ref="editorRef" :noUploadImg="true" language="en-US" v-model="markdown.value.value"/>
            </v-container>
        </v-card-item>
    </template>
</template>