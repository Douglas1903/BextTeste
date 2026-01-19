<script setup lang="ts">
type DeleteTarget = { key: string; title: string }

const props = defineProps<{
  open: boolean
  target: DeleteTarget | null
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div v-if="open" class="confirm-overlay" @click.self="emit('cancel')">
    <div class="confirm-modal" role="dialog" aria-modal="true">
      <h3 class="confirm-title">Excluir categoria?</h3>

      <p class="confirm-text">
        Tem certeza que deseja excluir a categoria
        <strong class="confirm-strong">"{{ target?.title }}"</strong>
        e todos os cards dela?
      </p>

      <div class="confirm-actions">
        <button type="button" class="confirm-btn ghost" @click="emit('cancel')">
          Cancelar
        </button>

        <button type="button" class="confirm-btn danger" @click="emit('confirm')">
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>
