import { rtkApi } from '@/shared/api'

export const AuthUnlinkVkApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authUnlinkVk: build.mutation<void, void>({
      query: () => ({
        url: '/users/vk/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const { useAuthUnlinkVkMutation: useAuthUnlinkVk } = AuthUnlinkVkApi
