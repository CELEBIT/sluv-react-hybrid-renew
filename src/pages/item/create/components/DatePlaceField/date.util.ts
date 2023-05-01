export const formatDate = (date: Date) => {
  return date.toISOString().substring(2, 10).replaceAll('-', '. ')
}

export const getFormattedTodayDate = (): string => {
  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  return today.toISOString().substring(2, 10).replaceAll('-', '. ')
}
