import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { setAvatar, setUser } from '../../features/user/userSlice'
import customFetchBase from './customFetchBase'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query() {
        return {
          url: '/user',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updateUser: builder.mutation({
      query(data) {
        return {
          url: '/user',
          method: 'PATCH',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updateAvatar: builder.mutation({
      query(data) {
        return {
          url: '/user/avatar',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setAvatar(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export default userApi
export const { useUpdateUserMutation, useUpdateAvatarMutation, useGetUserQuery } = userApi
