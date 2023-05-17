<script setup>

import {useStateStore} from "@/stores/state";
import {useI18n} from "vue-i18n";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";

const {t} = useI18n({useScope: 'global'});
const store = useStateStore();
</script>
<template>
  <DashboardTitle title_key="instructions.title"/>
</template>