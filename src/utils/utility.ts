import {
  BrandResult,
  CelebResult,
  ItemCategoryResult,
  TempItemResult,
} from '../apis/item/itemService'
import { ICeleb } from '../recoil/itemInfo'

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

export const processTempTitle = (
  data: TempItemResult,
): CelebResult | BrandResult | ItemCategoryResult | string | number => {
  if (data.celeb || data.newCelebId) {
    if (data.celeb) {
      return data.celeb.celebNameKr
    } else {
      return data.newCelebId
    }
  } else if ((data.imgList?.length ?? 0) > 0) {
    return '사진'
  } else if (data.updatedAt) {
    return formatDateToYYMMDD(data.updatedAt)
  } else if (data.whereDiscovery) {
    return data.whereDiscovery
  } else if (data.brand || data.newBrandId) {
    if (data.brand) {
      return data.brand.brandKr
    } else {
      return data.newBrandId
    }
  } else if (data.price) {
    return data.price
  } else if (data.category) {
    return data.category.name
  } else if (data.itemName) {
    return data.itemName
  } else {
    return '제목 없음'
  }
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
