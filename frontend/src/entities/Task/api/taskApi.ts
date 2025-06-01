import { rtkApi } from '@/shared/api'
import type { GetTasksRequest, GetTasksResponse, Task, UpdateTaskRequest } from '../model/Task'
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
      providesTags: (_result, _error, { id }) => [{ type: 'Tasks', id: id }],
      transformResponse: (response: Task) => {
        const camel = snakeToCamelObject<Task>(response)

        return {
          ...camel,
          createdAt: camel.createdAt ? formatIsoDate(camel.createdAt) : '',
        }
      },
    }),
    startPlan: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/predictors/${id}/start`,
        method: 'POST',
      }),
    }),
    getPlanResult: build.query<void, { id: number }>({
      query: ({ id }) => ({
        url: `/predictors/result/${id}`,
        method: 'GET',
      }),
    }),
    updateTask: build.mutation<void, { id: number, data: UpdateTaskRequest }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}/update`,
        method: 'PUT',
        body: data,
      }),
    }),
    cancelTask: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/orders/${id}/cancel`,
        method: 'POST',
      }),
    }),
  }),
})

export const useCancelTask = taskApi.useCancelTaskMutation
export const useUpdateTask = taskApi.useUpdateTaskMutation
export const useLazyGetPlanResult = taskApi.useLazyGetPlanResultQuery
export const useStartPlan = taskApi.useStartPlanMutation
export const useLazyGetTasks = taskApi.useLazyGetTasksQuery
export const useGetTasks = taskApi.useGetTasksQuery
export const useLazyGetTask = taskApi.useLazyGetTaskQuery
export const useGetTask = taskApi.useGetTaskQuery
