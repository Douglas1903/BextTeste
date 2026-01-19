import { defineStore } from 'pinia'
import type { Category } from '@/types/category'
import { CategorysService } from '@/services/category.service'

export const useCategorysStore = defineStore('categorys', {
  state: () => ({
    categorys: [] as Category[],
    loading: false,
    error: ''
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = ''

      try {
        this.categorys = await CategorysService.getAll()
      } catch (err) {
        this.error = 'Erro ao carregar categorias'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: number) {
      return CategorysService.getById(id)
    },

    async createCategorys(payload: Omit<Category, 'id'>) {
      this.loading = true
      this.error = ''

      try {
        const created = await CategorysService.create(payload)
        this.categorys.push(created)
      } catch (err) {
        this.error = 'Erro ao criar categoria'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateCategorys(id: number, payload: Partial<Category>) {
      this.loading = true
      this.error = ''

      try {
        const updated = await CategorysService.update(id, payload)
        const index = this.categorys.findIndex(c => c.id === id)
        if (index !== -1) this.categorys[index] = updated
      } catch (err) {
        this.error = 'Erro ao atualizar categoria'
        throw err
      } finally {
        this.loading = false
      }
    },

    async removeCategorys(id: number) {
      this.loading = true
      this.error = ''

      try {
        await CategorysService.remove(id)
        this.categorys = this.categorys.filter(c => c.id !== id)
      } catch (err) {
        this.error = 'Erro ao remover categoria'
        throw err
      } finally {
        this.loading = false
      }
    },

    async filterCategorys(params: { name?: string }) {
      this.loading = true
      this.error = ''

      try {
        this.categorys = await CategorysService.filter(params)
      } catch (err) {
        this.error = 'Erro ao filtrar categorias'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
