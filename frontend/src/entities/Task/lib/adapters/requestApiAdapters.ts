import type { GetTasksRequest } from '../../model/Task'

export const getTasksRequestAdapter = (
  data: GetTasksRequest,
): Record<string, string | number> => {
  const adapted: Record<string, string | number> = {}

  if (data.status) adapted.status = data.status
  if (data.ordering) adapted.ordering = data.ordering
  if (data.page) adapted.page = data.page
  if (data.pageSize) adapted.page_size = data.pageSize
  if (data.search) adapted.search = data.search

  console.log(adapted)

  return adapted
}
