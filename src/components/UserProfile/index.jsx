import HeadingSecondary from '../HeadingSecondary'
import ButtonSmall from '../Ui/ButtonSmall'
import classes from './index.module.scss'

const UserProfile = () => {
  return (
    <div className={classes.profile}>
      <div className={classes.content}>
        <HeadingSecondary>Настройки профиля</HeadingSecondary>
        <div className={classes.settings}>
          <div className={classes.left}>
            <div className={classes.img}>
              <a href='/' target='_self'>
                <img src='#' alt='' />
              </a>
            </div>
            <a className={classes.changePhoto} href='/' target='_self'>
              Заменить
            </a>
          </div>
          <div className={classes.right}>
            <form className={classes.form} action='#'>
              <div className={classes.div}>
                <label htmlFor='fname'>Имя</label>
                <input className={classes.fName} id='fname' name='fname' type='text' value='' placeholder='Имя' />
              </div>

              <div className={classes.div}>
                <label htmlFor='lname'>Фамилия</label>
                <input
                  className={classes.lName}
                  id='lname'
                  name='lname'
                  type='text'
                  value='Городецкий'
                  placeholder=''
                />
              </div>

              <div className={classes.div}>
                <label htmlFor='city'>Город</label>
                <input
                  className={classes.city}
                  id='city'
                  name='city'
                  type='text'
                  value='Санкт-Петербург'
                  placeholder=''
                />
              </div>
              <div className={classes.div}>
                <label htmlFor='phone'>Телефон</label>
                <input
                  className={classes.phone}
                  id='phone'
                  name='phone'
                  type='tel'
                  value='89161234567'
                  placeholder='+79161234567'
                />
              </div>
              <div className={classes.button}>
                <ButtonSmall type='button' id='settingsBtn'>
                  Сохранить
                </ButtonSmall>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
