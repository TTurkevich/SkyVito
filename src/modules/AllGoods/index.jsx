import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import Cards from '../../components/Cards'
import { Loader } from '../../components/Loader'

import { useGetAllAdvQuery } from '../../redux/api/advApi'
import { selectVisibleAdv } from '../../features/adv/advSlice'

const AllGoods = () => {
  const { isLoading, isError, error } = useGetAllAdvQuery()
  const visibleAdv = useSelector(selectVisibleAdv)

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
  return <Cards adv={visibleAdv} />
}

export default AllGoods
