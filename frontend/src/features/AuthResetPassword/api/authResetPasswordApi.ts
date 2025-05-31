import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AuthResetPasswordErrors,
  AuthResetPasswordResponse,
  AuthResetPasswordSchema,
} from '../model/types/authResetPasswordSchema'

const AuthResetPasswordApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authResetPassword: build.mutation<void, AuthResetPasswordSchema>({
      query: body => ({
        url: '/users/pwd/reset/email',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: any
      }): AuthResetPasswordResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthResetPasswordErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useAuthResetPassword = AuthResetPasswordApi.useAuthResetPasswordMutation
