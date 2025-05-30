import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AuthConfirmChangeEmailErrors,
  AuthConfirmChangeEmailResponse,
  AuthConfirmChangeEmailSchema,
} from '../model/types/AuthConfirmChangeEmail'

const authConfirmChangeEmailApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authConfirmChangeEmail: build.mutation<void, AuthConfirmChangeEmailSchema>({
      query: body => ({
        url: '/users/email/reset/confirm',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: any
      }): AuthConfirmChangeEmailResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthConfirmChangeEmailErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useAuthConfirmChangeEmail
  = authConfirmChangeEmailApi.useAuthConfirmChangeEmailMutation
