import type { EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api';
import { logoutReducer } from '@/features/AuthLogout';
import { globalLoaderReducer } from '@/features/GlobalLoader';
// import { AxiosInstance } from 'axios';
// import { CombinedState } from 'redux';

export interface StateSchema {
  // counter: CounterSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  logout: ReturnType<typeof logoutReducer>;
  globalLoader: ReturnType<typeof globalLoaderReducer>;
  // Асинхронные редюсеры
  // loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  // api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
