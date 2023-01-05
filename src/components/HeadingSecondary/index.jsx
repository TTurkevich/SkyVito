import cn from 'classnames'

import classes from './index.module.scss'

const HeadingSecondary = ({ children, className }) => {
  return <h3 className={cn(classes.title, className)}>{children}</h3>
}

export default HeadingSecondary
