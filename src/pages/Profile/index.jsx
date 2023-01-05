import Header from '../../components/Header'
import Heading from '../../components/HeadingMain'
import HeadingSecondary from '../../components/HeadingSecondary'
import Menu from '../../components/Menu'
import UserProfile from '../../components/UserProfile'
import Cards from '../../components/Cards'
import Footer from '../../components/Footer'

import classes from './index.module.scss'

const Profile = () => {
  return (
    <>
      <Header className={classes.header} />
      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.centerBlock}>
            <Menu media={620} />
            <Heading>Здравствуйте, Антон!</Heading>
            <UserProfile />
            <HeadingSecondary>Мои товары</HeadingSecondary>
          </div>
          <div className={classes.content}>
            <Cards />
          </div>
        </div>
      </main>
      <Footer className={classes.footer} />
    </>
  )
}

export default Profile
