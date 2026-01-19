<script setup lang="ts">
const props = defineProps<{
  label: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    class="primary-btn"
    type="button"
    :disabled="disabled"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>
