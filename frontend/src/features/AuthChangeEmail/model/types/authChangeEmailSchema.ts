import type { FieldErrors } from '@/shared/types/FieldErrors'

interface AuthChangeEmailSchema {
  email: string
}

type AuthChangeEmailErrors = FieldErrors<AuthChangeEmailSchema> & {
  detail?: string | string[]
}

type AuthChangeEmailResponse = {
  errors: AuthChangeEmailErrors
  status: number
}

export type { AuthChangeEmailSchema, AuthChangeEmailResponse, AuthChangeEmailErrors }
