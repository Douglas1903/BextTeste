<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/types/task'
import HeaderFilterPopover from '@/components/dashboard/HeaderFilterPopover.vue'

const props = defineProps<{ tasksCount: number }>()

const searchModel = defineModel<string>({ required: true })

const filterStatus = defineModel<'' | Task['status']>('filterStatus', { default: '' })
const filterPriority = defineModel<'' | 'Alta' | 'Média' | 'Baixa'>('filterPriority', { default: '' })
const filterDateFrom = defineModel<string>('filterDateFrom', { default: '' })
const filterDateTo = defineModel<string>('filterDateTo', { default: '' })

const emit = defineEmits<{ (e: 'newTask'): void }>()

const searchEl = ref<HTMLInputElement | null>(null)
function focusSearch() {
  searchEl.value?.focus()
}
</script>

<template>
  <header class="dashboard-header">
    <div class="header-left">
      <h1>Dashboard</h1>
      <div class="subtitle">
        <span class="muted">Todas as categorias</span>
        <span class="dot">•</span>
        <span class="muted">{{ props.tasksCount }} tarefas</span>
      </div>
    </div>

    <div class="header-right">
      <div class="toolbar" style="display: flex; gap: 10px; align-items: center;">
        <HeaderFilterPopover v-model:filterStatus="filterStatus" v-model:filterPriority="filterPriority"
          v-model:filterDateFrom="filterDateFrom" v-model:filterDateTo="filterDateTo" />

        <button class="tool-btn" title="Pesquisar" @click="focusSearch">
          <svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
            <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <div class="search">
        <input ref="searchEl" v-model="searchModel" type="text" placeholder="Buscar" aria-label="Buscar tarefas" />
      </div>

      <BasePrimaryButton label="+ Nova Tarefa" @click="emit('newTask')" />

    </div>
  </header>

  <div class="header-divider"></div>
</template>
