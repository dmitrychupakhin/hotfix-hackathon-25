import type { FieldErrors } from '@/shared/types/FieldErrors';

interface AuthLoginSchema {
  personalId: string;
  password: string;
  rememberMe: boolean;
}

type AuthLoginErrors = FieldErrors<AuthLoginSchema> & {
  detail?: string | string[];
};

type AuthLoginResponse = {
  errors: AuthLoginErrors;
  status: number;
};

export type { AuthLoginSchema, AuthLoginResponse, AuthLoginErrors };
