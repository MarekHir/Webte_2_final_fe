<script setup>
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});
const hide = ref(false)
const heading_class = 'text-h6 text-md-h5 text-break pt-2 pt-md-3'

const showIcon = computed(() => {
    return 'mdi-chevron-' + (hide.value ? 'left' : 'right');
})
</script>
<template>
    <v-card rounded="0" position="absolute" color="success" location="right" class="rounded-s-lg h-auto w-max w-auto z-1"
            :class="{hide: hide, show: !hide}">
        <v-container class="ps-1 ps-md-3 py-5 pe-4 pe-md-6">
            <v-row align="center" no-gutters>
                <v-col sm="2" cols="2" class="d-flex justify-start align-center">
                    <v-btn rounded="lg" color="success" elevation="0" @click="hide = !hide"
                           :icon="showIcon"/>
                </v-col>
                <v-col sm="10" cols="10" class="ps-2 ps-md-4 ps-md-0">
                    <h1 :class="heading_class.replace('pt-md-3', '').replace('pt-2', 'pt-0')">
                        {{ t('components.portfolio_tooltip.general.title') }}</h1>
                    <p class="">{{ t('components.portfolio_tooltip.general.description') }}</p>
                    <h1 :class="heading_class">{{ t('components.portfolio_tooltip.admin.title') }}</h1>
                    <p>{{ t('components.portfolio_tooltip.admin.description') }}</p>
                    <p class="pt-2">{{ t('components.portfolio_tooltip.email') }}: admin@example.com</p>
                    <p>{{ t('components.portfolio_tooltip.password') }}: adminpassword</p>
                    <h1 :class="heading_class">{{ t('components.portfolio_tooltip.student.title') }}</h1>
                    <p>{{ t('components.portfolio_tooltip.student.description') }}</p>
                    <p class="pt-2">{{ t('components.portfolio_tooltip.email') }}: student@example.com</p>
                    <p>{{ t('components.portfolio_tooltip.password') }}: studentpassword</p>
                    <h1 :class="heading_class">{{ t('components.portfolio_tooltip.teacher.title') }}</h1>
                    <p>{{ t('components.portfolio_tooltip.teacher.description') }}</p>
                    <p class="pt-2">{{ t('components.portfolio_tooltip.email') }}: teacher@example.com</p>
                    <p>{{ t('components.portfolio_tooltip.password') }}: teacherpassword</p>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<style>
.w-max {
    max-width: 33%;
}

.z-1 {
    z-index: 1 !important;
}

.show {
    animation: show 1s cubic-bezier(0.25, 0.4, 0.25, 1) both;
}

.show, .hide {
    --translate-x: 87%;
    --translate-y: -50%;
}

@media only screen and (max-width: 768px) {
    .show, .hide {
        --translate-x: 80%;
    }

    .w-max {
        max-width: 66%;
    }
}

@keyframes show {
    to {
        transform: translate3d(0, var(--translate-y), 0);
    }
    from {
        transform: translate3d(var(--translate-x), var(--translate-y), 0);
    }
}

.hide {
    animation: hide 1s cubic-bezier(0.25, 0.4, 0.25, 1) both;
}

@keyframes hide {
    from {
        transform: translate3d(0, var(--translate-y), 0);
    }
    to {
        transform: translate3d(var(--translate-x), var(--translate-y), 0);
    }
}
</style>