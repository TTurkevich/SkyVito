import { useDispatch } from 'react-redux'

import Header from '../../components/Header'
import LogoMob from '../../components/Ui/Logo/LogoMob'
import ButtonWithBorder from '../../components/Ui/ButtonWithBorder'

import { logout } from '../../features/user/userSlice'
import { setModal } from '../../features/controls/controlsSlice'

import classes from './index.module.scss'

const ProfileHeader = ({ setOpenModal }) => {
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(setModal(id))
    setOpenModal(true)
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <Header className={classes.header}>
      <>
        <LogoMob />
        <ButtonWithBorder id='createAdv' onClick={(e) => handleClick(e.target.id)}>
          Разместить объявление
        </ButtonWithBorder>
        <ButtonWithBorder onClick={logoutUser}>Выйти</ButtonWithBorder>
      </>
    </Header>
  )
}

export default ProfileHeader
