import ButtonBig from '../components/Ui/ButtonBig'
import LogoMob from '../components/Ui/Logo/LogoMob'

const useHeader = () => {
  const path = window.location.pathname

  if (path.includes('/profile') || path.includes('/adv')) {
    return (
      <>
        <LogoMob />
        <ButtonBig>Разместить объявление</ButtonBig>
        <ButtonBig>Личный кабинет</ButtonBig>
      </>
    )
  }
  return <ButtonBig>Вход в личный кабинет</ButtonBig>
}

export default useHeader
