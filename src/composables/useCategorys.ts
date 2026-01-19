import { storeToRefs } from 'pinia'
import { useCategorysStore } from '@/stores/categorys.store'

export function useCategorys() {
  const categorysStore = useCategorysStore()
  const { categorys, loading, error } = storeToRefs(categorysStore)

    return {
    categorys,
    loading,
    error,
    fetchAll: categorysStore.fetchAll,
    fetchById: categorysStore.fetchById,
    createCategory: categorysStore.createCategorys,
    updateCategory: categorysStore.updateCategorys,
    removeCategory: categorysStore.removeCategorys,
    filterCategory: categorysStore.filterCategorys
  }
}