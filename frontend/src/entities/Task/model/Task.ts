import type { User } from '@/entities/Profile'
import type { TaskFilterField } from '@/shared/types/TaskFilterField'
import type { GanttInputItem } from '@/shared/ui/GanttChartComponent/ui/GanttChart'

export interface Task {
  id: number
  user: string
  team: User | null
  title: string
  description: string
  status: TaskFilterField
  start: null
  end: null
  createdAt: string
  plan: GanttInputItem[] | null
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

export interface UpdateTaskRequest {
  plan: string | null
  title: string
  description: string
  team: number | null
}
