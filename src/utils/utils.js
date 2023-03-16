export const checkDaysDifference = (lastTimeUpdated) => {
  const today = new Date()

  const diffTime = Math.abs(new Date(lastTimeUpdated) - today)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const isUpdateNeeded = diffDays > 1 ? true : false
  return isUpdateNeeded
}
