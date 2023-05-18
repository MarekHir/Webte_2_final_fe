<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {MdPreview} from "md-editor-v3";
import {onMounted, ref} from "vue";
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import {getInstruction, deleteInstruction} from "@/api/instructions";
import {useRoute} from "vue-router";
import DashboardSubtitle from "@/components/Dashboard/DashboardSubtitle.vue";
import CrudButton from "@/components/buttons/CrudButton.vue";
import DeleteModal from "@/components/DeleteModal.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const instruction = ref(null);
const loading = ref(true);
const route = useRoute();
const delete_modal = ref(false);

onMounted(async () => {
    loading.value = true;
    await router.isReady();
    instruction.value = await getInstruction(route.params.id);
    loading.value = false;
});

const goToEdit = async () => {
    await router.push({name: 'EditInstruction', params: {id: route.params.id}}).catch(() => {
        console.log('Error while routing to ShowInstruction') // TODO: Add error handling
    });
}

const handleDelete = async () => {
    if(await deleteInstruction(instruction.value.id))
        await router.push({name: 'IndexInstructions'}).catch(() => {
            console.log('Error while routing to IndexInstructions') // TODO: Add error handling
        });

}

</script>
<template>
    <template v-if="!loading">
        <DashboardTitle title_key="instructions.show.title">
            <template v-slot:append>
                <CrudButton action="index" route-name="IndexInstructions"/>
            </template>
            <template v-if="store.user.id === instruction.created_by || store.isAdmin" v-slot:prepend>
                <CrudButton action="edit" route-name="EditInstruction" :id="$props.id"/>
                <CrudButton action="delete" @button-clicked="delete_modal = true" route-name="" no-redirect
                            :id="$props.id"/>
            </template>
        </DashboardTitle>
        <DashboardSubtitle
                :subtitle="instruction.name"
                subtitle_size="h4"
                :description="instruction.description"/>
        <v-divider class="mt-4"/>
        <v-card-item>
            <v-container>
                <MdPreview language="en-US" v-model="instruction.markdown"/>
            </v-container>
        </v-card-item>
        <DeleteModal :dialog="delete_modal" @close="delete_modal = false" @delete="handleDelete"/>
    </template>
</template>