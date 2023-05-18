<script setup>
import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";
import {onMounted, ref} from "vue";
import {getInstructions} from "@/api/instructions";
import {fullName} from "@/utils";
import router from "@/router";
import CrudButton from "@/components/buttons/CrudButton.vue";


const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
const data = ref([]);

onMounted(async () => {
    data.value = await getInstructions()
    await router.isReady();
});

const goToShow = async (id) => {
    await router.push({name: 'ShowInstruction', params: {id: id}}).catch(() => {
        console.log('Error while routing to ShowInstruction') // TODO: Add error handling
    });
}
</script>
<template>
    <DashboardTitle title_key="instructions.index.title">
        <template v-if="store.isTeacher" v-slot:prepend>
            <CrudButton action="create" route-name="NewInstruction"/>
        </template>
    </DashboardTitle>
    <v-divider class="mt-4"/>
    <v-card-item>
        <v-table>
            <thead>
            <tr>
                <th>{{t('instructions.index.description.name')}}</th>
                <th>{{t('instructions.index.description.description')}}</th>
                <th>{{t('instructions.index.description.for')}}</th>
                <th>{{t('instructions.index.description.createdBy')}}</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="instruction in data" :key="instruction.id">
                <tr @click="goToShow(instruction.id)">
                    <td>{{ instruction.name }}</td>
                    <td>{{ instruction.description }}</td>
                    <td>{{ t('instructions.for_user_type.' + instruction.for_user_type) }}</td>
                    <td>{{ fullName(instruction.created_by) }}</td>
                </tr>
            </template>
            </tbody>
        </v-table>
    </v-card-item>
</template>
<style scoped>
</style>