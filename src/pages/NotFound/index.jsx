import { Link } from 'react-router-dom'

import classes from './index.module.scss'

const NotFound = () => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>The page you are looking for can`t be found.</p>
      <p className={classes.error}>404</p>
      <Link className={classes.link} to='/'>
        Go HOME
      </Link>
    </div>
  )
}

export default NotFound
