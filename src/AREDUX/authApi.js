import { createApi } from '@reduxjs/toolkit/query/react'
import userApi from './userApi'
// import { SERVER_PATH } from './apiConst'
import { setTokens, setUser } from '../../features/user/userSlice'
import customFetchBase from './customFetchBase'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: '/auth/register',
          method: 'POST',
          body: data,
        }
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: '/auth/login',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setTokens(data))
          const result = await dispatch(userApi.endpoints.getUser.initiate(''))
          dispatch(setUser(result.data))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi
