import { rtkApi } from '@/shared/api'
import { camelToSnakeObject, snakeToCamelObject } from '@/shared/lib/utils'
import type {
  OrderFormErrors,
  OrderFormResponse,
  OrderFormSchema,
} from '../model/types/OrderFormSchema'

const orderFormApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    orderForm: build.mutation<void, OrderFormSchema>({
      query: body => ({
        url: '/orders/create',
        method: 'POST',
        body: camelToSnakeObject(body),
      }),
      transformErrorResponse: (response: { status: number, data: any }): OrderFormResponse => {
        const data = snakeToCamelObject(response.data) as Partial<OrderFormErrors>
        return {
          status: response.status,
          errors: data,
        }
      },
    }),
  }),
})

export const useOrderForm = orderFormApi.useOrderFormMutation
