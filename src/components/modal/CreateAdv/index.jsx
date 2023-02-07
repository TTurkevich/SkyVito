import cn from 'classnames'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { array, object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, Controller } from 'react-hook-form'

import { useCreateAdvMutation, useCreateAdvNoImgMutation } from '../../../redux/api/advApi'
import { setModal } from '../../../features/controls/controlsSlice'

import Button from '../../Ui/Button'
import { Loader } from '../../Loader'
import FileUpload from '../../Ui/FileUpload'
import ModalHeading from '../../ModalHeading'

import classes from './index.module.scss'

const createAdvSchema = object({
  title: string().min(1, 'Введите заголовок'),
  description: string().min(1, 'Добавьте описание').max(50),
  price: string().min(1, 'Укажите цену'),
  files: array(z.instanceof(File)).optional(),
})

const CreateAdv = ({ setOpenModal }) => {
  const dispatch = useDispatch()
  const methods = useForm({
    resolver: zodResolver(createAdvSchema),
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods

  const [createAdv, { isLoading, isError, error, isSuccess }] = useCreateAdvMutation()
  const [
    createAdvNoImg,
    { isError: createAdvNoImgIsError, isLoading: createAdvNoImgIsLoading, isSuccess: createAdvNoImgIsSuccess },
  ] = useCreateAdvNoImgMutation()

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
    if (isSuccess || createAdvNoImgIsSuccess) {
      toast.success('Объявление создано успешно')
      dispatch(setModal(''))
      setOpenModal(false)
    }

    if (isError || createAdvNoImgIsError) {
      if (error.data.detail) {
        toast.error(error.data.detail, {
          position: 'top-right',
        })
      } else {
        toast.error('kkk', {
          position: 'top-right',
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, createAdvNoImgIsError, createAdvNoImgIsLoading])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onCreateAdv = (values) => {
    const { title, description, price, files } = values
    const query = `?title=${title}&description=${description}&price=${Number(price)}`

    const formData = new FormData()
    if (files) {
      values.files.forEach((el) => formData.append('files', el))
    }
    const data = {
      query,
      formData,
    }

    if (!files) {
      createAdvNoImg(values)
    } else createAdv(data)
  }

  return (
    <FormProvider {...methods}>
      <ModalHeading>Новое объявление</ModalHeading>
      <form key={2} className={classes.formNewArt} onSubmit={handleSubmit(onCreateAdv)} noValidate autoComplete='off'>
        <div className={classes.formBlock}>
          <label className={classes.label} htmlFor='title'>
            Название
          </label>
          <Controller
            name='title'
            control={control}
            defaultValue=''
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
            defaultValue=''
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
          <FileUpload limit={5} name='files' multiple />
        </div>
        <div className={cn(classes.formBlock, classes.blockPrice)}>
          <label htmlFor='price'>Цена</label>
          <Controller
            name='price'
            control={control}
            defaultValue=''
            render={({ field }) => <input {...field} className={classes.inputPrice} />}
          />
          <div className={classes.inputPriceCover} />
        </div>
        <Button type='submit' className={classes.btn} id='btnPublish'>
          {isLoading ? <Loader /> : 'Опубликовать'}
        </Button>
      </form>
    </FormProvider>
  )
}

export default CreateAdv
