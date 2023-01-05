import { Link } from 'react-router-dom'

import cn from 'classnames'
import classes from './index.module.scss'

const Footer = ({ className }) => {
  return (
    <footer className={cn(classes.footer, className)}>
      <div className={classes.container}>
        <div className={classes.img}>
          <Link to='/' target='_self'>
            <img src='images/icon_01.png' alt='home' />
          </Link>
        </div>
        <div className={classes.img}>
          <Link to='/newAdv' target='_self'>
            <img src='images/icon_02.png' alt='plus' />
          </Link>
        </div>
        <div className={classes.img}>
          <Link to='/profile' target='_self'>
            <img src='images/icon_03.png' alt='profile' />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
