import cn from 'classnames'

import ButtonSmall from '../Ui/ButtonSmall'
import Logo from '../Ui/Logo/Logo'
import LogoMob from '../Ui/Logo/LogoMob'

import classes from './index.module.scss'

const Menu = ({ media }) => {
  return (
    <div className={cn(classes.menu, classes[`menu${media}`])}>
      <Logo media={media} />
      <LogoMob media={media} />
      <form className={classes.form} action='#'>
        <ButtonSmall type='button' className={cn(classes.btn, classes[`btn${media}`])} id='btnGoBack'>
          Вернуться на&nbsp;главную
        </ButtonSmall>
      </form>
    </div>
  )
}

export default Menu
