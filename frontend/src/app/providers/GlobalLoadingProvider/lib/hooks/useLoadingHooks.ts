import { useGetProfile } from '@/entities/Profile'

export const loadingHooks = [
  {
    name: 'profile',
    hook: useGetProfile,
    getIsLoading: (result: ReturnType<typeof useGetProfile>) => result.isLoading,
  },
]
