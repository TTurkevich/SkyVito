import classes from './index.module.scss'

const InputLogin = ({ register, errors }) => {
  return (
    <>
      <input
        className={classes.input}
        type='text'
        placeholder='Логин'
        {...register('username', {
          required: 'Обязательно',
          minLength: { value: 3, message: 'Минимальная длинна 3' },
          validate: (value) => {
            return [/[A-Za-z0-9]/].every((pattern) => pattern.test(value)) || 'Только буквы на латинице и цифры'
          },
        })}
      />
      <span className={classes.message}>{errors.username?.message}</span>
    </>
  )
}

export default InputLogin
