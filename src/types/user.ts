export type LoginPayload = {
  email: string
  password: string
}

export type User = {
  id: number
  email: string
}

export type UserWithPassword = User & {
  password: string
}