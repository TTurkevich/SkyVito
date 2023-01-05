import cn from 'classnames'

import HeadingSecondary from '../../HeadingSecondary'
import ButtonSmall from '../../Ui/ButtonSmall'

import classes from './styles/index.module.scss'

const newAdd = () => {
  return (
    <div className={classes.container}>
      <div className={classes.block}>
        <div className={classes.content}>
          <HeadingSecondary className={classes.title}>Новое объявление</HeadingSecondary>
          <div className={classes.btnClose}>
            <div className={classes.btnCloseLine} />
          </div>
          <form className={classes.formNewArt} id='formNewArt' action='#'>
            <div className={classes.formBlock}>
              <label htmlFor='name'>Название</label>
              <input className={classes.input} type='text' name='name' id='formName' placeholder='Введите название' />
            </div>
            <div className={classes.formBlock}>
              <label htmlFor='text'>Описание</label>
              <textarea
                className={classes.area}
                name='text'
                id='formArea'
                cols='auto'
                rows='10'
                placeholder='Введите описание'
              />
            </div>
            <div className={classes.formBlock}>
              <p className={classes.text}>
                Фотографии товара<span>не более 5 фотографий</span>
              </p>
              <div className={classes.barImg}>
                <div className={classes.img}>
                  <img src='' alt='' />
                  <div className={classes.imgCover} />
                </div>
                <div className={classes.img}>
                  <img src='' alt='' />
                  <div className={classes.imgCover} />
                </div>
                <div className={classes.img}>
                  <div className={classes.imgCover} />
                  <img src='' alt='' />
                </div>
                <div className={classes.img}>
                  <div className={classes.imgCover} />
                  <img src='' alt='' />
                </div>
                <div className={classes.img}>
                  <div className={classes.imgCover} />
                  <img src='' alt='' />
                </div>
              </div>
            </div>
            <div className={cn(classes.formBlock, classes.blockPrice)}>
              <label htmlFor='price'>Цена</label>
              <input className={classes.inputPrice} type='text' name='price' id='formName' />
              <div className={classes.inputPriceCover} />
            </div>
            <ButtonSmall type='submit' className={classes.btn} id='btnPublish'>
              Опубликовать
            </ButtonSmall>
          </form>
        </div>
      </div>
    </div>
  )
}

export default newAdd
