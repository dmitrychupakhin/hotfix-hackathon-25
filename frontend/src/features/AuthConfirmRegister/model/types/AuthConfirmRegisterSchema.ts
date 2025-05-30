import type { FieldErrors } from '@/shared/types/FieldErrors';

interface AuthConfirmRegisterSchema {
  code: string;
}

type AuthConfirmRegisterErrors = FieldErrors<AuthConfirmRegisterSchema> & {
  detail?: string | string[];
};

type AuthConfirmRegisterResponse = {
  errors: AuthConfirmRegisterErrors;
  status: number;
};

export type { AuthConfirmRegisterSchema, AuthConfirmRegisterResponse, AuthConfirmRegisterErrors };
