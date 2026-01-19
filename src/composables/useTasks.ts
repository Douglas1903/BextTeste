import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/tasks.store'

export function useTasks() {
  const tasksStore = useTasksStore()
  const { tasks, loading, error } = storeToRefs(tasksStore)

  return {
    tasks,
    loading,
    error,
    fetchAll: tasksStore.fetchAll,
    fetchById: tasksStore.fetchById,
    createTask: tasksStore.createTask,
    updateTask: tasksStore.updateTask,
    removeTask: tasksStore.removeTask,
    filterTasks: tasksStore.filterTasks
  }
}
