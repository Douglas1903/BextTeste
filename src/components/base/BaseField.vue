<script setup lang="ts">
type Props = {
  label: string
  modelValue: string
  error?: string
  name?: string
  type?: string
  placeholder?: string
  autocomplete?: string
  ariaLabel?: string
  inputClass?: string
}

withDefaults(defineProps<Props>(), {
  error: '',
  type: 'text',
  placeholder: '',
  autocomplete: '',
  ariaLabel: '',
  inputClass: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input'): void
}>()

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input')
}
</script>

<template>
  <div class="field">
    <label>{{ label }}</label>

    <div class="input-wrap" :class="{ invalid: !!error }">
      <input
        :value="modelValue"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :aria-label="ariaLabel || label"
        :aria-invalid="!!error"
        :class="inputClass"
        @input="onInput"
      />

      <slot name="right" />
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
