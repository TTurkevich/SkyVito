/* eslint-disable consistent-return */
const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export const setDate = (date) => {
  const userDate = new Date(date)

  const month = userDate.getMonth()
  const year = userDate.getFullYear()

  return `Продает товары с ${months[month]} ${year}`
}

const dropHMS = (date) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0, 0)
}

export const showMessageDateTime = (date) => {
  const today = new Date()
  const yesterday = new Date()
  const roomLastMessageDate = new Date(date)

  yesterday.setDate(today.getDate() - 1)

  const h = roomLastMessageDate.getHours()
  const m = roomLastMessageDate.getMinutes()
  const d = new Intl.DateTimeFormat('ru').format(roomLastMessageDate)

  dropHMS(today)
  dropHMS(yesterday)
  dropHMS(roomLastMessageDate)

  if (date) {
    if (today.getTime() === roomLastMessageDate.getTime()) {
      return `Сегодня в ${h}:${m}`
    }
    if (yesterday.getTime() === roomLastMessageDate.getTime()) {
      return `Вчера в ${h}:${m}`
    }
    return `${d} в ${h}:${m}`
  }
}

export default { setDate, showMessageDateTime }
