import React, { HTMLAttributes, ReactElement } from 'react'
import { CoverImageMode } from '../../../../apis/closet/model'
import { CoverBoxColorKey, DEFAULT_COVER_COLOR_SET } from '../../utils/consts'

type ClosetBoxGrabIcon = HTMLAttributes<SVGElement> & {
  coverImageMode?: CoverImageMode
  coverBoxColor: CoverBoxColorKey
}

export const ClosetBoxGrabIcon = ({
  coverImageMode,
  coverBoxColor,
}: ClosetBoxGrabIcon): ReactElement => {
  const grabKey = coverImageMode === 'NONE' ? 'DEFAULT' : coverBoxColor
  const GrabIcon = DEFAULT_COVER_COLOR_SET[grabKey].grab
  return <GrabIcon />
}

export default ClosetBoxGrabIcon
