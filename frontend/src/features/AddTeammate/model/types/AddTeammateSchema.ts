import type { TeamRole } from '@/entities/Profile/model/types/User'
import type { FieldErrors } from '@/shared/types/FieldErrors'

interface AddTeammateSchema {
  firstName: string
  lastName: string
  middleName: string
  username: string
  photo: File | null
  role: TeamRole
  stack: string
  email: string
  password: string
  confirm: string
}

type AddTeammateErrors = FieldErrors<AddTeammateSchema> & {
  detail?: string | string[]
}

type AddTeammateResponse = {
  errors: AddTeammateErrors
  status: number
}

export type { AddTeammateErrors, AddTeammateResponse, AddTeammateSchema }
