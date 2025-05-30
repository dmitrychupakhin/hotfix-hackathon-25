import type { FieldErrors } from '@/shared/types/FieldErrors';

interface AuthConfirmChangeEmailSchema {
  code: string;
}

type AuthConfirmChangeEmailErrors = FieldErrors<AuthConfirmChangeEmailSchema> & {
  detail?: string | string[];
};

type AuthConfirmChangeEmailResponse = {
  errors: AuthConfirmChangeEmailErrors;
  status: number;
};

export type {
  AuthConfirmChangeEmailSchema,
  AuthConfirmChangeEmailResponse,
  AuthConfirmChangeEmailErrors,
};
