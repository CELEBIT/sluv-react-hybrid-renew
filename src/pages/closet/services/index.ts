import { CoverImageMode, ClosetBoxModel } from '../../../apis/closet/model'

export type ClosetBoxService = ClosetBoxModel & {
  coverImageMode?: CoverImageMode
}

export type NameTagService = {
  closetBox: ClosetBoxService
  editMode: boolean
  onSave?: (name: string) => void
  isSortingLocation?: boolean
}
