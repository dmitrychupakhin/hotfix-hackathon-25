import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AuthChangePasswordErrors,
  AuthChangePasswordResponse,
  AuthChangePasswordSchema,
} from '../model/types/authChangePasswordSchema'

const authChangePasswordApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authChangePassword: build.mutation<void, AuthChangePasswordSchema>({
      query: body => ({
        url: '/users/pwd/reset',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: any
      }): AuthChangePasswordResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthChangePasswordErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useAuthChangePassword = authChangePasswordApi.useAuthChangePasswordMutation
