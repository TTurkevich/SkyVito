import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'
import { Controller, useController, useFormContext } from 'react-hook-form'

import { ReactComponent as UploadImage } from '../../assets/icons/upload.svg'
import { useDeleteAdvImageMutation } from '../../redux/api/advApi'
import { SERVER_PATH } from '../../redux/api/apiConst'

import classes from './index.module.scss'

const EditAdvImage = ({ limit, multiple, name, adv }) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const { field } = useController({ name, control })

  const { images } = adv
  const [limitUploadImg, setLimitUploadImg] = useState(limit)
  const [preview, setPreview] = useState([])
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    setLimitUploadImg(limit - images.length - fileList.length)
  }, [images, fileList])

  useEffect(() => {
    if (fileList.length === 0) {
      setPreview([])
    }
    const objectUrl = []
    fileList.forEach((image) => objectUrl.push(URL.createObjectURL(image)))
    setPreview(objectUrl)
  }, [fileList])

  useEffect(() => {
    if (errors[name]) toast.error('Добавьте фото')
  }, [errors])

  const [deleteAdvImage] = useDeleteAdvImageMutation()

  const handleDeleteImage = (id, urlImage) => () => {
    const query = `?file_url=${urlImage}`
    deleteAdvImage({ id, query })
  }

  const handleDeletePreview = (id) => () => {
    const copy = [...fileList]
    copy.splice(id, 1)
    setFileList(copy)
    setPreview(preview.slice(id, 1))
  }

  const onUploadFiles = useCallback(
    (e) => {
      const { target } = e
      if (!target.files) return
      if (target.files.length > limitUploadImg) {
        toast.error(`Не более ${limitUploadImg}, удалите лишние`)
        return
      }
      const newFiles = Object.values(target.files).map((file) => file)
      if (newFiles) {
        const updatedList = [...fileList, ...newFiles]
        setFileList(updatedList)
        field.onChange(updatedList)
      }
    },
    [field, fileList, limitUploadImg, preview],
  )

  useEffect(() => {
    if (isSubmitting) {
      setFileList([])
    }
  }, [isSubmitting])

  return (
    <div className={classes.barImages}>
      <div className={classes.barImage}>
        <Controller
          name={name}
          defaultValue=''
          control={control}
          // eslint-disable-next-line no-shadow
          render={({ field: { name } }) => (
            <input
              id='files'
              type='file'
              name={name}
              onChange={onUploadFiles}
              multiple={multiple}
              accept='image/jpg, image/png, image/jpeg'
              className={classes.input}
            />
          )}
        />
        <label className={classes.labelImg} htmlFor='files'>
          {images.map((item) => (
            <div key={item.id} id={item.id} className={classes.photo}>
              <button className={classes.btnClose} type='button' onClick={handleDeleteImage(item.ad_id, item.url)}>
                x
              </button>
              <img src={`${SERVER_PATH}/${item.url}`} alt='' />
            </div>
          ))}
          {preview.length > 0
            ? preview?.map((item, index) => (
                <div key={item} id={index} className={classes.photo}>
                  <button className={classes.btnClose} type='button' onClick={handleDeletePreview(index)}>
                    x
                  </button>
                  <img src={item} alt='' />
                </div>
              ))
            : null}
          {Array(limitUploadImg)
            .fill()
            .map((index) => {
              return (
                <div key={v4()} id={index} className={classes.photo}>
                  <UploadImage />
                </div>
              )
            })}
        </label>
      </div>
    </div>
  )
}

export default EditAdvImage
