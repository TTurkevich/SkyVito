import cn from 'classnames'

import classes from './index.module.scss'

const ButtonSmall = ({ children, className, type, ...attrs }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...attrs} type={type} className={cn(classes.button, className)}>
      {children}
    </button>
  )
}

export default ButtonSmall
