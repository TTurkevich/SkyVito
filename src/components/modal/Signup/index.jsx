import { useForm } from 'react-hook-form'

import Form from '../Form'
import InputEmail from '../Inputs/Email'
import InputNoValid from '../Inputs/InputNoValid'
import InputPassword from '../Inputs/Password'
import ButtonSmall from '../../Ui/ButtonSmall'

import classes from './index.module.scss'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputEmail register={register} errors={errors} />
      <InputPassword register={register} errors={errors} name='password' placeholder='Пароль' />
      <InputPassword register={register} errors={errors} name='passwordSecond' placeholder='Повторите пароль' />
      <InputNoValid register={register} name='firstName' placeholder='Имя (необязательно)' />
      <InputNoValid register={register} name='lastName' placeholder='Фамилия (необязательно)' />
      <InputNoValid register={register} name='city' placeholder='Город (необязательно)' />
      <ButtonSmall type='submit' className={classes.btn} id='SignUp'>
        Зарегистрироваться
      </ButtonSmall>
    </Form>
  )
}

export default Signup

/**
 * <div className={classes.container}>
      <div className={classes.block}>
        <form className={classes.form} id='formLogUp' action='#'>
          <div className={classes.logo}>
            <img src='../images/logo_modal.png' alt='logo' />
          </div>
          <input className={classes.input} type='text' name='login' id='loginReg' placeholder='email' />
          <input className={classes.input} type='password' name='password' id='passwordFirst' placeholder='Пароль' />
          <input
            className={classes.input}
            type='password'
            name='password'
            id='passwordSecond'
            placeholder='Повторите пароль'
          />
          <input
            className={classes.input}
            type='text'
            name='first-name'
            id='first-name'
            placeholder='Имя (необязательно)'
          />
          <input
            className={classes.input}
            type='text'
            name='first-last'
            id='first-last'
            placeholder='Фамилия (необязательно)'
          />
          <input className={classes.input} type='text' name='city' id='city' placeholder='Город (необязательно)' />
          <ButtonSmall className={classes.btn} id='SignUpEnter'>
            Зарегистрироваться
          </ButtonSmall>
        </form>
      </div>
    </div>
 */
