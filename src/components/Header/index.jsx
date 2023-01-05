import cn from 'classnames'
import useHeader from '../../hooks/header'

import classes from './index.module.scss'

const Header = ({ className }) => {
  const children = useHeader()
  return (
    <header className={cn(classes.header, className)}>
      <nav className={classes.nav}>{children}</nav>
    </header>
  )
}

export default Header
