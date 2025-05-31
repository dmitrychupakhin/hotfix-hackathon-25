import { rtkApi } from '@/shared/api'

const removeTeammateApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    removeTeammate: build.mutation<void, { id: string }>({
      query: body => ({
        url: `/team/${body.id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const useRemoveTeammate = removeTeammateApi.useRemoveTeammateMutation
