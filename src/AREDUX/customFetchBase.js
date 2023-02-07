/* eslint-disable camelcase */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { logout, setTokens } from '../../features/user/userSlice'
import { SERVER_PATH } from './apiConst'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_PATH,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = getState().userState
    console.log(accessToken)
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

const customFetchBase = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  await mutex.waitForUnlock()
  if (
    result?.error?.status === 401 &&
    result?.error?.data.detail === 'Could not validate credentials: Signature has expired'
  ) {
    console.log(result?.error)
    console.log('необходимо обновить токен')

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      const { accessToken, refreshToken } = api.getState().userState

      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/login',
            method: 'PUT',
            body: {
              access_token: accessToken,
              refresh_token: refreshToken,
            },
          },
          api,
          extraOptions,
        )
        if (refreshResult?.data) {
          console.log('tokens', refreshResult.data)
          api.dispatch(setTokens(refreshResult.data))

          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
          window.location.href = '/login'
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export default customFetchBase

/**
 * result?.error?.data.detail !== 'Incorrect password' &&
    result?.error?.data.detail !== 'Incorrect email'
    
 */
