import { Routes, Route } from 'react-router-dom'

import Layout from '../pages/Layout'
import Main from '../pages/Main'
import Profile from '../pages/Profile'
import Adv from '../pages/Adv'
import NotFound from '../pages/NotFound'
import Signup from '../components/modal/Signup'
import Login from '../components/modal/Login'
import NewAdd from '../components/modal/NewAdd'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='*' element={<NotFound />} />
        <Route index element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/adv' element={<Adv />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newAdd' element={<NewAdd />} />
      </Route>
    </Routes>
  )
}

export default Routers
