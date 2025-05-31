import { rtkApi } from '@/shared/api'
import { snakeToCamelObject } from '@/shared/lib/utils/snakeToCamel'
import type { User } from '../model/types/User'

export const profileApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<User, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        return snakeToCamelObject<User>(response)
      },
    }),
  }),
})

export const useGetProfile = profileApi.useGetProfileQuery
export const useLazyGetProfile = profileApi.useLazyGetProfileQuery
