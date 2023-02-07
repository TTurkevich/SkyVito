import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGetCommentsQuery } from '../../redux/api/advApi'

import { Loader } from '../../components/Loader'

import classes from './index.module.scss'

const Comments = ({ id, setOpenModal }) => {
  const { isLoading, isError, error, data: comments } = useGetCommentsQuery(id)

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

  if (isLoading) {
    return <Loader />
  }

  return (
    <button id='reviews' type='button' className={classes.link} onClick={(e) => setOpenModal(e)}>
      {comments.length > 0 ? `${comments.length} отзывов` : 'Добавить комментарий'}
    </button>
  )
}

export default Comments
