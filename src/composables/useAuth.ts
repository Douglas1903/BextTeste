import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'

export function useAuth() {
  const authStore = useAuthStore()
  const { loading, error, user } = storeToRefs(authStore)

  return {
    user,
    loading,
    error,
    signIn: authStore.signIn,
    signOut: authStore.signOut
  }
}
