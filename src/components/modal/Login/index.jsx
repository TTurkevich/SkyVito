import cn from 'classnames'
import { useForm } from 'react-hook-form'

import Form from '../Form'
import InputEmail from '../Inputs/Email'
import InputPassword from '../Inputs/Password'
import ButtonSmall from '../../Ui/ButtonSmall'

import classes from './index.module.scss'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form enter='login' onSubmit={handleSubmit(onSubmit)}>
      <InputEmail className={classes.input} register={register} errors={errors} />
      <InputPassword
        className={classes.input}
        register={register}
        errors={errors}
        name='password'
        placeholder='Пароль'
      />
      <ButtonSmall className={classes.btn} type='submit' id='btnEnter'>
        Войти
      </ButtonSmall>
      <ButtonSmall type='button' className={cn(classes.btn, classes.btnSignup)} id='SignUp'>
        Зарегистрироваться
      </ButtonSmall>
    </Form>
  )
}

export default Login

/**
 * const Login = () => {
  return (
    <div className={classes.container}>
      <div className={classes.block}>
        <form className={classes.form} id='formLogUp' action='#'>
          <div className={classes.logo}>
            <img src='../images/logo_modal.png' alt='logo' />
          </div>
          <input className={classes.input} type='text' name='login' id='loginReg' placeholder='email' />
          <input className={classes.input} type='password' name='password' id='passwordFirst' placeholder='Пароль' />
          <ButtonSmall className={classes.btn} id='btnEnter'>
            Войти
          </ButtonSmall>
          <ButtonSmall className={cn(classes.btn, classes.btnSignup)} id='btnSignUp'>
            Зарегистрироваться
          </ButtonSmall>
        </form>
      </div>
    </div>
  )
}

export default Login
 */
