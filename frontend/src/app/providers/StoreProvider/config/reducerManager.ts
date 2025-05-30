import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer, ReducersMapObject, UnknownAction } from '@reduxjs/toolkit';
import type { StateSchema, StateSchemaKey, ReducerManager, MountedReducers } from './StateSchema';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: Array<StateSchemaKey> = [];
  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,
    reduce: (state: StateSchema, action: UnknownAction) => {
      let nextState = state;
      if (keysToRemove.length > 0) {
        nextState = { ...state };
        keysToRemove.forEach((key) => {
          delete (nextState as Partial<StateSchema>)[key];
        });
        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      mountedReducers[key] = true;

      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete (reducers as Record<string, unknown>)[key];
      keysToRemove.push(key);
      mountedReducers[key] = false;

      combinedReducer = combineReducers(reducers);
    },
  };
}
