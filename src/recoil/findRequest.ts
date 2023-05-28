import { atom } from 'recoil'
import { atomKeys } from '../config/atomKeys'

export interface IFindRequest {
  id: number | null
  celebId: number | null
  newCelebId: number | null
  title: string | null
  content: string | null
  imgList: Array<IimgList> | null
  itemList: Array<IitemList> | null
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

export const findRequestState = atom<IFindRequest>({
  key: atomKeys.findRequestState,
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
