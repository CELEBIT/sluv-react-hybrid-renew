import { EachItem, User } from '../question/questionService.type'

export interface CommentResult {
  id: number
  user: User
  content: string
  imgUrlList: Array<Img> | null
  itemList: Array<Item> | null
  createdAt: string
  likeNum: number
  likeStatus: boolean
  hasMine: boolean
  modifyStatus: boolean
}

export interface SubCommentResult {
  id: number
  user: User
  content: string
  imgUrlList: Array<Img> | null
  itemList: Array<Item> | null
  createdAt: string
  likeNum: number
  likeStatus: boolean
  hasMine: boolean
  modifyStatus: boolean
}

export interface Item {
  item: EachItem
  sortOrder: number
}

export interface Img {
  imgUrl: string
  sortOrder: number
}

export interface ItemPost {
  itemId: number
  sortOrder: number
}

export interface NewComment {
  content: string | null
  imgList: Array<Img> | null
  itemList: Array<ItemPost> | null
}
