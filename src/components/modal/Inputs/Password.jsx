import cn from 'classnames'
import classes from './index.module.scss'

const InputPassword = ({ className, register, errors, name, placeholder }) => {
  return (
    <>
      <input
        className={cn(classes.input, className)}
        type='password'
        name={name}
        placeholder={placeholder}
        {...register(`${name}`, {
          required: 'Обязательно',
          minLength: {
            value: 8,
            message: 'Минимальная длина 8',
          },
          validate: (value) => {
            return (
              [/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&*]/].every((pattern) =>
                pattern.test(value),
              ) || 'Должен включать одну букву на латинице , число и спецсимвол!'
            )
          },
        })}
      />
      <span className={errors[name] ? classes.error : classes.valid}>{errors[name]?.message}</span>
    </>
  )
}

export default InputPassword
