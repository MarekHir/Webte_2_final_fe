<script>
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Alerts from "@/components/Alerts.vue";

export default defineComponent({
    name: 'AppLayout',
    components: {Alerts},
    setup() {
        const route = useRoute();
        /**
         *  This is a computed property that will return the name
         *  of the current route
         */
        const layout = computed(() => {
            const layout = route?.meta?.layout;
            if (layout) {
                return `${layout}Layout`;
            }
            return 'div';
        });
        return {
            layout,
        };
    },
});
</script>

<template>
    <Alerts />
    <component :is="layout">
        <RouterView />
    </component>
</template>
