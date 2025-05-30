import { rtkApi } from '@/shared/api'

const authChangePhotoApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    authChangePhoto: build.mutation<void, FormData>({
      query: photo => ({
        url: '/users/photo',
        method: 'PUT',
        body: photo,
      }),
    }),
  }),
})

export const useAuthChangePhoto = authChangePhotoApi.useAuthChangePhotoMutation
