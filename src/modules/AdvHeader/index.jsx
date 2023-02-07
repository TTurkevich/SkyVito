import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import LogoMob from '../../components/Ui/Logo/LogoMob'
import ButtonWithBorder from '../../components/Ui/ButtonWithBorder'

import { setModal } from '../../features/controls/controlsSlice'
import { selectUser } from '../../features/user/userSlice'

import classes from './index.module.scss'

const AdvHeader = ({ className, setOpenModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const handleClick = (id) => {
    dispatch(setModal(id))
    setOpenModal(true)
  }

  return (
    <Header className={cn(className, classes.header)}>
      <LogoMob />
      <ButtonWithBorder id={user ? 'createAdv' : 'login'} onClick={(e) => handleClick(e.target.id)}>
        Разместить объявление
      </ButtonWithBorder>
      {user ? (
        <ButtonWithBorder onClick={() => navigate('/profile')}>Личный кабинет</ButtonWithBorder>
      ) : (
        <ButtonWithBorder id='login' onClick={(e) => handleClick(e.target.id)}>
          Вход в личный кабинет
        </ButtonWithBorder>
      )}
    </Header>
  )
}

export default AdvHeader
