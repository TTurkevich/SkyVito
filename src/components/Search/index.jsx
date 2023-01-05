import ButtonSmall from '../Ui/ButtonSmall'
import Logo from '../Ui/Logo/Logo'
import LogoMob from '../Ui/Logo/LogoMob'

import classes from './index.module.scss'

const Search = ({ media }) => {
  return (
    <div className={classes.search}>
      <Logo media={media} />
      <LogoMob media={media} />
      <form className={classes.form} action='#'>
        <input className={classes.text} type='search' placeholder='Поиск по объявлениям' name='search' />
        <input className={classes.textMob} type='search' placeholder='Поиск' name='search-mob' />
        <ButtonSmall type='button' className={classes.btnMob}>
          Найти
        </ButtonSmall>
      </form>
    </div>
  )
}

export default Search
