import { rtkApi } from '@/shared/api';
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils';
import type {
  AuthConfirmRegisterErrors,
  AuthConfirmRegisterResponse,
  AuthConfirmRegisterSchema,
} from '../model/types/AuthConfirmRegisterSchema';

const authConfirmRegisterApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    authConfirmRegister: build.mutation<void, AuthConfirmRegisterSchema>({
      query: (body) => ({
        url: '/users/register/confirm',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: {
        status: number;
        data: any;
      }): AuthConfirmRegisterResponse => {
        const data = snakeToCamelObject(response.data) as Partial<AuthConfirmRegisterErrors>;
        return {
          status: response.status,
          errors: data,
        };
      },
    }),
  }),
});

export const useAuthConfirmRegister = authConfirmRegisterApi.useAuthConfirmRegisterMutation;
