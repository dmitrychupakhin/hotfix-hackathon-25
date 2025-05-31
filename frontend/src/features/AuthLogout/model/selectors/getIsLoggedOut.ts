import type { StateSchema } from '@/app/providers/StoreProvider'

export const getIsLoggedOut = (state: StateSchema) => state.logout.isLoggedOut
