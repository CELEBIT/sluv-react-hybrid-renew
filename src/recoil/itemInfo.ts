import { atom } from 'recoil'
import { atomKeys } from '../config/atomKeys'
import { ImgResult } from '../apis/item/itemService.type'
import { NewCeleb } from '../components/SelectCeleb/SelectCeleb'

export interface ICeleb {
  celebId: number
  celebName: string
}
export interface ICategory {
  categoryId: number
  childName: string
  parentCategoryId: number
  parentName: string
}
interface IBrand {
  brandId?: number
  brandName?: string
  brandImgUrl?: string
}

interface Brand {
  brandId: number
  brandName: string
  brandImgUrl?: string
}

interface ILink {
  itemLinkUrl: string
  linkName: string
}
export interface IHashTag {
  hashtagId: number
  hashtagContent: string
}

export interface IItemInfo {
  id: number | null
  imgList: Array<ImgResult> | null
  celeb?: ICeleb | null
  whenDiscovery: Date | null
  whereDiscovery: string | null
  itemCategory: ICategory | null
  brand?: IBrand | null
  itemName: string | null
  price: number | null
  color?: string | null
  additionalInfo: string | null
  hashTagList: Array<IHashTag> | null
  linkList: Array<ILink> | null
  infoSource: string | null
  newCeleb?: ICeleb | null
  newBrand?: IBrand | null
}
interface ICelebInfo {
  groupId?: number | null
  groupName?: string | null
  soloId: number | null
  soloName: string | null
}

export const itemInfoState = atom<IItemInfo>({
  key: atomKeys.itemInfoState,
  default: {
    id: null,
    imgList: null,
    whenDiscovery: null,
    whereDiscovery: null,
    itemCategory: null,
    brand: null,
    itemName: null,
    price: null,
    color: null,
    additionalInfo: null,
    hashTagList: null,
    linkList: null,
    infoSource: null,
    newBrand: null,
  },
})

export const itemIdtoEditState = atom<number | null>({
  key: atomKeys.itemIdtoEditState,
  default: null,
})

export const itemS3ImgListState = atom<ImgResult[] | null>({
  key: atomKeys.itemS3ImgListState,
  default: null,
})

export const tempS3ImgListState = atom<ImgResult[] | null>({
  key: atomKeys.tempS3ImgListState,
  default: null,
})

export const createItemCelebState = atom<ICelebInfo | null>({
  key: atomKeys.createItemCelebState,
  default: null,
})

export const createItemNewCelebState = atom<NewCeleb | null>({
  key: atomKeys.createItemNewCelebState,
  default: null,
})

export const createItemWhenDateState = atom<Date | null>({
  key: atomKeys.createItemWhenDateState,
  default: null,
})

export const createItemPlaceState = atom<string | null>({
  key: atomKeys.createItemPlaceState,
  default: null,
})

export const createItemBrandState = atom<Brand | null>({
  key: atomKeys.createItemBrandState,
  default: null,
})

export const createItemNewBrandState = atom<Brand | null>({
  key: atomKeys.createItemNewBrandState,
  default: null,
})

export const createItemPriceState = atom<number | null>({
  key: atomKeys.createItemPriceState,
  default: null,
})

export const createItemNameState = atom<string | null>({
  key: atomKeys.createItemNameState,
  default: null,
})

export const createItemCategoryState = atom<ICategory | null>({
  key: atomKeys.createItemCategoryState,
  default: null,
})

export const createItemAddInfoState = atom<string | null>({
  key: atomKeys.createItemAddInfoState,
  default: null,
})

export const createItemSourceState = atom<string | null>({
  key: atomKeys.createItemSourceState,
  default: null,
})

export const createItemLinkState = atom<ILink[] | null>({
  key: atomKeys.createItemLinkState,
  default: null,
})

export const currentTempIdState = atom<number | null>({
  key: atomKeys.currentTempId,
  default: null,
})
