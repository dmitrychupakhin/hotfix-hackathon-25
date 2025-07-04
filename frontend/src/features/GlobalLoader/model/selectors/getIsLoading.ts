import type { StateSchema } from '@/app/providers/StoreProvider'

export const getIsLoading = (state: StateSchema) => state.globalLoader.isLoading
