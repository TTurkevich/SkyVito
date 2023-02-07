import Card from '../Card'
import Message from '../Message'

import classes from './index.module.scss'

const Cards = ({ adv }) => {
  return (
    <div className={classes.content}>
      {adv ? (
        <div className={classes.cards}>
          {adv && adv.length !== 0 && adv.map((item) => <Card key={item.id} adv={item} />)}
        </div>
      ) : (
        <Message text='Пока объявлений нет' />
      )}
    </div>
  )
}

export default Cards
