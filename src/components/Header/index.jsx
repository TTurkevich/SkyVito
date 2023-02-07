import cn from 'classnames'

import classes from './index.module.scss'

const Header = ({ children, className }) => {
  return (
    <header className={cn(classes.header, className)}>
      <nav className={classes.nav}>{children}</nav>
    </header>
  )
}

export default Header
