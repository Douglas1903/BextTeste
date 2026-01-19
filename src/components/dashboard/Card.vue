<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/types/task'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'open', task: Task): void
  (e: 'delete', task: Task): void
}>()

const statusLabel = computed(() => {
  const s = props.task.status
  if (s === 'todo') return 'A fazer'
  if (s === 'doing') return 'Em progresso'
  if (s === 'done') return 'Concluído'
  return '—'
})

const statusClass = computed(() => {
  const s = props.task.status
  if (s === 'todo') return 'todo'
  if (s === 'doing') return 'doing'
  if (s === 'done') return 'done'
  return ''
})

const priorityClass = computed(() => (props.task.priority ?? '').trim().toLowerCase())

function onOpen() {
  emit('open', props.task)
}

function onDelete(e: MouseEvent) {
  e.stopPropagation()
  emit('delete', props.task)
}
</script>

<template>
  <article class="card" role="button" tabindex="0" @click="onOpen" @keydown.enter.prevent="onOpen">
    <span class="priority" :class="priorityClass" />

    <div class="card-top">
      <span class="tag">{{ task.category }}</span>

      <!-- ✅ STATUS AQUI -->
      <span class="status-badge" :class="statusClass">
        {{ statusLabel }}
      </span>
    </div>

    <h3>{{ task.title }}</h3>
    <p v-if="task.description">{{ task.description }}</p>

    <div class="card-footer">
      <span class="date">
        <!-- se você já tem ícone, mantém -->
        {{ new Date(task.date).toISOString().slice(0, 10) }}
      </span>

      <div class="icons">
        <button class="icon-btn" type="button" title="Excluir" @click="onDelete">
          🗑️
        </button>
      </div>
    </div>
  </article>
</template>
