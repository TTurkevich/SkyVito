import cn from 'classnames'
import classes from './index.module.scss'

const HeadingMain = ({ children, className }) => {
  return <h2 className={cn(classes.h2, className)}>{children}</h2>
}

export default HeadingMain
