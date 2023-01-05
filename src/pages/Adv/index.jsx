import cn from 'classnames'

import Header from '../../components/Header'
import Menu from '../../components/Menu'
import ButtonSmall from '../../components/Ui/ButtonSmall'
import HeadingSecondary from '../../components/HeadingSecondary'
import Footer from '../../components/Footer'

import classes from './index.module.scss'

const Adv = () => {
  return (
    <>
      <Header className={classes.header} />
      <main>
        <div className={classes.container}>
          <Menu media={768} />
        </div>
        <div className={classes.artic}>
          <div className={cn(classes.articContent, classes.article)}>
            <div className={classes.left}>
              <div className={classes.fillImg}>
                <div className={classes.img}>
                  <img src='' alt='' />
                </div>
                <div className={classes.imgBar}>
                  <div className={classes.imgBarDiv}>
                    <img src='' alt='' />
                  </div>
                  <div className={classes.imgBarDiv}>
                    <img src='' alt='' />
                  </div>
                  <div className={classes.imgBarDiv}>
                    <img src='' alt='' />
                  </div>
                  <div className={classes.imgBarDiv}>
                    <img src='' alt='' />
                  </div>
                  <div className={classes.imgBarDiv}>
                    <img src='' alt='' />
                  </div>
                  <div className={classes.imgBarDiv}>
                    <img src='' alt='' />
                  </div>
                </div>
                <div className={cn(classes.imgBarMob, classes.imgBarMob)}>
                  <div className={cn(classes.imgBarMobCircle, classes.circleActive)} />
                  <div className={classes.imgBarMobCircle} />
                  <div className={classes.imgBarMobCircle} />
                  <div className={classes.imgBarMobCircle} />
                  <div className={classes.imgBarMobCircle} />
                </div>
              </div>
            </div>
            <div className={classes.right}>
              <div className={classes.block}>
                <HeadingSecondary className={classes.itemName}>
                  Ракетка для большого тенниса Triumph Pro STС Б/У
                </HeadingSecondary>
                <div className={classes.info}>
                  <p className={classes.date}>Сегодня в 10:45</p>
                  <p className={classes.city}>Санкт-Петербург</p>
                  <a className={classes.link} href='/' target='_blank'>
                    23 отзыва
                  </a>
                </div>
                <p className={classes.price}>2 200 ₽</p>
                <ButtonSmall type='button' className={classes.btn}>
                  <div>
                    Показать&nbsp;телефон
                    <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                  </div>
                </ButtonSmall>
                <div className={classes.author}>
                  <div className={classes.authorImg}>
                    <img src='' alt='' />
                  </div>
                  <div className={classes.cont}>
                    <p className={classes.name}>Кирилл</p>
                    <p className={classes.about}>Продает товары с августа 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.container}>
          <HeadingSecondary>Описание товара</HeadingSecondary>
          <div className={classes.content}>
            <p className={classes.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
      </main>
      <Footer className={classes.footer} />
    </>
  )
}

export default Adv

/* <div class="wrapper">
        <div class="container">

        компонент
            <header class="header">
                <nav class="header__nav">
                    <div class="header__logo logo-mob">
                        <a class="logo-mob__link" href="" target="_blank">
                            <img class="logo-mob__img" src="img/logo-mob.png" alt="logo">
                        </a>
                    </div>
                    <button class="header__btn-putAd btn-hov01" id="btputAd">Разместить объявление</button>
                    <button class="header__btn-lk btn-hov01" id="btnlk">Личный кабинет</button>
                </nav>
            </header>

            лаяут
            <main class="main">
                
                <div class="main__container">

                       компонент
                    <div class="main__menu menu">
                        <a class="menu__logo-link" href="" target="_blank">
                            <img class="menu__logo-img" src="img/logo.png" alt="logo">
                        </a>
                        <form class="menu__form" action="#">                            
                            <button class="menu__btn-serch btn-hov02" id="btnGoBack">Вернуться на главную</button>
                        </form>                    
                    </div>                    
                </div>

                    <div class="main__artic artic">
                        <div class="artic__content article">                           
                            <div class="article__left">
                                <div class="article__fill-img">
                                    <div class="article__img">                                        
                                            <img src="" alt="">                                        
                                    </div>                                    
                                    <div class="article__img-bar">
                                        <div class="article__img-bar-div">
                                            <img src="" alt="">
                                        </div>
                                        <div class="article__img-bar-div">
                                            <img src="" alt="">
                                        </div>
                                        <div class="article__img-bar-div">
                                            <img src="" alt="">
                                        </div>
                                        <div class="article__img-bar-div">
                                            <img src="" alt="">
                                        </div>
                                        <div class="article__img-bar-div">
                                            <img src="" alt="">
                                        </div>
                                        <div class="article__img-bar-div">
                                            <img src="" alt="">
                                        </div>
                                    </div>
                                    <div class="article__img-bar-mob img-bar-mob">
                                        <div class="img-bar-mob__circle circle-active"></div>
                                        <div class="img-bar-mob__circle"></div>
                                        <div class="img-bar-mob__circle"></div>
                                        <div class="img-bar-mob__circle"></div>
                                        <div class="img-bar-mob__circle"></div>
                                    </div>
                                </div>                                
                            </div>
                            <div class="article__right">
                                <div class="article__block">
                                    <h3 class="article__title title">Ракетка для большого тенниса Triumph Pro STС Б/У</h3>
                                    <div class="article__info">
                                        <p class="article__date">Сегодня в 10:45</p>
                                        <p class="article__city">Санкт-Петербург</p>
                                        <a class="article__link" href="" target="_blank" rel="">23 отзыва</a>
                                    </div>
                                    <p class="article__price">2 200 ₽</p>
                                    <button class="article__btn btn-hov02" >Показать&nbsp;телефон 
                                        <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                                    </button>
                                    <div class="article__author author">
                                        <div class="author__img">
                                            <img src="" alt="">
                                        </div>
                                        <div class="author__cont">
                                            <p class="author__name">Кирилл</p>
                                            <p class="author__about">Продает товары с августа 2021</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                <div class="main__container">
                    <h3 class="main__title title">
                        Описание товара
                    </h3>
                    <div class="main__content">
                        <p class="main__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                
                    </div>
                    
                </div>
                
            </main>
            
            <footer class="footer">
                <div class="footer__container">
                    <div class="footer__img">
                        <a href="" target="_self">
                            <img src="img/icon_01.png" alt="home">
                        </a>                        
                    </div>
                    <div class="footer__img">
                        <a href="" target="_self">
                            <img src="img/icon_02.png" alt="home">
                        </a>
                    </div>
                    <div class="footer__img">
                        <a href="" target="_self">
                            <img src="img/icon_03.png" alt="home">
                        </a>
                    </div>
                </div>
                
            </footer>
        </div>
    </div> */
