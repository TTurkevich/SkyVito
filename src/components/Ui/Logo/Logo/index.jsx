import { Link } from 'react-router-dom'
import cn from 'classnames'
import classes from './index.module.scss'

const Logo = ({ media }) => {
  return (
    <Link className={cn(classes.link, classes[`link${media}`])} to='/' target='blank'>
      <img className={classes.logo} src='images/logo.png' alt='logo' />
    </Link>
  )
}

export default Logo
