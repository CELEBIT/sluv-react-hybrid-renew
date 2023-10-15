import { CoverBoxColorKey } from '../../pages/closet/components/ClosetCoverBox/ClosetCoverBox.consts'
import { ClosetBoxService } from '../../pages/closet/services'

export type CoverImageMode = 'NONE' | 'DEFAULT' | 'IMAGE'

export type ClosetStatus = 'PRIVATE' | 'PUBLIC'

export interface ClosetBoxModel {
  id: string
  name: string
  coverImgUrl?: string
  closetStatus: ClosetStatus
  colorScheme: CoverBoxColorKey
  itemNum: number
}
