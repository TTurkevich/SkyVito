import { createSlice } from '@reduxjs/toolkit'
import revertAll from '../generalActions'

const initialState = {
  user: '',
  accessToken: null,
  refreshToken: null,
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: (state) => {
      state.user = ''
      state.accessToken = null
      state.refreshToken = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAvatar: (state, action) => {
      state.user.avatar = action.payload
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
})

export default userSlice.reducer

export const { logout, setUser, setTokens, setAvatar } = userSlice.actions

// selectors
export const selectUser = (state) => state.userState.user
export const selectAccessToken = (state) => state.userState.accessToken
export const selectFullUser = (state) => state.userState
