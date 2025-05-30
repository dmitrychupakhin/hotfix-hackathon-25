import type { FieldErrors } from '@/shared/types/FieldErrors'

interface AuthResetPasswordSchema {
  email: string
}

type AuthResetPasswordErrors = FieldErrors<AuthResetPasswordSchema> & {
  detail?: string | string[]
}

type AuthResetPasswordResponse = {
  errors: AuthResetPasswordErrors
  status: number
}

export type { AuthResetPasswordSchema, AuthResetPasswordResponse, AuthResetPasswordErrors }
