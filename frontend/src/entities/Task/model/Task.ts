import type { TaskFilterField } from '@/shared/types/TaskFilterField'
import type { GanttInputItem } from '@/shared/ui/GanttChartComponent/ui/GanttChart'

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
