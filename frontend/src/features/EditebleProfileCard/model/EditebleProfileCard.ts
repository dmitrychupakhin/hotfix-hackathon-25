import type { FieldErrors } from '@/shared/types/FieldErrors'

interface EditebleProfileCardSchema {
  firstName: string
  lastName: string
  middleName: string
  phone: string
  tg: string
}

type EditebleProfileCardErrors = FieldErrors<EditebleProfileCardSchema> & {
  detail?: string | string[]
}

type EditebleProfileCardResponse = {
  errors: EditebleProfileCardErrors
  status: number
}

export type {
  EditebleProfileCardSchema,
  EditebleProfileCardResponse,
  EditebleProfileCardErrors,
}
