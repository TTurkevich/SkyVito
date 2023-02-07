import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import ButtonWithBorder from '../../components/Ui/ButtonWithBorder'

import { setModal } from '../../features/controls/controlsSlice'
import { selectUser } from '../../features/user/userSlice'

import classes from './index.module.scss'

const MainHeader = ({ setOpenModal }) => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(setModal(id))
    setOpenModal(true)
  }

  return (
    <Header className={classes.header}>
      <>
        {!user && (
          <ButtonWithBorder id='login' onClick={(e) => handleClick(e.target.id)}>
            Вход в личный кабинет
          </ButtonWithBorder>
        )}
        {user && (
          <ButtonWithBorder id='profile' onClick={() => navigate('/profile')}>
            Личный кабинет
          </ButtonWithBorder>
        )}
      </>
    </Header>
  )
}

export default MainHeader
