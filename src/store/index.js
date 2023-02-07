import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from '../redux/api/authApi'
import userApi from '../redux/api/userApi'
import { advApi } from '../redux/api/advApi'
import userReducer from '../features/user/userSlice'
import advReducer from '../features/adv/advSlice'
import controlsReducer from '../features/controls/controlsSlice'

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [advApi.reducerPath]: advApi.reducer,
    userState: userReducer,
    advState: advReducer,
    controlsState: controlsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([authApi.middleware, userApi.middleware, advApi.middleware]),
})

export default store

setupListeners(store.dispatch)
