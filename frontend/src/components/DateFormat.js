const DateFormat = (oldDate) => {
  var newDate = new Date(oldDate)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return (
    months[newDate.getMonth()] +
    '/' +
    newDate.getDate() +
    '/' +
    (newDate.getYear() % 100)
  )
}

export default DateFormat
