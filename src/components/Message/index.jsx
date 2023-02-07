import classes from './index.module.scss'

const Message = ({ text }) => {
  return (
    <div className={classes.message}>
      <h6>Info</h6>
      <p>{text}</p>
    </div>
  )
}

export default Message
