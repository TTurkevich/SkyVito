import cn from 'classnames'
import classes from './index.module.scss'

const InputEmail = ({ className, register, errors }) => {
  return (
    <>
      <input
        className={cn(classes.input, className)}
        type='email'
        name='email'
        placeholder='email'
        {...register('email', {
          required: 'Обязательно',
          validate: (value) => {
            return (
              [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]/].every((pattern) => pattern.test(value)) ||
              'Проверьте правильность ввода почты'
            )
          },
        })}
      />
      <span className={errors.email ? classes.error : classes.valid}>{errors.email?.message}</span>
    </>
  )
}

export default InputEmail
