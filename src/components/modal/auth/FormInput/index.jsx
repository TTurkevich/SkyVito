import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

import classes from './index.module.scss'

const FormInput = ({ name, placeholder, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    if (errors[name]) toast.error(errors[name].message)
  }, [errors])

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => <input className={classes.input} {...otherProps} {...field} placeholder={placeholder} />}
    />
  )
}

export default FormInput
