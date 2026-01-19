import { defineStore } from 'pinia'
import { Task } from '@/types/task'
import { TaskService } from '@/services/task.service'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: ''
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = ''

      try {
        this.tasks = await TaskService.getAll()
      } catch (err) {
        this.error = 'Erro ao carregar tarefas'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: number) {
      return TaskService.getById(id)
    },

    async createTask(payload: Omit<Task, 'id'>) {
      this.loading = true
      this.error = ''

      try {
        const task = await TaskService.create(payload)
        this.tasks.push(task)
      } catch (err) {
        this.error = 'Erro ao criar tarefa'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateTask(id: number, payload: Partial<Task>) {
      this.loading = true
      this.error = ''

      try {
        const updated = await TaskService.update(id, payload)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) this.tasks[index] = updated
      } catch (err) {
        this.error = 'Erro ao atualizar tarefa'
        throw err
      } finally {
        this.loading = false
      }
    },

    async removeTask(id: number) {
      this.loading = true
      this.error = ''

      try {
        await TaskService.remove(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err) {
        this.error = 'Erro ao remover tarefa'
        throw err
      } finally {
        this.loading = false
      }
    },

    async filterTasks(params: {
      category?: string
      priority?: 'Baixa' | 'Média' | 'Alta'
    }) {
      this.loading = true
      this.error = ''

      try {
        this.tasks = await TaskService.filter(params)
      } catch (err) {
        this.error = 'Erro ao filtrar tarefas'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
