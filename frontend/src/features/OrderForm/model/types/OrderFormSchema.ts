import type { FieldErrors } from '@/shared/types/FieldErrors'

interface OrderFormSchema {
  title: string
  description: string
}

type OrderFormErrors = FieldErrors<OrderFormSchema> & {
  detail?: string | string[]
}

type OrderFormResponse = {
  errors: OrderFormErrors
  status: number
}

export type { OrderFormSchema, OrderFormResponse, OrderFormErrors }
