import Logo from '../Ui/Logo/Logo'
import ButtonSmall from '../Ui/Button'
import LogoMob from '../Ui/Logo/LogoMob'

import useSearch from '../../hooks/useSearch'

import classes from './index.module.scss'

const Search = ({ media }) => {
  const [handleSearch, handleMobSearch, handleClick] = useSearch()

  return (
    <div className={classes.search}>
      <Logo media={media} />
      <LogoMob media={media} />
      <form className={classes.form} action='#'>
        <input
          type='search'
          className={classes.text}
          placeholder='Поиск по объявлениям'
          name='search'
          onChange={handleSearch}
        />
        <input className={classes.textMob} type='search' placeholder='Поиск' name='search' onChange={handleMobSearch} />
        <ButtonSmall onClick={handleClick} type='button' className={classes.btnMob}>
          Найти
        </ButtonSmall>
      </form>
    </div>
  )
}

export default Search
