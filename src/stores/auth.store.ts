import { defineStore } from 'pinia'
import { AuthServiceMock } from '@/services/auth.mock'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: ''
  }),

  actions: {
    async signIn(email: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        this.user = await AuthServiceMock.login({ email, password })
      } catch (err: unknown) {
        this.error =
          err instanceof Error && err.message
            ? err.message
            : 'Falha no login. Tente novamente.'
        throw err
      } finally {
        this.loading = false
      }
    },

    signOut() {
      this.user = null
      this.error = ''
    }
  }
})
