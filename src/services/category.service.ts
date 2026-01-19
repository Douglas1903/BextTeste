import type { Category } from '@/types/category'
import { api } from './api'

export const CategorysService = {
  async getAll(): Promise<Category[]> {
    const response = await fetch(`${api}/categories`)

    if (!response.ok) {
      throw new Error('Erro ao buscar categorias')
    }

    return response.json()
  },

  async getById(id: number): Promise<Category> {
    const response = await fetch(`${api}/categories/${id}`)

    if (!response.ok) {
      throw new Error('Categoria não encontrada')
    }

    return response.json()
  },

  async create(payload: Omit<Category, 'id'>): Promise<Category> {
    const response = await fetch(`${api}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar categoria')
    }

    return response.json()
  },

  async update(id: number, payload: Partial<Category>): Promise<Category> {
    const response = await fetch(`${api}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar categoria')
    }

    return response.json()
  },

  async remove(id: number): Promise<void> {
    const response = await fetch(`${api}/categories/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erro ao remover categoria')
    }
  },

  async filter(params: { name?: string }): Promise<Category[]> {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
    )

    const response = await fetch(`${api}/categories?${query.toString()}`)

    if (!response.ok) {
      throw new Error('Erro ao filtrar categorias')
    }

    return response.json()
  },
}
