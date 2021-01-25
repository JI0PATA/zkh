export default function orderTimeFilter(value) {
  if (value < 0) return 'Просрочено'

  let dateTime = ''
  let days = Math.floor(value / 60 / 60 / 24)
  let hours = Math.floor(value / 60 / 60 - days * 24)
  const minutes = Math.floor(value / 60 - hours * 60 - days * 24 * 60)
  if (days >= 24) days += 1
  if (minutes >= 60) hours += 1

  if (days > 0) {
    dateTime += `${days} дн. `
  }

  if (hours > 0) {
    dateTime += `${hours} ч. `
  }
  if (minutes < 60 && minutes > 0) {
    dateTime += `${minutes.toFixed(0)} мин.`
  }

  return dateTime
}
