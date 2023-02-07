import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { string, object } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import { useRegisterUserMutation } from '../../../redux/api/authApi'
import { setModal } from '../../../features/controls/controlsSlice'

import FormInput from './FormInput'
import Button from '../../Ui/Button'

import classes from './index.module.scss'

const registerSchema = object({
  email: string().min(1, 'Обязательно введите email').email('Email неверный'),
  name: string().optional(),
  surname: string().optional(),
  city: string().optional(),
  password: string()
    .min(1, 'Обязательно введите пароль')
    .min(8, 'Пароль не должен быть меньше 8 символов')
    .max(18, 'Пароль не должен быть больше 18 символов'),
  passwordConfirm: string().min(1, { message: 'Повторите пароль' }).max(18),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Пароли не совпадают',
})

const RegisterPage = () => {
  const dispatch = useDispatch()
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      surname: '',
      city: '',
      password: '',
      email: '',
      passwordConfirm: '',
    },
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Вы зарегистрированы')
      dispatch(setModal('login'))
    }

    if (isError) {
      if (error.data.details) {
        if (error.data.details.includes('UNIQUE constraint failed: user.email')) {
          toast.error('Email уже занят', {
            position: 'top-right',
          })
        }
      } else {
        toast.error(error.data.message, {
          position: 'top-right',
        })
      }
    }
  }, [isLoading, isSuccess])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful])

  const onSubmitHandler = (values) => {
    const data = {
      name: values.name,
      email: values.email,
      city: values.city,
      password: values.password,
      role: 'user',
      surname: values.surname,
    }
    registerUser(data)
  }

  return (
    <FormProvider {...methods}>
      <div className={classes.logo}>
        <button type='button' onClick={() => navigate('/')}>
          <img src='../images/logo_modal.png' alt='logo' />
        </button>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete='off'>
        <FormInput name='email' required type='email' placeholder='Почта' />
        <FormInput name='password' required type='password' placeholder='Пароль' />
        <FormInput name='passwordConfirm' required type='password' placeholder='Повторите пароль' />
        <FormInput name='name' required={false} type='text' placeholder='Имя (необязательно)' />
        <FormInput name='surname' required={false} type='text' placeholder='Фамилия (необязательно)' />
        <FormInput name='city' required={false} type='text' placeholder='Город (необязательно)' />
        <Button type='submit' className={classes.btn} id='SignUp'>
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  )
}

export default RegisterPage
