import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { array, object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, Controller } from 'react-hook-form'

import { Loader } from '../../Loader'
import ButtonSmall from '../../Ui/Button'
import ModalHeading from '../../ModalHeading'
import EditAdvImage from '../../../modules/EditAdvImage'

import { setModal } from '../../../features/controls/controlsSlice'
import { useUpdateAdvImageMutation, useUpdateAdvMutation } from '../../../redux/api/advApi'

import classes from './index.module.scss'

const updateAdvSchema = object({
  title: string().min(1, 'Слишком короткий заголовок').optional(),
  description: string().min(1, 'Слишком короткое описание').max(50).optional(),
  price: z.number().min(1, 'Добавьте цену').optional(),
  files: array(z.instanceof(File)).optional(),
})

const EditAdv = ({ adv, setOpenModal }) => {
  const [updateAdv, { isLoading, isError, error, isSuccess }] = useUpdateAdvMutation()
  const dispatch = useDispatch()
  const [disabled, enabled] = useState(true)
  const methods = useForm({
    resolver: zodResolver(updateAdvSchema),
  })

  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful, errors },
  } = methods

  useEffect(() => {
    const subscription = watch(() => {
      enabled(false)
      return disabled
    })

    return () => subscription.unsubscribe()
  }, [watch, disabled])

  useEffect(() => {
    if (errors.title) {
      toast.error(errors.title.message, {
        position: 'top-right',
      })
    }
    if (errors.description) {
      toast.error(errors.description.message, {
        position: 'top-right',
      })
    }
    if (errors.price) {
      toast.error(errors.price.message, {
        position: 'top-right',
      })
    }
  }, [errors])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Объявление создано успешно')
      setOpenModal(false)
      dispatch(setModal(''))
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

  const [updateAdvImage] = useUpdateAdvImageMutation()

  const onSubmitAdv = (values) => {
    const data = {
      title: values.title,
      description: values.description,
      price: Number(values.price),
    }
    updateAdv({ id: adv.id, adv: data })
    if (values.files) {
      values.files.forEach((el) => {
        const formData = new FormData()
        formData.append('file', el)
        const dataN = {
          id: adv.id,
          file: formData,
        }
        updateAdvImage(dataN)
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <ModalHeading>Редактировать объявление</ModalHeading>
      <form key={2} className={classes.formNewArt} onSubmit={handleSubmit(onSubmitAdv)} noValidate autoComplete='off'>
        <div className={classes.formBlock}>
          <label className={classes.label} htmlFor='title'>
            Название
          </label>
          <Controller
            name='title'
            control={control}
            defaultValue={adv ? adv.title : ''}
            render={({ field }) => (
              <input {...field} className={classes.input} type='text' id='formName' placeholder='Введите название' />
            )}
          />
        </div>
        <div className={classes.formBlock}>
          <label htmlFor='description'>Описание</label>
          <Controller
            name='description'
            control={control}
            defaultValue={adv ? adv.description : ''}
            render={({ field }) => (
              <textarea
                {...field}
                className={classes.area}
                id='formArea'
                cols='auto'
                rows='10'
                placeholder='Введите описание'
              />
            )}
          />
        </div>
        <div className={classes.formBlock}>
          <p className={classes.text}>
            Фотографии товара<span>не более 5 фотографий</span>
          </p>
          <EditAdvImage limit={5} name='files' multiple adv={adv} />
        </div>
        <div className={cn(classes.formBlock, classes.blockPrice)}>
          <label htmlFor='price'>Цена</label>
          <Controller
            name='price'
            control={control}
            defaultValue={adv ? adv.price : ''}
            render={({ field }) => <input {...field} className={classes.inputPrice} />}
          />
          <div className={classes.inputPriceCover} />
        </div>
        <ButtonSmall disabled={disabled} type='submit' className={classes.btn} id='btnPublish'>
          {isLoading ? <Loader /> : 'Сохранить'}
        </ButtonSmall>
      </form>
    </FormProvider>
  )
}

export default EditAdv
