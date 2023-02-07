import { Link } from 'react-router-dom'

import { setDate } from '../../helpers/helpers'
import { SERVER_PATH } from '../../redux/api/apiConst'

import classes from './index.module.scss'

const SellerBlock = ({ adv, id }) => {
  const seller = adv.user.name

  return (
    <div className={classes.author}>
      <div className={classes.authorImg}>
        {adv.user.avatar ? <img src={`${SERVER_PATH}/${adv.user.avatar}`} alt='' /> : null}
      </div>
      <div className={classes.cont}>
        <Link to={`/adv/${id}/seller/${seller}`} className={classes.name}>
          {adv.user.name ? adv.user.name : 'Аноним'}
        </Link>
        <p className={classes.about}>{setDate(adv.user.sells_from)}</p>
      </div>
    </div>
  )
}

export default SellerBlock
