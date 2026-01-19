<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import '@/styles/dashboard.css'

import Header from '@/components/dashboard/Header.vue'
import EditCard from '@/components/EditCard.vue'

import { useTasks } from '@/composables/useTasks'
import { useCategorys } from '@/composables/useCategorys'

import type { Task } from '@/types/task'
import { Category, Column } from '@/types/category'
import CategoryKanban from '@/components/dashboard/CategoryKanban.vue'
import ModalDelCategory from '@/components/dashboard/ModalDelCategory.vue'
import KanbanEmptyState from '@/components/dashboard/KanbanEmptyState.vue'
import { useCategoryHelpers } from '@/composables/useCategoryHelpers'

const { tasks, fetchAll, createTask, updateTask, removeTask } = useTasks()

const {
  categorys,
  fetchAll: fetchAllCategorys,
  createCategory,
  updateCategory,
  removeCategory
} = useCategorys()

const {
  onAddCategory,
  ensureCategoryExistsByName,

  editingCategoryValue,
  isEditing,
  isCategoryNameDuplicate,
  startEditCategory,
  cancelEditCategory,
  commitEditCategory,

  isDeleteOpen,
  deleteTarget,
  onDeleteCategory,
  cancelDelete,
  confirmDelete
} = useCategoryHelpers({
  categorys,
  tasks,
  createCategory,
  updateCategory,
  removeCategory,
  updateTask,
  removeTask,
  fetchAllCategorys,
  fetchAllTasks: fetchAll
})


const search = ref('')

type StatusFilter = '' | Task['status'] 
type PriorityFilter = '' | 'Alta' | 'Média' | 'Baixa'

const filterStatus = ref<StatusFilter>('')
const filterPriority = ref<PriorityFilter>('')


const filterDateFrom = ref<string>('')
const filterDateTo = ref<string>('')

function startOfDayMs(yyyyMmDd: string) {
  const [y, m, d] = yyyyMmDd.split('-').map(Number)
  if (!y || !m || !d) return NaN
  return new Date(y, m - 1, d, 0, 0, 0, 0).getTime()
}

function endOfDayMs(yyyyMmDd: string) {
  const [y, m, d] = yyyyMmDd.split('-').map(Number)
  if (!y || !m || !d) return NaN
  return new Date(y, m - 1, d, 23, 59, 59, 999).getTime()
}

const filteredTasks = computed(() => {
  const q = search.value.trim().toLowerCase()

  let list = tasks.value.slice()

  if (q) {
    list = list.filter((t) =>
      `${t.title ?? ''} ${t.description ?? ''}`.toLowerCase().includes(q)
    )
  }

  if (filterStatus.value) {
    list = list.filter((t) => t.status === filterStatus.value)
  }

  if (filterPriority.value) {
    list = list.filter((t) => (t.priority ?? '').trim() === filterPriority.value)
  }

  const from = filterDateFrom.value ? startOfDayMs(filterDateFrom.value) : NaN
  const to = filterDateTo.value ? endOfDayMs(filterDateTo.value) : NaN

  if (!Number.isNaN(from) || !Number.isNaN(to)) {
    list = list.filter((t) => {
      const ms = new Date(t.date).getTime()
      if (Number.isNaN(ms)) return false
      if (!Number.isNaN(from) && ms < from) return false
      if (!Number.isNaN(to) && ms > to) return false
      return true
    })
  }

  return list
})


const kanbanColumns = computed<Column[]>(() => {
  const list = (categorys.value ?? []) as Category[]
  return list.map((c) => ({
    key: String(c.id),
    title: c.name
  }))
})

const tasksByCategoryName = computed<Record<string, Task[]>>(() => {
  const grouped: Record<string, Task[]> = {}

  kanbanColumns.value.forEach((col) => {
    grouped[col.title] = []
  })

  filteredTasks.value.forEach((task) => {
    const key = (task.category ?? '').trim()
    if (key && grouped[key]) grouped[key].push(task)
  })

  return grouped
})

const hasNoCategories = computed(() => (categorys.value?.length ?? 0) === 0)
const hasNoCards = computed(() => filteredTasks.value.length === 0)
const showEmptyState = computed(() => hasNoCategories.value && hasNoCards.value)

const emptyTitle = computed(() => {
  if (hasNoCategories.value) return 'Nenhuma categoria por aqui ainda'
  if (search.value.trim()) return 'Nada encontrado'
  return 'Seu dashboard ainda está vazio'
})

const emptyText = computed(() => {
  if (hasNoCategories.value && hasNoCards.value) {
    return 'Crie seu primeiro card e comece a organizar seu fluxo.'
  }
  if (search.value.trim()) {
    return 'Tente ajustar a busca ou criar um novo card para começar.'
  }
})

onMounted(async () => {
  await Promise.all([fetchAll(), fetchAllCategorys()])
})

const isEditOpen = ref(false)
const selectedTask = ref<Task | null>(null)

function onAddTask(categoryName: string) {
  selectedTask.value = {
    id: 0,
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'Baixa',
    date: new Date().toISOString(),
    category: categoryName
  }
  isEditOpen.value = true
}

async function onDeleteTask(task: Task) {
  try {
    await removeTask(task.id)

    if (selectedTask.value?.id === task.id) {
      isEditOpen.value = false
      selectedTask.value = null
    }

    await fetchAll()
  } catch (e) {
    console.error(e)
  }
}


function onCardClick(task: Task) {
  selectedTask.value = task
  isEditOpen.value = true
}



async function onSaveTask(updated: Task) {
  const exists = tasks.value.some((t) => t.id === updated.id)
  const title = (updated.title ?? '').trim()
  const category = (updated.category ?? '').trim()

  if (!title || !category) {
    console.warn('Título e categoria são obrigatórios.')
    return
  }

  try {
    await ensureCategoryExistsByName(category)

    if (exists && updated.id) {
      await updateTask(updated.id, {
        title,
        description: updated.description,
        status: updated.status,
        priority: updated.priority,
        date: updated.date,
        category
      })
    }
    else {
      await createTask({
        title,
        description: updated.description,
        status: updated.status,
        priority: updated.priority,
        date: updated.date,
        category
      })
    }

    isEditOpen.value = false
    selectedTask.value = null

    await fetchAll()
  } catch (e) {
    console.error(e)
  }
}




async function onEmptyAction() {
  try {
    let firstCategoryName = (categorys.value?.[0] as Category | undefined)?.name

    if (!firstCategoryName) {
      firstCategoryName = await onAddCategory()
    }

    onAddTask(firstCategoryName)
  } catch (e) {
    console.error(e)
  }
}


</script>

<template>
  <div class="dashboard">
    <Header v-model="search" :tasksCount="filteredTasks.length" v-model:filterStatus="filterStatus"
      v-model:filterPriority="filterPriority" v-model:filterDateFrom="filterDateFrom"
      v-model:filterDateTo="filterDateTo" @newTask="onAddTask('')" />


    <div class="kanban-wrap">
      <KanbanEmptyState v-if="showEmptyState" :title="emptyTitle" :text="emptyText" action-label="+ Criar primeiro card"
        @action="onEmptyAction" />


      <section v-else class="kanban">
        <CategoryKanban v-for="column in kanbanColumns" :key="column.key" :column="column"
          :tasks="tasksByCategoryName[column.title] ?? []" :isEditing="isEditing(column)"
          :editingValue="editingCategoryValue" :isNameDuplicate="isCategoryNameDuplicate"
          @update:editingValue="editingCategoryValue = $event" @startEdit="startEditCategory"
          @cancelEdit="cancelEditCategory" @commitEdit="commitEditCategory" @deleteCategory="onDeleteCategory"
          @addTask="onAddTask" @cardClick="onCardClick" @deleteTask="onDeleteTask" />


        <button class="kanban-add" type="button" aria-label="Adicionar nova categoria" @click="onAddCategory">
          <span class="kanban-add-plus">+</span>
        </button>
      </section>
    </div>

    <EditCard v-model="isEditOpen" :task="selectedTask" @save="onSaveTask" />

    <ModalDelCategory :open="isDeleteOpen" :target="deleteTarget" @cancel="cancelDelete" @confirm="confirmDelete" />

  </div>
</template>
