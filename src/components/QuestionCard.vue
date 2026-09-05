<script setup>
defineProps({
  question: { type: Object, required: true },
  index: { type: Number, required: true },
  modelValue: { type: String, default: null }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <v-card variant="outlined" class="pa-4 mb-4">
    <p class="text-subtitle-1 font-weight-medium mb-2">
      {{ index }}. {{ question.text }}
    </p>

    <v-radio-group
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      hide-details
    >
      <v-radio
        v-for="choice in question.choices"
        :key="choice.id"
        :label="choice.label"
        :value="choice.id"
      />
    </v-radio-group>
  </v-card>
</template>
