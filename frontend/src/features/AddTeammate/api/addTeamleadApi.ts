import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AddTeamleadErrors,
  AddTeamleadResponse,
  AddTeamleadSchema,
} from '../model/types/AddTeamleadSchema'

const addTeamleadApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    addTeamlead: build.mutation<void, AddTeamleadSchema>({
      query: body => ({
        url: '/users/leaders/create',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: any
      }): AddTeamleadResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AddTeamleadErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
      invalidatesTags: ['TeamLeaders'],
    }),
  }),
})

export const useAddTeamlead = addTeamleadApi.useAddTeamleadMutation
