import cn from 'classnames'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { string, object } from 'zod'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, Controller } from 'react-hook-form'

import Button from '../../Ui/Button'
import ModalHeading from '../../ModalHeading'

import { SERVER_PATH } from '../../../redux/api/apiConst'
import { selectUser } from '../../../features/user/userSlice'
import { useCreateCommentMutation } from '../../../redux/api/advApi'
import { showMessageDateTime } from '../../../helpers/helpers'

import classes from './index.module.scss'

const reviewsSchema = object({
  text: string().min(5, 'Комментарий должен быть не менее 5 символов'),
})

const Reviews = ({ id, comments }) => {
  const defaultValues = {
    text: '',
  }
  const methods = useForm({
    resolver: zodResolver(reviewsSchema),
    defaultValues,
  })
  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods

  const [createComment, { isLoading, isError, error }] = useCreateCommentMutation()
  const user = useSelector(selectUser)
  const [disabled, enabled] = useState(true)

  useEffect(() => {
    if (user) {
      enabled(false)
    }
  }, [user])

  useEffect(() => {
    if (errors.text) {
      toast.error(errors.text.message, {
        position: 'top-right',
      })
    }
  }, [errors])

  useEffect(() => {
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

  const onSubmit = (values) => {
    if (!user) {
      return
    }
    const data = {
      text: values.text,
    }
    createComment({ id, data })
  }

  return (
    <FormProvider {...methods}>
      <ModalHeading>Отзывы о товаре</ModalHeading>
      <form className={classes.formNewArt} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off' action='#'>
        <div className={classes.formBlock}>
          <label className={classes.label} htmlFor='text'>
            Добавить отзыв
          </label>
          {user ? (
            <Controller
              name='text'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <textarea
                  {...field}
                  className={classes.area}
                  id='text'
                  name='text'
                  cols='auto'
                  rows='5'
                  placeholder='Введите описание'
                />
              )}
            />
          ) : (
            <p>Только зарегистрированные пользователи могут оставлять комментарии</p>
          )}
        </div>
        <Button disabled={disabled} type='submit' className={classes.btn} id='btnPublish'>
          Опубликовать
        </Button>
      </form>
      <div className={classes.reviews}>
        {comments.length > 0 &&
          comments.map((item) => (
            <div key={item.id} className={classes.review}>
              <div className={classes.item}>
                <div className={classes.left}>
                  <div className={classes.img}>
                    {item.author.avatar ? <img src={`${SERVER_PATH}/${item.author.avatar}`} alt='' /> : null}
                  </div>
                </div>
                <div className={classes.right}>
                  <p className={cn(classes.name, classes.font)}>
                    {item.author.name ? item.author.name : 'Аноним'}
                    <span>{showMessageDateTime(item.created_on)}</span>
                  </p>
                  <h5 className={cn(classes.add, classes.font)}>Комментарий</h5>
                  <p className={cn(classes.text, classes.font)}>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </FormProvider>
  )
}

export default Reviews
