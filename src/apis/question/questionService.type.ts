export interface User {
  id: number
  nickName: string
  profileImgUrl: string
}

export interface Img {
  imgUrl: string
  representFlag: boolean
  sortOrder: number
  description: string
  voteNum: number
  votePercent: number
}

export interface Item {
  item: EachItem
  representFlag: boolean
  sortOrder: number
  description: string
  voteNum: number
  votePercent: number
}

export interface EachItem {
  itemId: number
  imgUrl: string
  brandName: string
  itemName: string
  celebName: string
  scrapStatus: boolean
}
export interface Celeb {
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
  totalVoteNum: number
  commentNum: number
  createdAt: Date
  hasLike: boolean
  hasMine: boolean
  voteEndTime: string
  celeb: Celeb
  newCeleb: Celeb
  qtype: string
}
