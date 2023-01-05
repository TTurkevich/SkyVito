import Header from '../../components/Header'
import Heading from '../../components/HeadingMain'
import Cards from '../../components/Cards'
import Search from '../../components/Search'
import Footer from '../../components/Footer'

import classes from './index.module.scss'

const Main = () => {
  return (
    <>
      <Header className={classes.header} />
      <main className={classes.main}>
        <Search media={620} />
        <div className={classes.container}>
          <Heading className={classes.heading}>Объявления</Heading>
          <div className={classes.content}>
            <Cards />
          </div>
        </div>
      </main>
      <Footer className={classes.footer} />
    </>
  )
}

export default Main
