<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {MdPreview} from "md-editor-v3";
import {onMounted, ref} from "vue";
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import {deleteInstruction} from "@/api/instructions";
import {useRoute} from "vue-router";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import InstructionsDarkModeSwitch from "@/components/InstructionsDarkModeSwitch.vue";
import Instruction from "@/models/Instruction";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const instruction = ref(null);
const loading = ref(true);
const route = useRoute();
const delete_modal = ref(false);
const theme = ref('light');

// TODO: Add loading everywhere
onMounted(async () => {
    loading.value = true;
    await router.isReady();
    instruction.value = await Instruction.with('created_by').find(route.params.id);
    loading.value = false;
});

const handleDelete = async () => {
    if (await deleteInstruction(instruction.value.id))
        await router.push({name: 'IndexInstructions'}).catch(() => {
            console.log('Error while routing to IndexInstructions') // TODO: Add error handling
        });

}
</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="instructions.showTitle">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexInstructions"/>
                <InstructionsDarkModeSwitch v-model="theme"/>
            </template>
            <template v-if="store.user.id === instruction.created_by.id || store.isAdmin" v-slot:prepend>
                <CrudButton action="edit" route-name="EditInstruction" :id="$props.id"/>
                <CrudButton action="delete" @button-clicked="delete_modal = true" route-name="" no-redirect
                            :id="$props.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle
                :subtitle="instruction.name"
                subtitle_size="h4"
                :description="instruction.description">
            <template v-slot:prepend>
                <CrudButton target="_blank" :href="`${instruction.baseURL()}/instructions/${instruction.id}/pdf`"
                            title="instructions.download_pdf" action="custom" color="info"
                            prepend_icon="mdi-file-download-outline"/>
            </template>
        </DashboardSubtitle>
        <v-divider class="mt-4"/>
        <v-card-item>
            <v-container>
                <MdPreview :theme="theme" class="rounded-xl" language="en-US" v-model="instruction.markdown"/>
            </v-container>
        </v-card-item>
        <DeleteModal :dialog="delete_modal" @close="delete_modal = false" @delete="handleDelete"/>
    </template>
</template>