import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  EditebleProfileCardErrors,
  EditebleProfileCardResponse,
  EditebleProfileCardSchema,
} from '../model/EditebleProfileCard'

const editebleProfileCardApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    editebleProfileCard: build.mutation<void, EditebleProfileCardSchema>({
      query: body => ({
        url: '/users/edit',
        method: 'PUT',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: unknown
      }): EditebleProfileCardResponse => {
        const data = snakeToCamelObject(response.data) as Partial<EditebleProfileCardErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useEditebleProfileCard
  = editebleProfileCardApi.useEditebleProfileCardMutation
