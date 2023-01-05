import cn from 'classnames'

import classes from './index.module.scss'

const InputNoValid = ({ className, name, placeholder, register }) => {
  return (
    <input
      className={cn(classes.input, classes.text, className)}
      type='text'
      name={name}
      placeholder={placeholder}
      {...register(`${name}`)}
    />
  )
}

export default InputNoValid
