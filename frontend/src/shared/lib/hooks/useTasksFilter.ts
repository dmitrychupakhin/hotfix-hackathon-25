import { TaskFilterField } from '@/shared/types/TaskFilterField'
import { TaskSortField } from '@/shared/types/TaskSortField'
import { useState } from 'react'

export const useTasksFilter = () => {
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<TaskSortField>(TaskSortField.CREATED_ASC)
  const [status, setStatus] = useState<TaskFilterField>(TaskFilterField.WAITING)
  return { search, setSearch, sort, setSort, status, setStatus }
}
