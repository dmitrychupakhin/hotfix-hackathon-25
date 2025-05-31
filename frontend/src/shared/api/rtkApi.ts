import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQueryWithReauth'

const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tasks', 'TeamLeaders', 'Team'],
  endpoints: () => ({}),
})

export default rtkApi
