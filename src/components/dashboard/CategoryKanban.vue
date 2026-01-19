<script setup lang="ts">
import Card from '@/components/dashboard/Card.vue'
import { Column } from '@/types/category';
import type { Task } from '@/types/task'

const props = defineProps<{
    column: Column
    tasks: Task[]
    isEditing: boolean
    editingValue: string
    isNameDuplicate: boolean
}>()

const emit = defineEmits<{
    (e: 'startEdit', column: Column): void
    (e: 'cancelEdit'): void
    (e: 'commitEdit', column: Column): void
    (e: 'deleteCategory', column: Column): void

    (e: 'addTask', categoryName: string): void
    (e: 'cardClick', task: Task): void
    (e: 'deleteTask', task: Task): void

    (e: 'update:editingValue', value: string): void
}>()
</script>

<template>
    <div class="kanban-col">
        <div class="kanban-col-header">
            <div class="col-title">
                <button v-if="!isEditing" type="button" class="col-title-btn" title="Renomear categoria"
                    @dblclick="emit('startEdit', column)" @click="emit('startEdit', column)">
                    {{ column.title }}
                </button>

                <input v-else class="col-title-input" :class="{ 'is-invalid': isNameDuplicate }" :value="editingValue"
                    autofocus @input="emit('update:editingValue', ($event.target as HTMLInputElement).value)"
                    @keydown.enter.prevent="emit('commitEdit', column)" @keydown.esc.prevent="emit('cancelEdit')"
                    @blur="emit('commitEdit', column)" />
            </div>

            <span class="col-count">
                {{ tasks?.length || 0 }}
            </span>

            <button class="col-delete-btn" type="button" title="Excluir categoria"
                @click="emit('deleteCategory', column)">
                ×
            </button>
        </div>

        <div class="kanban-col-body">
            <Card v-for="task in tasks" :key="task.id" :task="task" @open="emit('cardClick', $event)"
                @delete="emit('deleteTask', $event)" />



            <button class="kanban-add-card" type="button" @click="emit('addTask', column.title)">
                + Criar card
            </button>
        </div>
    </div>
</template>
