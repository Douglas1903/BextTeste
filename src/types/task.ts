export type TaskStatus = 'todo' | 'doing' | 'done'

export type Task = {
  id: number
  title: string
  description: string
  priority: 'Alta' | 'Média' | 'Baixa'
  date: string
  category: string
  status: TaskStatus
}
