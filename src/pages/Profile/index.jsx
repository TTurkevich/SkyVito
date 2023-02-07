import { useSelector } from 'react-redux'
import { useState } from 'react'
import ProfileHeader from '../../modules/ProfileHeader'

import Heading from '../../components/HeadingMain'
import HeadingSecondary from '../../components/HeadingSecondary'
import Menu from '../../components/Menu'
import UserProfile from '../../components/UserProfile'
import UserGoods from '../../modules/UserGoods'
import Footer from '../../components/Footer'
import Modal from '../../components/modal/Modal'

import { selectUser } from '../../features/user/userSlice'

import classes from './index.module.scss'

const Profile = () => {
  const [openModal, setOpenModal] = useState(false)
  const { name } = useSelector(selectUser)
  const user = useSelector(selectUser)

  const welcome = name ? `Здравствуйте, ${name}!` : 'Здравствуйте, Аноним!'

  return (
    <>
      <ProfileHeader setOpenModal={setOpenModal} className={classes.header} />
      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.centerBlock}>
            <Menu media={620} />
            <Heading>{welcome}</Heading>
            <UserProfile user={user} />
            <HeadingSecondary>Мои товары</HeadingSecondary>
          </div>
          <UserGoods />
        </div>
      </main>
      <Footer className={classes.footer} setOpenModal={setOpenModal} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}

export default Profile
