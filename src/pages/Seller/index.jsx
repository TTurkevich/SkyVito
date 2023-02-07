import { useSelector } from 'react-redux'
import { useState } from 'react'

import AdvHeader from '../../modules/AdvHeader'
import SellerGoods from '../../modules/SellerGoods'
import Button from '../../components/Ui/Button'
import Heading from '../../components/HeadingMain'
import HeadingSecondary from '../../components/HeadingSecondary'
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'
import Modal from '../../components/modal/Modal'

import { SERVER_PATH } from '../../redux/api/apiConst'
import { selectCurrentAdv } from '../../features/adv/advSlice'

import classes from './index.module.scss'

const Seller = () => {
  const [openModal, setOpenModal] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const { user } = useSelector(selectCurrentAdv)

  const setSellerPhone = () => {
    if (user.phone === null) {
      return `${'Нет телефона'}`
    }
    return user.phone
  }

  const openPhone = () => {
    setShowPhone(!showPhone)
  }

  return (
    <>
      <AdvHeader setOpenModal={setOpenModal} className={classes.header} />
      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.centerBlock}>
            <Menu media={620} />
            <Heading>Профиль продавца</Heading>
            <div className={classes.author}>
              <div className={classes.content}>
                <div className={classes.seller}>
                  <div className={classes.left}>
                    <div className={classes.authorImg}>
                      {user.avatar ? <img src={`${SERVER_PATH}/${user.avatar}`} alt='' /> : null}
                    </div>
                  </div>
                  <div className={classes.right}>
                    <p className={classes.name}>{user.name}</p>
                    <p className={classes.city}>{user.city}</p>
                    <p className={classes.about}>{`Продает товары с ${user.sells_from}`}</p>
                    <Button onClick={openPhone} type='button' className={classes.btn}>
                      <div>{showPhone ? <span>{setSellerPhone(user.phone)}</span> : 'Показать телефон'}</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <HeadingSecondary>Товары продавца</HeadingSecondary>
          </div>
          <SellerGoods id={user.id} />
        </div>
      </main>
      <Footer className={classes.footer} setOpenModal={setOpenModal} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}

export default Seller
