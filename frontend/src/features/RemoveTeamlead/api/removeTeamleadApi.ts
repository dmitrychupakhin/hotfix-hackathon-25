import { rtkApi } from '@/shared/api'

const removeTeamleadApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    removeTeamlead: build.mutation<void, { id: string }>({
      query: body => ({
        url: `/users/${body.id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const useRemoveTeamlead = removeTeamleadApi.useRemoveTeamleadMutation
