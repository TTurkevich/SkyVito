import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { string, object } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { setModal } from '../../../features/controls/controlsSlice'
import { useLoginUserMutation } from '../../../redux/api/authApi'

import FormInput from './FormInput'
import Button from '../../Ui/Button'

import classes from './index.module.scss'

const loginSchema = object({
  email: string().min(1, 'Обязательно почта').email('Email неверный'),
  password: string()
    .min(1, 'Обязательно пароль')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .max(18, 'Пароль не должен быть больше 18 символов'),
})

const LoginPage = ({ setOpenModal, openRegisterPage }) => {
  const defaultValues = {
    email: '',
    password: '',
  }

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  const [loginUser, { isLoading, isSuccess, error, isError }] = useLoginUserMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false)
      toast.success('Выполнен вход')
      dispatch(setModal(''))
      navigate('/profile')
    }

    if (isError) {
      if (error.data.detail) {
        toast.error(error.data.detail, {
          position: 'top-right',
        })
      } else {
        toast.error(error.data.message, {
          position: 'top-right',
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler = (values) => {
    loginUser(values)
  }

  const openRegisterModal = () => {
    dispatch(setModal('register'))
    if (openRegisterPage) {
      openRegisterPage()
    }
  }

  return (
    <FormProvider {...methods}>
      <div className={cn(classes.logo, classes.logoLogin)}>
        <button type='button' onClick={() => navigate('/')}>
          <img src='../images/logo_modal.png' alt='logo' />
        </button>
      </div>
      <form
        className={cn(classes.form, classes.formLogin)}
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        autoComplete='off'
      >
        <FormInput name='email' required type='email' placeholder='Почта' />
        <FormInput name='password' required type='password' placeholder='Пароль' />
        <Button className={classes.btn} type='submit' id='btnEnter'>
          Войти
        </Button>
        <Button type='button' className={cn(classes.btn, classes.btnSignup)} id='SignUp' onClick={openRegisterModal}>
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  )
}

export default LoginPage
