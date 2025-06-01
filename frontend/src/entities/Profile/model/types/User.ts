export interface User {
  id: string
  username: string
  vkId: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  phone: string
  photo: string
  tg: string
  isStaff: boolean
  isTeam: boolean
  role: TeamRole
}

export enum TeamRole {
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  DESIGN = 'design',
  ML = 'ml',
  DEVOPS = 'devops',
}
