<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Task } from '@/types/task'

const filterStatus = defineModel<'' | Task['status']>('filterStatus', { default: '' })
const filterPriority = defineModel<'' | 'Alta' | 'Média' | 'Baixa'>('filterPriority', { default: '' })
const filterDateFrom = defineModel<string>('filterDateFrom', { default: '' })
const filterDateTo = defineModel<string>('filterDateTo', { default: '' })

const isOpen = ref(false)

function toggle() {
    isOpen.value = !isOpen.value
}

function close() {
    isOpen.value = false
}

const hasAnyFilter = computed(() => {
    return !!(filterStatus.value || filterPriority.value || filterDateFrom.value || filterDateTo.value)
})

function clearFilters() {
    filterStatus.value = ''
    filterPriority.value = ''
    filterDateFrom.value = ''
    filterDateTo.value = ''
}
</script>

<template>
    <div class="toolbar" style="position: relative;">
        <button class="tool-btn" title="Filtro" @click="toggle">
            <svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
                <path d="M7 6h10M7 12h7M7 18h4" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" />
            </svg>
        </button>

        <div v-if="isOpen" class="filter-popover" @click.stop>
            <div class="filter-row">
                <label class="filter-label">Status</label>
                <select class="filter-select" v-model="filterStatus">
                    <option value="">Todos</option>
                    <option value="todo">A fazer</option>
                    <option value="doing">Em progresso</option>
                    <option value="done">Concluído</option>
                </select>
            </div>

            <div class="filter-row">
                <label class="filter-label">Prioridade</label>
                <select class="filter-select" v-model="filterPriority">
                    <option value="">Todas</option>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </select>
            </div>

            <div class="filter-row">
                <label class="filter-label">Data (de)</label>
                <input class="filter-input" type="date" v-model="filterDateFrom" />
            </div>

            <div class="filter-row">
                <label class="filter-label">Data (até)</label>
                <input class="filter-input" type="date" v-model="filterDateTo" />
            </div>

            <div class="filter-actions">
                <button class="filter-btn ghost" type="button" @click="close">Fechar</button>
                <button class="filter-btn" type="button" :disabled="!hasAnyFilter" @click="clearFilters">
                    Limpar
                </button>
            </div>
        </div>
    </div>
</template>
