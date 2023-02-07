import { createApi } from '@reduxjs/toolkit/query/react'
import { setAllAdv, setComments, setCurrentAdv } from '../../features/adv/advSlice'

import customFetchBase from './customFetchBase'

export const advApi = createApi({
  reducerPath: 'advApi',
  baseQuery: customFetchBase,
  tagTypes: ['Adv'],
  endpoints: (builder) => ({
    createAdv: builder.mutation({
      query(data) {
        return {
          url: `/ads${data.query}`,
          method: 'POST',
          body: data.formData,
        }
      },
      invalidatesTags: [{ type: 'Adv', id: 'LIST' }],
      // invalidatesTags: ['Adv'],
      transformResponse: (result) => result,
    }),
    createAdvNoImg: builder.mutation({
      query(data) {
        return {
          url: '/adstext',
          method: 'POST',
          body: data,
        }
      },
      // invalidatesTags: ['Adv'],
      invalidatesTags: [{ type: 'Adv', id: 'LIST' }],
      transformResponse: (result) => result,
    }),
    updateAdv: builder.mutation({
      query({ id, adv }) {
        return {
          url: `/ads/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: adv,
        }
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Adv', id },
              { type: 'Adv', id: 'LIST' },
            ]
          : [{ type: 'Adv', id: 'LIST' }],
    }),
    updateAdvImage: builder.mutation({
      query(dataN) {
        return {
          url: `/ads/${dataN.id}/image`,
          method: 'POST',
          credentials: 'include',
          body: dataN.file,
        }
      },
      invalidatesTags: ['Adv'],
    }),
    deleteAdvImage: builder.mutation({
      query({ id, query }) {
        return {
          url: `/ads/${id}/image/${query}`,
          method: 'DELETE',
          credentials: 'include',
        }
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Adv', id },
              { type: 'Adv', id: 'LIST' },
            ]
          : [{ type: 'Adv', id: 'LIST' }],
    }),
    getAdv: builder.query({
      query(id) {
        return {
          url: `/ads/${id}`,
          credentials: 'include',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCurrentAdv(data))
        } catch (error) {
          console.log(error)
        }
      },
      providesTags: (result, error, id) => [{ type: 'Adv', id }],
      // providesTags: ['Adv'],
    }),
    getAllAdv: builder.query({
      query() {
        return {
          url: `/ads?sorting=new`,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setAllAdv(data))
        } catch (error) {
          console.log(error)
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Adv',
                id,
              })),
              { type: 'Adv', id: 'LIST' },
            ]
          : [{ type: 'Adv', id: 'LIST' }],
      transformResponse: (results) => results,
    }),
    deleteAdv: builder.mutation({
      query(id) {
        return {
          url: `/ads/${id}`,
          method: 'Delete',
          credentials: 'include',
        }
      },
      invalidatesTags: [{ type: 'Adv', id: 'LIST' }],
    }),
    getMeAllAdv: builder.query({
      query() {
        return {
          url: `/ads/me`,
        }
      },
      providesTags: (result, error, id) => [{ type: 'Adv', id }],
    }),
    getComments: builder.query({
      query(id) {
        return {
          url: `/ads/${id}/comments`,
          credentials: 'include',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setComments(data))
        } catch (error) {
          console.log(error)
        }
      },
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation({
      query({ id, data }) {
        return {
          url: `/ads/${id}/comments`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['Comments'],
      transformResponse: (result) => result,
    }),
  }),
})

export const {
  useCreateAdvMutation,
  useCreateAdvNoImgMutation,
  useDeleteAdvMutation,
  useUpdateAdvMutation,
  useUpdateAdvImageMutation,
  useCreateCommentMutation,
  useDeleteAdvImageMutation,
  useGetAdvQuery,
  useGetAllAdvQuery,
  useGetMeAllAdvQuery,
  useGetCommentsQuery,
} = advApi
