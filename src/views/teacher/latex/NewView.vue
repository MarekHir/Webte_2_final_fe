<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {addExerciseList} from "@/api/exercises_lists";
import {useStateStore} from "@/stores/state";
import DashboardTitle from "@/components/Dashboard/DashboardTitle.vue";

const files = ref();
const images = ref();
const name = ref()
const {t} = useI18n({useScope: 'global'});
const store = useStateStore();

const submit = async () => {
    let result = await addExerciseList({
        file: files.value[0], name: name.value, images: images.value ? images.value : []
    });
    // TODO: Reditect to index or show
}
</script>
<template>
    <DashboardTitle title_key="teacher.latex.new.title"/>
    <v-divider class="mt-2"/>
    <v-card-item>
        <v-container>
            <v-form @submit.prevent="submit">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                                v-model="name" variant="outlined" color="primary"
                                :label="t('teacher.latex.new.name')" class="mt-2"/>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-file-input
                                class="mt-2" v-model="files" color="primary"
                                :label="t('teacher.latex.new.fileInput')" clearable
                                prepend-icon="" append-inner-icon="mdi-paperclip"
                                variant="outlined" accept=".tex" :show-size="1000"
                        >
                            <template v-slot:selection="{ fileNames }">
                                <v-chip color="primary" label size="small" class="me-2">
                                    {{ fileNames[0] }}
                                </v-chip>
                            </template>
                        </v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-file-input
                                v-model="images" color="primary" counter clearable
                                :label="t('teacher.latex.new.imageInput.title')"
                                accept=".jpg,.png,.jpeg,.gif" variant="outlined"
                                prepend-icon="" append-inner-icon="mdi-image-multiple"
                                :show-size="1000" multiple
                        >
                            <template v-slot:selection="{ fileNames }">
                                <template v-for="(fileName, index) in fileNames" :key="fileName">
                                    <v-chip v-if="index < 5" color="primary" label size="small" class="me-2">
                                        {{ fileName }}
                                    </v-chip>

                                    <span v-else-if="index === 5" class="text-overline text-grey-darken-3 mx-2">
                                        +{{ images.length - 5 }} {{t('teacher.latex.new.imageInput.count')}}
                                    </span>
                                </template>
                            </template>
                        </v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn class="ma-auto" type="submit" color="primary">
                        {{ t('teacher.latex.new.submit') }}
                    </v-btn>
                </v-row>
            </v-form>
        </v-container>
    </v-card-item>
    <v-divider class="w-75 ma-auto my-2"/>
    <v-card-text>
        <v-container>
            <h1 class="text-h4 mb-1">{{ t('teacher.latex.new.description.title') }}</h1>
            <p class="text-subtitle-2">{{ t('teacher.latex.new.description.text') }}</p>
        </v-container>
    </v-card-text>
</template>