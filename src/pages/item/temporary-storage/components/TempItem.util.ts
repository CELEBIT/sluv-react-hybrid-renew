import {
  BrandResult,
  CelebResult,
  ImgResult,
  ItemCategoryResult,
  NewBrandResult,
  NewCelebResult,
  TempItemResult,
} from '../../../../apis/item/itemService.type'

export const processTempTitle = (
  data: TempItemResult,
):
  | CelebResult
  | NewCelebResult
  | BrandResult
  | NewBrandResult
  | ItemCategoryResult
  | string
  | number => {
  if (data.celeb || data.newCeleb) {
    if (data.celeb) {
      return data.celeb.celebNameKr
    } else {
      return data.newCeleb.newCelebName
    }
  } else if ((data.imgList?.length ?? 0) > 0) {
    return '사진'
  } else if (data.whenDiscovery) {
    return data.whenDiscovery
  } else if (data.whereDiscovery) {
    return data.whereDiscovery
  } else if (data.brand || data.newBrand) {
    if (data.brand) {
      return data.brand.brandKr
    } else {
      return data.newBrand.newBrandName
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

export const filterRepresentImg = (imgList: Array<ImgResult>): string => {
  const representImg = imgList.filter((img) => img.representFlag)
  return representImg[0].imgUrl
}
