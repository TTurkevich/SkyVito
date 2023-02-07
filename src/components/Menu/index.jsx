import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import Button from '../Ui/Button'
import Logo from '../Ui/Logo/Logo'
import LogoMob from '../Ui/Logo/LogoMob'

import classes from './index.module.scss'

const Menu = ({ media }) => {
  const navigate = useNavigate()
  return (
    <div className={cn(classes.menu, classes[`menu${media}`])}>
      <Logo media={media} />
      <LogoMob media={media} />
      <form className={classes.form} action='#'>
        <Button
          type='button'
          className={cn(classes.btn, classes[`btn${media}`])}
          id='btnGoBack'
          onClick={() => navigate('/')}
        >
          Вернуться на&nbsp;главную
        </Button>
      </form>
    </div>
  )
}

export default Menu
