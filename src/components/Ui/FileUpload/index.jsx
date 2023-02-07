import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'
import { Controller, useController, useFormContext } from 'react-hook-form'

import { ReactComponent as UploadImage } from '../../../assets/icons/upload.svg'

import classes from './index.module.scss'

const FileUpload = ({ limit, multiple, name }) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const { field } = useController({ name, control })
  const [limitUploadImg, setLimitUploadImg] = useState(limit)
  const [preview, setPreview] = useState([])
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    setLimitUploadImg(limit - fileList.length)
  }, [fileList])

  useEffect(() => {
    if (fileList.length === 0) return
    const objectUrl = []
    fileList.forEach((image) => objectUrl.push(URL.createObjectURL(image)))
    setPreview(objectUrl)
  }, [fileList])

  useEffect(() => {
    if (errors[name]) toast.error('Добавьте фoто')
  }, [errors])

  const onUploadFiles = useCallback(
    (e) => {
      setFileList([])
      setPreview([])
      const { target } = e
      if (!target.files) return
      if (target.files.length > limitUploadImg) {
        toast.error(`Не более ${limitUploadImg}`)
        return
      }

      const newFiles = Object.values(target.files).map((file) => file)
      if (newFiles) {
        const updatedList = [...fileList, ...newFiles]
        setFileList(updatedList)
        field.onChange(updatedList)
      }
    },
    [field, fileList, limit, preview],
  )

  useEffect(() => {
    if (isSubmitting) {
      setFileList([])
    }
  }, [isSubmitting])

  const handleDeletePreview = (id) => () => {
    const copy = [...fileList]
    copy.splice(id, 1)
    setFileList(copy)
    setPreview(preview.slice(id, 1))
  }

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

export default FileUpload
