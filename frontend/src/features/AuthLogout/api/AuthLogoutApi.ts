import { rtkApi } from '@/shared/api'

export const authLogoutApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const { useLogoutMutation: useAuthLogout } = authLogoutApi
