import cn from 'classnames'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectModal, setModal } from '../../../features/controls/controlsSlice'

import Reviews from '../Reviews'
import EditAdv from '../EditAdv'
import CreateAdv from '../CreateAdv'
import LoginPage from '../auth/Login'
import MobHeader from '../../MobHeader'
import RegisterPage from '../auth/Register'
import { ReactComponent as Cross } from '../../../assets/icons/cross.svg'
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'

import classes from './index.module.scss'

const Modal = ({ openModal, setOpenModal, adv, comments, id }) => {
  const dispatch = useDispatch()
  const modal = useSelector(selectModal)

  useEffect(() => {
    if (modal === '') {
      setOpenModal(false)
    }
  }, [modal, setOpenModal])

  if (!openModal) return null

  return createPortal(
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <MobHeader className={classes.header} />
        <div className={classes.close}>
          <button
            type='button'
            className={cn(classes.cross, classes.btnClose)}
            onClick={() => {
              setOpenModal(false)
              dispatch(setModal(''))
            }}
          >
            <Cross />
          </button>
          <button
            type='button'
            className={cn(classes.arrow, classes.btnClose)}
            onClick={() => {
              setOpenModal(false)
              dispatch(setModal(''))
            }}
          >
            <Arrow />
          </button>
        </div>
        <div className={classes.content}>
          {modal === 'login' && <LoginPage setOpenModal={setOpenModal} />}
          {modal === 'register' && <RegisterPage />}
          {modal === 'createAdv' && <CreateAdv setOpenModal={setOpenModal} />}
          {modal === 'editAdv' && <EditAdv setOpenModal={setOpenModal} adv={adv} />}
          {modal === 'reviews' && <Reviews setOpenModal={setOpenModal} comments={comments} id={id} />}
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  )
}

export default Modal
