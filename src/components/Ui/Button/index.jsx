/* eslint-disable react/button-has-type */
import cn from 'classnames'

import classes from './index.module.scss'

const Button = ({ children, className, type, ...attrs }) => {
  return (
    <button {...attrs} type={type} className={cn(classes.button, className)}>
      {children}
    </button>
  )
}

export default Button
