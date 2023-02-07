/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom'
import { SERVER_PATH } from '../../redux/api/apiConst'
import { showMessageDateTime } from '../../helpers/helpers'

import classes from './index.module.scss'

const Card = ({ adv }) => {
  const navigate = useNavigate()

  const handleViewAdv = (id) => () => {
    navigate(`/adv/${id}`)
  }

  const newTitle = () => {
    return adv.title[0].toUpperCase() + adv.title.slice(1)
  }

  const imgSrc = () => {
    let src
    if (!adv.images.length) {
      src = '/images/imageNotFound.jpg'
    } else {
      src = `${SERVER_PATH}/${adv.images[0]?.url}`
    }
    return src
  }

  return (
    <div className={classes.item} onClick={handleViewAdv(adv.id)}>
      <div className={classes.card}>
        <div className={classes.image}>
          <img src={imgSrc()} alt='pic' />
        </div>
        <div className={classes.content}>
          <div className={classes.title}>
            <h3>{newTitle()}</h3>
          </div>
          <p className={classes.price}>{adv.price}&nbsp;₽</p>
          <p className={classes.place}>{adv.user.city}</p>
          <p className={classes.date}>{showMessageDateTime(adv.created_on)}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
