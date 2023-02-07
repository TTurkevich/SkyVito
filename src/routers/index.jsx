import { Routes, Route } from 'react-router-dom'

import Layout from '../pages/Layout'
import Main from '../pages/Main'
import Profile from '../pages/Profile'
import Adv from '../pages/Adv'
import Seller from '../pages/Seller'
import NotFound from '../pages/NotFound'
import RequireUser from './requireUser'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='*' element={<NotFound />} />
        <Route index element={<Main />} />
        <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/adv/:id?' element={<Adv />} />
        <Route path='/adv/:id?/seller/:seller?' element={<Seller />} />
      </Route>
    </Routes>
  )
}

export default Routers
