import type { Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
// import { CombinedState, Reducer } from 'redux';
// import { counterReducer } from '@/entities/Counter';
// import { $api } from '@/shared/api/api';
import { logoutReducer } from '@/features/AuthLogout'
import { globalLoaderReducer } from '@/features/GlobalLoader'
import { rtkApi } from '@/shared/api'
import type { StateSchema, ThunkExtraArg } from './StateSchema'
import { createReducerManager } from './reducerManager'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    // counter: counterReducer,
    logout: logoutReducer,
    globalLoader: globalLoaderReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    // api: $api,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  })

  // @ts-expect-error: reducerManager is not typed
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
