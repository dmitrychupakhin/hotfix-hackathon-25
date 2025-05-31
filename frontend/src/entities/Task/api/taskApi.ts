import { rtkApi } from '@/shared/api'
import type { GetTasksRequest, GetTasksResponse, Task } from '../model/Task'
import { getTasksRequestAdapter } from '../lib/adapters/requestApiAdapters'

export const taskApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse, GetTasksRequest>({
      query: params => ({
        url: '/orders',
        method: 'GET',
        params: getTasksRequestAdapter(params),
      }),
      providesTags: () => [{ type: 'Tasks', id: 'LIST' }],
    }),
    getTask: build.query<Task, { id: number }>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const useLazyGetTasks = taskApi.useLazyGetTasksQuery
export const useGetTasks = taskApi.useGetTasksQuery
export const useLazyGetTask = taskApi.useLazyGetTaskQuery
export const useGetTask = taskApi.useGetTaskQuery
