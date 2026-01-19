import { computed, ref } from 'vue'
import type { Category } from '@/types/category'
import { useCategorys } from './useCategorys'
import { useTasks } from './useTasks'

type Column = { key: string; title: string }

type CategoryApi = ReturnType<typeof useCategorys>
type TaskApi = ReturnType<typeof useTasks>

type UseCategoryHelpersDeps = {
  // refs
  categorys: CategoryApi['categorys']
  tasks: TaskApi['tasks']

  // actions (iguais às do composable)
  createCategory: CategoryApi['createCategory']
  updateCategory: CategoryApi['updateCategory']
  removeCategory: CategoryApi['removeCategory']
  fetchAllCategorys: CategoryApi['fetchAll']

  updateTask: TaskApi['updateTask']
  removeTask: TaskApi['removeTask']
  fetchAllTasks: TaskApi['fetchAll']
}

export function useCategoryHelpers(deps: UseCategoryHelpersDeps) {
  const {
    categorys,
    tasks,
    createCategory,
    updateCategory,
    removeCategory,
    updateTask,
    removeTask,
    fetchAllCategorys,
    fetchAllTasks
  } = deps

  /* =========================
     Create category helpers
  ========================= */

  function categoryExists(name: string) {
    const n = (name ?? '').trim().toLowerCase()
    if (!n) return false

    return (categorys.value ?? []).some((c: Category) => c.name.trim().toLowerCase() === n)
  }

  function nextDefaultCategoryName() {
    const base = 'Nova Lista'
    if (!categoryExists(base)) return base

    let i = 2
    while (categoryExists(`${base} ${i}`)) i++
    return `${base} ${i}`
  }

  async function onAddCategory() {
    const name = nextDefaultCategoryName()
    await createCategory({ name })
    await fetchAllCategorys()
    return name
  }

  /* =========================
     Ensure category exists (by name)
  ========================= */

  async function ensureCategoryExistsByName(categoryName: string) {
    const name = (categoryName ?? '').trim()
    if (!name) return

    const exists = (categorys.value ?? []).some((c: Category) =>
      c.name.trim().toLowerCase() === name.toLowerCase()
    )
    if (exists) return

    await createCategory({ name })
    await fetchAllCategorys()
  }

  /* =========================
     Rename category (inline edit)
  ========================= */

  const editingCategoryId = ref<string | null>(null)
  const editingCategoryValue = ref('')

  function isEditing(column: { key: string }) {
    return editingCategoryId.value === column.key
  }

  function startEditCategory(column: Column) {
    editingCategoryId.value = column.key
    editingCategoryValue.value = column.title
  }

  function cancelEditCategory() {
    editingCategoryId.value = null
    editingCategoryValue.value = ''
  }

  const isCategoryNameDuplicate = computed(() => {
    if (!editingCategoryId.value) return false

    const name = editingCategoryValue.value.trim().toLowerCase()
    if (!name) return false

    return (categorys.value ?? []).some((c: Category) => {
      if (c.id === editingCategoryId.value) return false
      return c.name.trim().toLowerCase() === name
    })
  })

  async function commitEditCategory(column: Column) {
    const newName = editingCategoryValue.value.trim()
    const oldName = column.title.trim()

    if (!newName || newName === oldName) {
      cancelEditCategory()
      return
    }

    const exists = (categorys.value ?? []).some((c: Category) => {
      if (c.id === column.key) return false
      return c.name.trim().toLowerCase() === newName.toLowerCase()
    })
    if (exists) {
      console.warn('Já existe uma categoria com esse nome.')
      return
    }

    // 1) renomeia categoria
    await updateCategory(column.key, { name: newName })

    // 2) move tasks que estavam na categoria antiga
    const toMove = (tasks.value ?? []).filter((t) => (t.category ?? '').trim() === oldName)
    for (const t of toMove) {
      await updateTask(t.id, { category: newName })
    }

    await Promise.all([fetchAllCategorys(), fetchAllTasks()])
    cancelEditCategory()
  }

  /* =========================
     Delete category modal
  ========================= */

  const isDeleteOpen = ref(false)
  const deleteTarget = ref<Column | null>(null)

  function onDeleteCategory(column: Column) {
    cancelEditCategory()
    deleteTarget.value = column
    isDeleteOpen.value = true
  }

  function cancelDelete() {
    isDeleteOpen.value = false
    deleteTarget.value = null
  }

  async function confirmDelete() {
    if (!deleteTarget.value) return

    try {
      const { key, title } = deleteTarget.value
      const categoryName = title.trim()

      // remove tasks daquela categoria
      const toDelete = (tasks.value ?? []).filter((t) => (t.category ?? '').trim() === categoryName)
      for (const t of toDelete) {
        await removeTask(t.id)
      }

      // remove a categoria
      await removeCategory(key)

      await Promise.all([fetchAllCategorys(), fetchAllTasks()])
    } finally {
      cancelDelete()
    }
  }

  return {
    // create
    onAddCategory,
    nextDefaultCategoryName,
    categoryExists,

    // ensure
    ensureCategoryExistsByName,

    // rename
    editingCategoryId,
    editingCategoryValue,
    isEditing,
    isCategoryNameDuplicate,
    startEditCategory,
    cancelEditCategory,
    commitEditCategory,

    // delete modal
    isDeleteOpen,
    deleteTarget,
    onDeleteCategory,
    cancelDelete,
    confirmDelete
  }
}
