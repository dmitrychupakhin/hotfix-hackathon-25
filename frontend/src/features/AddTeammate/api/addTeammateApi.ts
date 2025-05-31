import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AddTeammateErrors,
  AddTeammateResponse,
  AddTeammateSchema,
} from '../model/types/AddTeammateSchema'

const addTeammateApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    addTeammate: build.mutation<void, AddTeammateSchema>({
      query: body => ({
        url: '/team/add',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: any
      }): AddTeammateResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AddTeammateErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
      invalidatesTags: ['Team'],
    }),
  }),
})

export const useAddTeamlead = addTeammateApi.useAddTeammateMutation
