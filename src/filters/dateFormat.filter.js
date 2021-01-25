export default function dateFormatFilter(value, format = '') {
  value = new Date(value)
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
    'декабря'
  ]
  let string
  if (format === 'date') {
    string = `${value.getDate()} ${months[value.getMonth()]}, ${value.getFullYear()} г.`
  }
  if (format === 'time') {
    string = `${value.getHours()}:${value.getMinutes()}`
  }
  if (format === 'hours') {
    string = `${value.getHours().toString().padStart(2, '0')}`
  }
  if (format === 'minutes') {
    string = `${value.getMinutes().toString().padStart(2, '0')}`
  }

  return string
}
