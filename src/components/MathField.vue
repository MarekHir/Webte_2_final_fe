<script setup>
import "mathlive/fonts.css"
import "mathlive/static.css"
import {MathfieldElement} from "mathlive";
import {computed, onMounted, ref, watch} from "vue";
import {useStateStore} from "@/stores/state";
import {storeToRefs} from "pinia";

const mathField = ref(null);
const store = useStateStore();
const {show_keyboard} = storeToRefs(store)
const mathValue = ref();
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'outlined'
  },
  prepend_icon: {
    type: String,
    default: ''
  },
  prepend_inner_icon: {
    type: String,
    default: ''
  },
  append_icon: {
    type: String,
    default: ''
  },
  append_inner_icon: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:modelValue']);
const focused = ref(false);
const dirty = computed(() => {
  return mathValue.value != null && mathValue.value !== '' || focused.value;
});

onMounted(() => {
  mathValue.value = props.modelValue;
  window.mathVirtualKeyboard.layouts = ['numeric', 'symbols', 'greek'];
  window.mathVirtualKeyboard.container = document.getElementById('Latex-keyboard-container');
});

const showKeyboard = () => {
  if (show_keyboard.value) {
    window.mathVirtualKeyboard.hide();
    show_keyboard.value = false;
    return;
  }

  show_keyboard.value = true;
  window.mathVirtualKeyboard.show();
}

watch(mathValue, (value) => {
  if (value === props.modelValue) return;
  emit('update:modelValue', value);
});

watch(props, (value) => {
  if (value.modelValue !== mathValue.value)
    mathValue.value = value.modelValue;
})
</script>
<template>
  <v-input
    :class="props.class"
    :prepend-icon="props.prepend_icon"
    append-icon="mdi-keyboard"
    @click:append="showKeyboard">
    <v-field :color="props.color"
             :dirty="dirty"
             :label="props.label"
             v-model:focused="focused"
             :variant="props.variant"
             :prepend-inner-icon="props.prepend_inner_icon"
             :append-inner-icon="props.append_inner_icon">
      <template v-slot:default="{focus, blur, props, controlRef}">
        <math-field @focus="focus()" @blur="blur()" :class="props.class" class="w-100 d-inline-block border-0"
                    style="letter-spacing: 0; opacity: 1" keypress-sound="null" plonk-sound="null"
                    ref="mathField" math-virtual-keyboard-policy="manual"
                    v-model="mathValue"/>
      </template>
    </v-field>
  </v-input>
</template>
<style scoped>
math-field::part(virtual-keyboard-toggle) {
  display: none;
}
</style>