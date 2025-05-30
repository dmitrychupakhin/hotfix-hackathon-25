import { rtkApi } from '@/shared/api';
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils';
import type {
  AuthLoginErrors,
  AuthLoginResponse,
  AuthLoginSchema,
} from '../model/types/AuthLoginSchema';

const authLoginApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    authLogin: build.mutation<void, AuthLoginSchema>({
      query: (body) => ({
        url: '/account/login',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: { status: number; data: any }): AuthLoginResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthLoginErrors>;
        return {
          status: response.status,
          errors: data,
        };
      },
    }),
  }),
});

export const useAuthLogin = authLoginApi.useAuthLoginMutation;
