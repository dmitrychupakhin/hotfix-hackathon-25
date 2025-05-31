import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AuthRegisterErrors,
  AuthRegisterResponse,
  AuthRegisterSchema,
} from '../model/types/AuthRegisterSchema'

const authRegisterApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authRegister: build.mutation<void, AuthRegisterSchema>({
      query: body => ({
        url: '/users/register',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: { status: number, data: any }): AuthRegisterResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthRegisterErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useAuthRegister = authRegisterApi.useAuthRegisterMutation
