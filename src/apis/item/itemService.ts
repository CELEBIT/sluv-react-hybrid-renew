import request from '../core'
import { GetResponseType } from '../core/type'

export interface ParentCategoryResult {
  id: number
  name: string
  subCategoryList?: Array<SubCategoryResult>
}
export interface SubCategoryResult {
  id: number
  name: string
}
export interface ImgResult {
  imgUrl: string
  representFlag: boolean
}
export interface CelebResult {
  id: 0
  celebNameKr: string
  celebNameEn: string
  categoryChild: string
  categoryParent: string
  parentCelebNameKr: string
  parentCelebNameEn: string
}
export interface HashTagResult {
  id: number
  content: string
  hashtagStatus: string
}
export interface LinkResult {
  itemLinkUrl: string
  linkName: string
}
export interface ItemCategoryResult {
  id: number
  parentId: number
  name: string
  parentName: string
}
export interface BrandResult {
  id: number
  brandKr: string
  brandEn: string
  brandImgUrl: string
}
export interface TempItemResult {
  id: number
  imgList: Array<ImgResult>
  celeb: CelebResult
  whenDiscovery: string
  whereDiscovery: string
  category: ItemCategoryResult
  brand: BrandResult
  itemName: string
  price: number
  additionalInfo: string
  hashTagList: Array<HashTagResult>
  linkList: Array<LinkResult>
  infoSource: string
  newCelebId: number
  newBrandId: number
  updatedAt: string
}

export default class ItemService {
  itemUrl: string
  tempItemUrl: string

  constructor() {
    this.itemUrl = '/app/item'
    this.tempItemUrl = '/app/item/temp'
  }

  // 아이템 카테고리 조회
  async getItemCategory() {
    const data: GetResponseType<Array<ParentCategoryResult>> = await request.get(
      `${this.itemUrl}/category`,
    )

    return data.result
  }
  // 임시저장 아이템 게시글 조회
  async getTempItem() {
    const data: GetResponseType<Array<TempItemResult>> = await request.get(`${this.tempItemUrl}`, {
      params: {},
    })
    return data.result
  }
}
