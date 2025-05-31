import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AuthConfirmResetPasswordErrors,
  AuthConfirmResetPasswordResponse,
  AuthConfirmResetPasswordSchema,
} from '../model/types/authConfirmResetPasswordSchema'

const AuthConfirmResetPasswordApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authConfirmResetPassword: build.mutation<void, AuthConfirmResetPasswordSchema>({
      query: body => ({
        url: '/users/pwd/reset/email/confirm',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: any
      }): AuthConfirmResetPasswordResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthConfirmResetPasswordErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useAuthConfirmResetPassword
  = AuthConfirmResetPasswordApi.useAuthConfirmResetPasswordMutation
