import cn from 'classnames'

import LogoMob from '../Ui/Logo/LogoMob'
import classes from './index.module.scss'

const MobHeader = ({ className }) => {
  return (
    <header className={cn(className, classes.header)}>
      <LogoMob className={classes.img} btnClassName={classes.logo} />
    </header>
  )
}

export default MobHeader
