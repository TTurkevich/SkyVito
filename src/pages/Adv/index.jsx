/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import Menu from '../../components/Menu'
import Button from '../../components/Ui/Button'
import HeadingSecondary from '../../components/HeadingSecondary'
import Footer from '../../components/Footer'
import { Loader } from '../../components/Loader'
import Message from '../../components/Message'
import Modal from '../../components/modal/Modal'
import AdvHeader from '../../modules/AdvHeader'
import ImagesBlock from '../../modules/ImagesBlock'
import SellerBlock from '../../modules/SellerBlock'
import Comments from '../../modules/Comments'

import { useDeleteAdvMutation, useGetAdvQuery } from '../../redux/api/advApi'
import { selectUser } from '../../features/user/userSlice'
import { setModal } from '../../features/controls/controlsSlice'
import { selectComments } from '../../features/adv/advSlice'
import { setDate } from '../../helpers/helpers'

import classes from './index.module.scss'

const Adv = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { isLoading, isError, error, data: adv } = useGetAdvQuery(parseInt(id, 10))
  const [deleteAdv] = useDeleteAdvMutation()
  const user = useSelector(selectUser)
  const comments = useSelector(selectComments)
  const [seller, setSeller] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  /* useEffect(() => {
    if (isSuccess) {
      if (adv.user_id === user.id) {
        console.log('1', adv.user_id, user.id)
        setSeller(true)
      }
      if (adv.user_id !== user.id) {
        console.log('2', adv.user_id, user.id)
        setSeller(false)
      }
    }
    if (user) {
      if (isSuccess) {
        if (adv.user_id === user.id) {
          console.log('3', adv.user_id, user.id)
          setSeller(true)
        }
        if (adv.user_id !== user.id) {
          console.log('4', adv.user_id, user.id)
          setSeller(false)
        }
      }
    }
  }, [user, isSuccess]) */

  useEffect(() => {
    if (!user) {
      setSeller(false)
    }
    if (user && adv) {
      if (adv.user_id === user.id) {
        setSeller(true)
      } else setSeller(false)
    }
  }, [adv, user])

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

  const handleClick = (e) => {
    dispatch(setModal(e.target.id))
    setOpenModal(true)
  }

  const handleDeleteAdv = () => {
    deleteAdv(id)
    navigate('/')
  }

  const setSellerPhone = () => {
    if (adv.user.phone === null) {
      return `${'Нет телефона'}`
    }
    return adv.user.phone
  }

  const openPhone = () => {
    setShowPhone(!showPhone)
  }

  return (
    <>
      <AdvHeader className={classes.header} setOpenModal={setOpenModal} />
      <main className={classes.main}>
        <div className={classes.container}>
          <Menu media={768} />
        </div>
        {adv === undefined ? (
          <Message text='Объявление не нашлось' />
        ) : (
          <>
            <div className={classes.artic}>
              <div className={cn(classes.articContent, classes.article)}>
                <div className={classes.left}>
                  <ImagesBlock adv={adv} />
                </div>
                <div className={classes.right}>
                  <div className={classes.block}>
                    <HeadingSecondary className={classes.itemName}>{adv.title}</HeadingSecondary>
                    <div className={classes.info}>
                      <p className={classes.date}>{setDate(adv.created_on)}</p>
                      <p className={classes.city}>{adv.user.city}</p>
                      <Comments id={id} setOpenModal={handleClick} />
                    </div>
                    <p className={classes.price}>{adv.price} ₽</p>
                    {seller && (
                      <div className={classes.sellerButton}>
                        <Button id='editAdv' type='button' className={classes.btn} onClick={(e) => handleClick(e)}>
                          Редактировать
                        </Button>
                        <Button onClick={handleDeleteAdv} type='button' className={classes.btn}>
                          Снять с публикации
                        </Button>
                      </div>
                    )}
                    {!seller && (
                      <Button onClick={openPhone} type='button' className={classes.btn}>
                        <div>{showPhone ? <span>{setSellerPhone(adv.user.phone)}</span> : 'Показать телефон'}</div>
                      </Button>
                    )}
                    <SellerBlock id={id} adv={adv} />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.container}>
              <HeadingSecondary>Описание товара</HeadingSecondary>
              <div className={classes.content}>
                <p className={classes.text}>{adv.description}</p>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer className={classes.footer} setOpenModal={setOpenModal} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} adv={adv} comments={comments} id={id} />
    </>
  )
}

export default Adv
