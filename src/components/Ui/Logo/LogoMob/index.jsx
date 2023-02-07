import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import classes from './index.module.scss'

const LogoMob = ({ media, className, btnClassName }) => {
  const navigate = useNavigate()
  return (
    <button
      type='button'
      className={cn(btnClassName, classes.link, classes[`link${media}`])}
      onClick={() => navigate('/')}
    >
      <img className={cn(className, classes.logo, classes[`logo${media}`])} src='/images/logo-mob.png' alt='logo' />
    </button>
  )
}

export default LogoMob
