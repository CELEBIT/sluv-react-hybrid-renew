export const queryToObject = (query: string) => {
  const parameters = new URLSearchParams(query)
  return Object.fromEntries(parameters.entries())
}

export function convertToUTC(date: Date): Date {
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return utcDate
}

export const convertToKoDate = (date: Date) => {
  const koreanDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return koreanDate
}

export const formatDateToYYMMDD = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear() % 100
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}.${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day}`
}

export const formatUpdatedAt = (updatedAt: string): string => {
  const now = new Date()
  const savedAt = new Date(updatedAt)

  // Calculate the time difference in milliseconds
  const timeDiff = now.getTime() - savedAt.getTime()

  // Calculate the time difference in seconds, minutes, hours, and days
  const secondsDiff = Math.floor(timeDiff / 1000)
  const minutesDiff = Math.floor(secondsDiff / 60)
  const hoursDiff = Math.floor(minutesDiff / 60)
  const daysDiff = Math.floor(hoursDiff / 24)

  if (secondsDiff < 60) {
    return '방금'
  } else if (minutesDiff < 60) {
    return `${minutesDiff}분 전`
  } else if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`
  } else if (daysDiff < 7) {
    return `${daysDiff}일 전`
  } else {
    const year = savedAt.getFullYear() % 100
    const month = savedAt.getMonth() + 1
    const day = savedAt.getDate()
    return `${year}.${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day}`
  }
}

export function getRankingUpdateTime(date: Date): string {
  const targetTime = new Date(date)
  targetTime.setHours(17, 0, 0, 0) // 17:00 설정
  const currentTime = new Date()
  const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' }
  const dateString = currentTime.toLocaleDateString(undefined, options)

  if (currentTime < targetTime) {
    // 17:00 전
    return `${dateString} 17:00 기준`
  } else {
    // 17:00 후
    const nextDay = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000) // 현재 시간에 1일(24시간)을 더해줌
    const nextDayString = nextDay.toLocaleDateString()
    return `${nextDayString} 17:00 기준`
  }
}

export function getRemainingTime(endTime: string): string {
  const now = new Date()
  const end = new Date(endTime)
  const diffInMs = end.getTime() - now.getTime()
  const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60)) // 밀리초를 시간 단위로 변환

  if (diffInHours <= 24) {
    return '투표 종료 임박'
  } else if (diffInHours <= 48) {
    return '투표 종료 D-1'
  } else if (diffInHours <= 72) {
    return '투표 종료 D-2'
  } else if (diffInHours <= 96) {
    return '투표 종료 D-3'
  } else if (diffInMs <= 0) {
    return '투표 종료'
  } else {
    return '진행중'
  }
}

export function convertToSeoulTimeISOString(endTime: Date): Date {
  const seoulTime = new Date(endTime.getTime() + 9 * 60 * 60 * 1000)
  return seoulTime
}
