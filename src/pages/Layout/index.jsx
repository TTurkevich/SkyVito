import { Outlet } from 'react-router-dom'

import classes from './index.module.scss'

const Layout = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
