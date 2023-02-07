import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Cards from '../../components/Cards'
import { Loader } from '../../components/Loader'
import { useGetMeAllAdvQuery } from '../../redux/api/advApi'

const UserGoods = () => {
  const { isLoading, isError, error, data: adv } = useGetMeAllAdvQuery()

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

  return <Cards adv={adv} />
}

export default UserGoods
