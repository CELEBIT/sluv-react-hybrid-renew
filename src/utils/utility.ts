import { Image } from '../components/AddPhotos/AddPhotos'

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

  if (diffInMs < 0) {
    return '투표 종료'
  } else if (diffInHours <= 24) {
    return '투표 종료 임박'
  } else if (diffInHours <= 48) {
    return '투표 종료 D-1'
  } else if (diffInHours <= 72) {
    return '투표 종료 D-2'
  } else if (diffInHours <= 96) {
    return '투표 종료 D-3'
  } else {
    return '진행중'
  }
}

export function convertToSeoulTimeISOString(endTime: Date): Date {
  const seoulTime = new Date(endTime.getTime() + 9 * 60 * 60 * 1000)
  return seoulTime
}

// Base64 문자열을 Blob 객체로 변환하는 함수
export function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64.split(',')[1]) // Base64 데이터의 실제 내용을 추출
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}

export const convertToImageList = (base64DataArray: any, imgList: Image[]) => {
  console.log('event', base64DataArray)

  const temp: Array<Image> = base64DataArray.map((base64Data: string, index: number) => {
    const blob = base64ToBlob(base64Data, 'image/jpeg')
    const file = new File([blob], `image_${index}.jpg`, { type: 'image/jpeg' })

    return {
      representFlag: imgList.length === 0 && index === 0 ? true : false, // 첫 번째 이미지를 대표 이미지로 설정
      imgFile: file,
    }
  })

  return temp
}

export const openGallery = (totalPhotos: number, photosToSelect: number) => {
  if (
    typeof window !== 'undefined' &&
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.IOSBridge
  ) {
    console.log(totalPhotos)
    console.log(photosToSelect)
    window.webkit.messageHandlers.IOSBridge.postMessage(
      JSON.stringify({
        type: 'openGallery',
        totalPhotos: totalPhotos,
        photosToSelect: photosToSelect,
      }),
    )
  } else {
    console.error('The app is not running in a WebView or server-side rendering is in process.')
  }
}
