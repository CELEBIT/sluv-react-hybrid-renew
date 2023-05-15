import { atom } from 'recoil'
import { atomKeys } from '../config/atomKeys'
import { ImgResult } from '../apis/item/itemService'

interface ICeleb {
  celebId: number
  celebName: string
}
interface ICategory {
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
interface ILink {
  itemLinkUrl: string
  linkName: string
}

interface IItemInfo {
  id?: number | null
  imgList?: Array<ImgResult> | null
  celeb?: ICeleb | null
  whenDiscovery?: string | null | Date
  whereDiscovery?: string | null
  itemCategory?: ICategory | null
  brand?: IBrand | null
  itemName?: string | null
  price?: number | null
  color?: string | null
  additionalInfo?: string | null
  hashTagList?: Array<number> | null
  linkList?: Array<ILink> | null
  infoSource?: string | null
  newCeleb?: ICeleb | null
  newBrand?: IBrand | null
}
interface ICelebInfo {
  groupId?: number | null
  groupName?: string | null
  soloId?: number | null
  soloName?: string | null
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

export const celebInfoInItemState = atom<ICelebInfo>({
  key: atomKeys.celebInfoInItemState,
  default: {
    groupId: null,
    groupName: null,
    soloId: null,
    soloName: null,
  },
})
