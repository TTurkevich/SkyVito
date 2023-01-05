import cn from 'classnames'
import classes from './index.module.scss'

const Form = ({ children, onSubmit, enter }) => {
  return (
    <div className={classes.container}>
      <div className={enter ? cn(classes.block, classes.blockLogin) : classes.block}>
        <form
          className={enter ? cn(classes.form, classes.formLogin) : classes.form}
          action='#'
          onSubmit={onSubmit}
          noValidate
        >
          <div className={enter ? cn(classes.logo, classes.logoLogin) : classes.logo}>
            <img src='../images/logo_modal.png' alt='logo' />
          </div>
          {children}
        </form>
      </div>
    </div>
  )
}

export default Form
