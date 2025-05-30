import { rtkApi } from '@/shared/api'
import { snakeToCamelObject } from '@/shared/lib/utils/snakeToCamel'
import type { AuthVkLoginErrors, AuthVkLoginResponse } from '../model/types/AuthVkLoginSchema'

export const AuthVkLoginApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authVkLogin: build.mutation<void, { access_token: string }>({
      query: ({ access_token }) => ({
        url: '/users/vk/login',
        method: 'POST',
        body: { access_token },
      }),
      transformErrorResponse: (response: { status: number, data: any }): AuthVkLoginResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthVkLoginErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const { useAuthVkLoginMutation: useAuthVkLogin } = AuthVkLoginApi
