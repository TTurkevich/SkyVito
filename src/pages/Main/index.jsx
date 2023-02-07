import { useState } from 'react'

import MainHeader from '../../modules/MainHeader'
import AllGoods from '../../modules/AllGoods'
import Heading from '../../components/HeadingMain'
import Search from '../../components/Search'
import Footer from '../../components/Footer'
import Modal from '../../components/modal/Modal'

import classes from './index.module.scss'

const Main = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <MainHeader setOpenModal={setOpenModal} />
      <main className={classes.main}>
        <Search media={620} />
        <div className={classes.container}>
          <Heading className={classes.heading}>Объявления</Heading>
          <AllGoods />
        </div>
      </main>
      <Footer className={classes.footer} setOpenModal={setOpenModal} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}

export default Main
