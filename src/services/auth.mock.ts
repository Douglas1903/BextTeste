import type { LoginPayload, User, UserWithPassword } from '@/types/user'
import { api } from './api'

export const AuthServiceMock = {
  async login(payload: LoginPayload): Promise<User> {
    const email = payload.email.trim()

    const response = await fetch(`${api}/users?email=${encodeURIComponent(email)}`)

    if (!response.ok) {
      throw new Error('Não foi possível acessar o servidor. Tente novamente.')
    }

    const users: UserWithPassword[] = await response.json()
    const found = users[0]

    if (!found) throw new Error('Email não encontrado.')
    if (found.password !== payload.password) throw new Error('Senha incorreta.')

    const { password, ...user } = found
    return user
  }
}
