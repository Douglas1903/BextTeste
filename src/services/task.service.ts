import { Task } from '@/types/task'
import { api } from './api'

export const TaskService = {
  async getAll(): Promise<Task[]> {
    const response = await fetch(`${api}/tasks`)

    if (!response.ok) {
      throw new Error('Erro ao buscar tarefas')
    }

    return response.json()
  },

  async getById(id: string): Promise<Task> {
    const response = await fetch(`${api}/tasks/${id}`)

    if (!response.ok) {
      throw new Error('Tarefa não encontrada')
    }

    return response.json()
  },

  async create(payload: Omit<Task, 'id'>): Promise<Task> {
    const response = await fetch(`${api}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar tarefa')
    }

    return response.json()
  },

  async update(id: string, payload: Partial<Task>): Promise<Task> {
    const response = await fetch(`${api}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar tarefa')
    }

    return response.json()
  },

  async remove(id: string): Promise<void> {
    const response = await fetch(`${api}/tasks/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erro ao remover tarefa')
    }
  },

  async filter(params: {
    category?: string
    priority?: 'Baixa' | 'Média' | 'Alta'
  }): Promise<Task[]> {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined) as [
        string,
        string
      ][]
    )

    const response = await fetch(`${api}/tasks?${query.toString()}`)

    if (!response.ok) {
      throw new Error('Erro ao filtrar tarefas')
    }

    return response.json()
  },
}
