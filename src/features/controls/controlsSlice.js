import { createSlice } from '@reduxjs/toolkit'

import revertAll from '../generalActions'

const initialState = {
  modal: '',
}

export const controlsSlice = createSlice({
  initialState,
  name: 'controlsSlice',
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload
    },
    clearControls: () => initialState,
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
})

export default controlsSlice.reducer

export const { setModal, clearControls } = controlsSlice.actions

export const selectModal = (state) => state.controlsState.modal
