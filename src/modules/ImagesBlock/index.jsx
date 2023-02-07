/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { SERVER_PATH } from '../../redux/api/apiConst'
import classes from './index.module.scss'

const ImagesBlock = ({ adv }) => {
  const images = adv?.images
  const [image, setImage] = useState('/images/imageNotFound.jpg')

  useEffect(() => {
    if (adv.images.length > 0) {
      setImage(`${SERVER_PATH}/${images[0].url}`)
    } else setImage('/images/imageNotFound.jpg')
  }, [adv])

  const changeImage = (e) => {
    setImage(e.target.src)
  }

  return (
    <div className={classes.fillImg}>
      <div className={classes.img}>
        <img src={image} alt='img' />
      </div>
      {images.length > 0 ? (
        <>
          <div className={classes.imgBar}>
            {adv.images.map((item) => (
              <div onClick={(e) => changeImage(e)} key={item.id} className={classes.imgBarDiv}>
                <img src={`${SERVER_PATH}/${item.url}`} alt='img' />
              </div>
            ))}
          </div>
          <div className={cn(classes.imgBar, classes.imgBarMob)}>
            {adv.images.map((item) => {
              return (
                <div
                  key={item.id}
                  id={`${SERVER_PATH}/${item.url}`}
                  className={classes.imgBarMobCircle}
                  onClick={() => setImage(`${SERVER_PATH}/${item.url}`)}
                />
              )
            })}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ImagesBlock
