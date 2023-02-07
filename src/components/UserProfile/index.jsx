import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { string, object, z } from 'zod'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import Button from '../Ui/Button'
import Avatar from '../Ui/Avatar'
import HeadingSecondary from '../HeadingSecondary'

import { logout, selectUser } from '../../features/user/userSlice'
import { useUpdateAvatarMutation, useUpdateUserMutation } from '../../redux/api/userApi'

import classes from './index.module.scss'

const updateUserSchema = object({
  name: string().optional(),
  surname: string().optional(),
  city: string().optional(),
  phone: string().optional(),
  file: z.instanceof(File).optional(),
})

const UserProfile = () => {
  const dispatch = useDispatch()
  const [disabled, enabled] = useState(true)
  const { name, surname, phone, city } = useSelector(selectUser)

  const methods = useForm({
    resolver: zodResolver(updateUserSchema),
    mode: 'onChange',
    defaultValues: {
      name,
      surname,
      phone,
      city,
    },
  })

  const { handleSubmit, register, watch } = methods

  const [updateUser, { isLoading, isError, error, isSuccess }] = useUpdateUserMutation()
  const [updateAvatar] = useUpdateAvatarMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Данные пользователя обновлены', {
        position: 'top-right',
      })
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
  }, [isLoading])

  useEffect(() => {
    const subscription = watch(() => {
      enabled(false)
      return disabled
    })

    return () => subscription.unsubscribe()
  }, [watch, disabled])

  const onSubmitHandler = (values) => {
    const data = {
      name: values.name,
      surname: values.surname,
      city: values.city,
      phone: values.phone,
    }
    if (values.file) {
      const formData = new FormData()
      formData.append('file', values.file)
      updateAvatar(formData)
      updateUser(data)
    } else {
      updateUser(data)
    }

    enabled(true)
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <div className={classes.profile}>
      <div className={classes.content}>
        <HeadingSecondary>Настройки профиля</HeadingSecondary>
        <FormProvider {...methods}>
          <form className={classes.settings} onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete='off'>
            <div className={classes.left}>
              <Avatar name='file' />
            </div>
            <div className={classes.right}>
              <div className={classes.form}>
                <div className={classes.div}>
                  <label htmlFor='name'>Имя</label>
                  <input
                    className={classes.fName}
                    id='name'
                    name='name'
                    type='text'
                    // defaultValue={name}
                    placeholder=''
                    {...register('name')}
                  />
                </div>
                <div className={classes.div}>
                  <label htmlFor='surname'>Фамилия</label>
                  <input
                    className={classes.lName}
                    id='surname'
                    name='surname'
                    type='text'
                    // defaultValue={surname}
                    placeholder=''
                    {...register('surname')}
                  />
                </div>
                <div className={classes.div}>
                  <label htmlFor='city'>Город</label>
                  <input
                    className={classes.city}
                    id='city'
                    name='city'
                    type='text'
                    // defaultValue={city}
                    placeholder=''
                    {...register('city')}
                  />
                </div>
                <div className={classes.div}>
                  <label htmlFor='phone'>Телефон</label>
                  <input
                    className={classes.phone}
                    id='phone'
                    name='phone'
                    type='tel'
                    // defaultValue={phone}
                    placeholder=''
                    {...register('phone')}
                  />
                </div>
                <div className={classes.btnGroup}>
                  <Button className={classes.btn} type='submit' id='settingsBtn' disabled={disabled}>
                    Сохранить
                  </Button>
                  <Button id='logout' className={cn(classes.logout, classes.btn)} onClick={logoutUser}>
                    Выйти
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default UserProfile
