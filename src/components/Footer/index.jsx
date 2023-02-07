import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { selectUser } from '../../features/user/userSlice'
import { setModal } from '../../features/controls/controlsSlice'

import classes from './index.module.scss'

const Footer = ({ className, setOpenModal }) => {
  const route = document.location.pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const handleClick = (id) => {
    if (id === 'profile') {
      if (route === '/profile') {
        dispatch(setModal(''))
        setOpenModal(false)
      } else {
        dispatch(setModal(''))
        navigate('/profile')
      }
    } else {
      dispatch(setModal(id))
      setOpenModal(true)
    }
  }

  const goMain = () => {
    dispatch(setModal(''))
    setOpenModal(false)
    if (route !== '/') {
      navigate('/')
    }
  }

  return (
    <footer className={cn(classes.footer, className)}>
      <div className={classes.container}>
        <div className={classes.img}>
          <button type='button' onClick={goMain}>
            <img src='/images/icon_01.png' alt='home' />
          </button>
        </div>
        <div className={classes.img}>
          <button type='button' id={user ? 'createAdv' : 'login'} onClick={(e) => handleClick(e.target.id)}>
            <img id={user ? 'createAdv' : 'login'} src='/images/icon_02.png' alt='plus' />
          </button>
        </div>
        <div className={classes.img}>
          <button type='button' id={user ? 'profile' : 'login'} onClick={(e) => handleClick(e.target.id)}>
            <img id={user ? 'profile' : 'login'} src='/images/icon_03.png' alt='profile' />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
