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
