/* eslint-disable no-shadow */
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useController, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ReactComponent as CameraIcon } from '../../../assets/icons/camera.svg'
import { selectUser } from '../../../features/user/userSlice'
import { SERVER_PATH } from '../../../redux/api/apiConst'

import classes from './index.module.scss'

const Avatar = ({ name }) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const { field } = useController({ name, control })
  const [selectedFile, setSelectedFile] = useState(null)
  const [singleFile, setSingleFile] = useState([])
  const [preview, setPreview] = useState(null)
  const { avatar } = useSelector(selectUser)

  useEffect(() => {
    const objectUrl = selectedFile && URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    if (errors[name]) toast.error(errors[name].message)
  }, [errors])

  const onFileDrop = useCallback(
    (e) => {
      const { target } = e
      if (!target.files) return
      setSelectedFile(target.files[0])

      const newFile = Object.values(target.files).map((file) => file)
      if (singleFile.length >= 1) toast.error('Только одно изображение')
      const updatedSingleList = [...singleFile, ...newFile]
      setSingleFile(updatedSingleList)
      field.onChange(updatedSingleList[0])
    },
    [field, selectedFile],
  )

  const userAvatar = () => {
    if (avatar && !preview) {
      return <img src={`${SERVER_PATH}/${avatar}`} alt='' />
    }
    if (preview) {
      return <img src={preview} alt='' />
    }
    return <CameraIcon />
  }

  useEffect(() => {
    if (isSubmitting) {
      setSelectedFile(null)
    }
  }, [isSubmitting])

  return (
    <>
      <div className={classes.img}>{userAvatar()}</div>
      <Controller
        name={name}
        control={control}
        render={({ field: { name } }) => (
          <input
            name={name}
            className={classes.input}
            id='Avatar'
            type='file'
            onChange={onFileDrop}
            placeholder='Заменить'
            accept='image/jpg, image/png, image/jpeg'
          />
        )}
      />
      <label htmlFor='Avatar'>
        <div className={classes.changePhoto}>Заменить</div>
      </label>
    </>
  )
}

export default Avatar

/*
*
<div className={classes.img}>{preview ? <img src={preview} alt='' /> : <CameraIcon />}</div>

{avatar ? (
        <div className={classes.img}>
          <img src={`${SERVER_PATH}/${avatar}`} alt='' />
        </div>
      ) : (
        <div className={classes.img}>
          <CameraIcon />
        </div>
      )}
      {preview && (
        <div className={classes.img}>
          <img src={preview} alt='' />
        </div>
      )}

      onChange={(e) => setSelectedFile(e.target.files[0])}
      */
