import { atom } from 'recoil'
import { atomKeys } from '../config/atomKeys'

export interface CommunityItem {
  id: number | null
  celebId?: number | null
  newCelebId?: number | null
  title: string | null
  content?: string | null
  imgList: Array<IimgList> | null
  itemList: Array<IitemList> | null
  categoryNameList?: Array<string> | null
  voteEndTime?: Date | undefined
}

export interface IimgList {
  imgUrl: string
  description: string
  vote: number
  representFlag: boolean
}

export interface IitemList {
  itemId: number
  description: string
  vote: number
  representFlag: boolean
}

export interface IselectedItem {
  // 사진 or 스럽 내 아이템 선택
  itemId?: number | null
  imgUrl?: string | null
  description: string | null
  vote: number | null
  representFlag: boolean | null
  celebName?: string | null
  brandName?: string | null
  itemName?: string | null
}

export const communityItemState = atom<CommunityItem>({
  key: atomKeys.communityItemState,
  default: {
    id: null,
    celebId: null,
    newCelebId: null,
    title: null,
    content: null,
    imgList: null,
    itemList: null,
    categoryNameList: null,
  },
})

export const communityQuestionMenuState = atom<string>({
  key: atomKeys.communityQuestionMenuState,
  default: '이 중에 뭐 살까',
})

export const firstItemState = atom<IselectedItem>({
  key: atomKeys.firstItemState,
  default: {
    imgUrl: null,
    description: null,
    vote: null,
    representFlag: false,
  },
})
export const secondItemState = atom<IselectedItem>({
  key: atomKeys.secondItemState,
  default: {
    imgUrl: null,
    description: null,
    vote: null,
    representFlag: false,
  },
})
