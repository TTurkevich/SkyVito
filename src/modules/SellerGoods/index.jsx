import { useSelector } from 'react-redux'
import Cards from '../../components/Cards'
import { selectAllAdv } from '../../features/adv/advSlice'

const SellerGoods = ({ id }) => {
  const allGoods = useSelector(selectAllAdv)

  const sellerGoods = allGoods.filter((obj) => {
    return Object.keys(obj).some((key) => {
      return obj[key] === id
    })
  })

  return <Cards adv={sellerGoods} />
}

export default SellerGoods
