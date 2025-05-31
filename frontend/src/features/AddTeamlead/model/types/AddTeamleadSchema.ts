import type { TeamRole } from '@/entities/Profile/model/types/User'
import type { FieldErrors } from '@/shared/types/FieldErrors'

interface AddTeamleadSchema {
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

type AddTeamleadErrors = FieldErrors<AddTeamleadSchema> & {
  detail?: string | string[]
}

type AddTeamleadResponse = {
  errors: AddTeamleadErrors
  status: number
}

export type { AddTeamleadSchema, AddTeamleadResponse, AddTeamleadErrors }
