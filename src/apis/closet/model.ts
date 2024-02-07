import { CoverBoxColorKey } from '../../pages/closet/utils/consts'
import { ClosetBoxService } from '../../pages/closet/services'

export type CoverImageMode = 'NONE' | 'DEFAULT' | 'IMAGE'

export type ClosetStatus = 'PRIVATE' | 'PUBLIC'

export interface ClosetBoxModel {
  id: string
  name: string
  coverImgUrl?: string | null
  closetStatus: ClosetStatus
  colorScheme: CoverBoxColorKey
  itemNum: number
}

export interface ClosetItemModel {
  itemId: number
  imgUrl: string
  brandName: string
  itemName: string
  celebName: string
  scrapStatus: boolean
}
