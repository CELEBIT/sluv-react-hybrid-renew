interface User {
  id: number
  nickName: string
  profileImgUrl: string
}

export interface Img {
  imgUrl: string
  representFlag: boolean
  order: number
}

export interface Item {
  item: EachItem
  representFlag: boolean
  order: number
}

interface EachItem {
  itemId: number
  imgUrl: string
  brandName: string
  itemName: string
  celebName: string
  scrapStatus: boolean
}
interface Celeb {
  celebId: number
  celebName: string
}

export interface QuestionResult {
  user: User
  title: string
  content: string
  imgList: Array<Img> | null
  itemList: Array<Item> | null
  searchNum: number
  likeNum: number
  commentNum: number
  createdAt: Date
  hasLike: boolean
  hasMine: boolean
  voteEndTime: string
  celeb: Celeb
  newCeleb: Celeb
  qtype: string
}
