import cn from 'classnames'
import classes from './index.module.scss'

const ButtonWithBorder = ({ children, className, ...attrs }) => {
  return (
    <button type='button' className={cn(classes.button, className)} {...attrs}>
      {children}
    </button>
  )
}

export default ButtonWithBorder
