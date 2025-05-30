import type { FieldErrors } from '@/shared/types/FieldErrors';

interface AuthConfirmResetPasswordSchema {
  code: string;
  password: string;
  confirm: string;
}

type AuthConfirmResetPasswordErrors = FieldErrors<AuthConfirmResetPasswordSchema> & {
  detail?: string | string[];
};

type AuthConfirmResetPasswordResponse = {
  errors: AuthConfirmResetPasswordErrors;
  status: number;
};

export type {
  AuthConfirmResetPasswordSchema,
  AuthConfirmResetPasswordResponse,
  AuthConfirmResetPasswordErrors,
};
