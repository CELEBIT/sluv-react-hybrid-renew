import { atom } from 'recoil'
import { atomKeys } from '../config/atomKeys'

export interface CommunityItem {
  id: number | null
  celebId: number | null
  newCelebId: number | null
  title: string | null
  content: string | null
  imgList: Array<IimgList> | null
  itemList: Array<IitemList> | null
  categoryNameList?: Array<string> | null
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
  },
})

export const communityQuestionMenuState = atom<string>({
  key: atomKeys.communityQuestionMenuState,
  default: '이 중에 뭐 살까',
})
