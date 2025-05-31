import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: __API__,
  credentials: 'include',
})

export default baseQuery
