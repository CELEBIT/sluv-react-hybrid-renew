export interface TempItemId {
  tempItemId: number
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
  newCeleb: NewCelebResult
  newBrand: NewBrandResult
  updatedAt: string
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
export interface HashTagResult {
  id: number
  hashtagContent: string
  hashtagStatus: string
}
export interface LinkResult {
  itemLinkUrl: string
  linkName: string
}
export interface NewCelebResult {
  newCelebId: number
  newCelebName: string
}
export interface NewBrandResult {
  newBrandId: number
  newBrandName: string
}
export interface ParentCategoryResult {
  id: number
  name: string
  subCategoryList?: Array<SubCategoryResult>
}
export interface SubCategoryResult {
  id: number
  name: string
}
export interface ItemDetailCeleb {
  id: number
  parentId: number
  celebChildNameKr: string
  celebParentNameKr: string
  celebTotalNameEn: string
  celebTotalNameKr: string
}
export interface RecommendItemResult {
  itemId: number
  imgUrl: string
  brandName: string
  itemName: string
  celebName: string
  scrapStatus: boolean
}
export interface UserResult {
  id: number
  nickName: string
  profileImgUrl: string
}
export interface ItemDetailResult {
  imgList: Array<ImgResult>
  celeb: ItemDetailCeleb
  newCelebName: string
  category: ItemCategoryResult
  itemName: string
  brand: BrandResult
  newBrandName: string
  likeNum: number
  likeStatus: boolean
  scrapNum: number
  scrapStatus: boolean
  viewNum: number
  linkList: Array<LinkResult>
  writer: UserResult
  whenDiscovery: string
  whereDiscovery: string
  price: number
  additionalInfo: string
  hashTagList: Array<HashTagResult>
  infoSource: string
  sameCelebItemList: Array<RecommendItemResult>
  sameBrandItemList: Array<RecommendItemResult>
  color: string
  followStatus: boolean
}
export interface HashtagContent {
  hashtagId: number
  hashtagContent: string
  count: number
}
export interface TempItemReq {
  id: number | null
  imgList: Array<ImgResult> | null
  celebId: number | null
  whenDiscovery: string | null
  whereDiscovery: string | null
  categoryId: number | null
  brandId: number | null
  itemName: string | null
  price: number | null
  additionalInfo: string | null
  hashTagList: Array<number> | null
  linkList: Array<LinkResult> | null
  infoSource: string | null
  newCelebId: number | null
  newBrandId: number | null
}
