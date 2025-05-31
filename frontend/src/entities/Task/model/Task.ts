import type { TaskFilterField } from '@/shared/types/TaskFilterField'

export interface Task {
  id: number
  user: string
  team: number | null
  title: string
  description: string
  status: TaskFilterField
  start: null
  end: null
  createdAt: string
}

export interface GetTasksResponse {
  count: number
  next: string | null
  previous: string | null
  results: Task[]
}

export interface GetTasksRequest {
  status: TaskFilterField
  ordering: string
  page?: number
  pageSize?: number
  search?: string
}
