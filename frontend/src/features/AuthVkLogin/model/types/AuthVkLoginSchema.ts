type AuthVkLoginErrors = {
  detail?: string | string[]
}

type AuthVkLoginResponse = {
  errors: AuthVkLoginErrors
  status: number
}

export type { AuthVkLoginErrors, AuthVkLoginResponse }
