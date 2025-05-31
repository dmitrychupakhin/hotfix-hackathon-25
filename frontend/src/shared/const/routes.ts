export const ROUTES = {
  HOME: () => '/',

  AUTH: () => '/auth',
  AUTH_LOGIN: () => '/auth/login',
  AUTH_REGISTER: () => '/auth/register',
  AUTH_REGISTER_CONFIRM: () => '/auth/register/confirm',

  AUTH_RESET_PASSWORD: () => '/auth/reset-password',
  AUTH_RESET_PASSWORD_CONFIRM: () => '/auth/reset-password/confirm',

  AUTH_CHANGE_EMAIL: () => '/auth/change-email',
  AUTH_CHANGE_EMAIL_CONFIRM: () => '/auth/change-email/confirm',
  AUTH_CHANGE_PASSWORD: () => '/auth/change-password',

  PROFILE: () => '/profile',
  PROFILE_ORDER: () => '/profile/order',
  PROFILE_ACTIVE_TASKS: () => '/profile/active-tasks',

  NOT_FOUND: () => '*',
} as const
