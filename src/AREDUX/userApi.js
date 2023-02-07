import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { setUser } from '../../features/user/userSlice'
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
      // transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
      },
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query(data) {
        return {
          url: '/user',
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['User'],
    }),
    updateAvatar: builder.mutation({
      query(data) {
        return {
          url: '/user/avatar',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export default userApi
export const { useUpdateUserMutation, useUpdateAvatarMutation, useGetUserQuery } = userApi
