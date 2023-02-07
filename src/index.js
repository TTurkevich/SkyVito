import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthMiddleware from './helpers/AuthMiddleware'

import App from './App/App'
import store from './store'

import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthMiddleware>
          <ToastContainer />
          <App />
        </AuthMiddleware>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
