<script setup>
import {useStateStore} from "@/stores/state";
import {storeToRefs} from "pinia";

const store = useStateStore();
const { alerts } = storeToRefs(store);
const dismissAlert = (alert) => {
    store.removeAlert(alert);
};

</script>
<template>
    <div class="alerts-container">
        <template v-for="(alert, index) in alerts" :key="index">
            <v-alert
                class="my-1"
                v-if="alert != null"
                :type="alert.type"
                :title="alert.message"
                @click:close="dismissAlert(alert)"
                rounded="lg"
                closable />
        </template>
    </div>
</template>
<style scoped>
.alerts-container {
    position: absolute;
    top: 10px;
    left: 50%;
    z-index: 1000;
    transform: translateX(-50%);
    width: 30%;
}
</style>