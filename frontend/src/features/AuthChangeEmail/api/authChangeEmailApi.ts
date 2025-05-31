import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  AuthChangeEmailErrors,
  AuthChangeEmailResponse,
  AuthChangeEmailSchema,
} from '../model/types/authChangeEmailSchema'

const AuthChangeEmailApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authChangeEmail: build.mutation<void, AuthChangeEmailSchema>({
      query: body => ({
        url: '/users/email/reset',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number
        data: any
      }): AuthChangeEmailResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthChangeEmailErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useAuthChangeEmail = AuthChangeEmailApi.useAuthChangeEmailMutation
