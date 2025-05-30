import type { FieldErrors } from '@/shared/types/FieldErrors'

interface AuthRegisterSchema {
  username: string
  email: string
  password: string
  confirm: string
}

type AuthRegisterErrors = FieldErrors<AuthRegisterSchema> & {
  detail?: string | string[]
}

type AuthRegisterResponse = {
  errors: AuthRegisterErrors
  status: number
}

export type { AuthRegisterSchema, AuthRegisterResponse, AuthRegisterErrors }
