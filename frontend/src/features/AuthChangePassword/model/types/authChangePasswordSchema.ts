import type { FieldErrors } from '@/shared/types/FieldErrors'

interface AuthChangePasswordSchema {
  oldPassword: string
  password: string
  confirm: string
}

type AuthChangePasswordErrors = FieldErrors<AuthChangePasswordSchema> & {
  detail?: string | string[]
}

type AuthChangePasswordResponse = {
  errors: AuthChangePasswordErrors
  status: number
}

export type { AuthChangePasswordSchema, AuthChangePasswordResponse, AuthChangePasswordErrors }
