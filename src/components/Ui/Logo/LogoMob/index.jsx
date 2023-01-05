import { Link } from 'react-router-dom'

import cn from 'classnames'
import classes from './index.module.scss'

const LogoMob = ({ media }) => {
  return (
    <Link className={cn(classes.link, classes[`link${media}`])} to='/' target='blank'>
      <img className={cn(classes.logo, classes[`logo${media}`])} src='images/logo-mob.png' alt='logo' />
    </Link>
  )
}

export default LogoMob
