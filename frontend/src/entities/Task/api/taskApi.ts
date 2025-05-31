import { rtkApi } from '@/shared/api'
import type { GetTasksRequest, GetTasksResponse, Task } from '../model/Task'
import { getTasksRequestAdapter } from '../lib/adapters/requestApiAdapters'
import { snakeToCamelObject } from '@/shared/lib/utils/snakeToCamel'
import { formatIsoDate } from '@/shared/lib/utils/formatIsoDate'

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
      transformResponse: (response: Task) => {
        const camel = snakeToCamelObject<Task>(response)

        return {
          ...camel,
          createdAt: camel.createdAt ? formatIsoDate(camel.createdAt) : '',
        }
      },
    }),
  }),
})

export const useLazyGetTasks = taskApi.useLazyGetTasksQuery
export const useGetTasks = taskApi.useGetTasksQuery
export const useLazyGetTask = taskApi.useLazyGetTaskQuery
export const useGetTask = taskApi.useGetTaskQuery
