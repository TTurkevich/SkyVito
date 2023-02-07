import { createSelector, createSlice } from '@reduxjs/toolkit'

import revertAll from '../generalActions'

const initialState = {
  adv: null,
  currentAdv: null,
  search: '',
  comments: [],
}

export const advSlice = createSlice({
  initialState,
  name: 'advSlice',
  reducers: {
    setAllAdv: (state, action) => {
      state.adv = action.payload
    },
    setCurrentAdv: (state, action) => {
      state.currentAdv = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setComments: (state, action) => {
      state.comments = action.payload
    },
    clearControls: () => initialState,
  },
  extraReducers: (builder) =>
    builder.addCase(revertAll, (state) => {
      state.currentAdv = null
      state.comments = null
    }),
})

export default advSlice.reducer

export const { setCurrentAdv, setSearch, clearControls, setAllAdv, setComments } = advSlice.actions

export const selectCurrentAdv = (state) => state.advState.currentAdv
export const selectAllAdv = (state) => state.advState.adv
export const selectSearch = (state) => state.advState.search
export const selectComments = (state) => state.advState.comments

export const selectVisibleAdv = createSelector([selectSearch, selectAllAdv], (search, allAdv) => {
  const adv = allAdv?.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))

  return adv
})
