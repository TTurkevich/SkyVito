import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import classes from './index.module.scss'

const Logo = ({ media }) => {
  const navigate = useNavigate()
  return (
    <button type='button' className={cn(classes.link, classes[`link${media}`])} onClick={() => navigate('/')}>
      <img className={classes.logo} src='/images/logo.png' alt='logo' />
    </button>
  )
}

export default Logo
