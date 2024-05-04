import { ClosetBoxService } from '../services'
import { CoverBoxBackgroundConfig, DEFAULT_COVER_COLOR_SET } from './consts'
import { css } from '@emotion/react'

export const getClosetBoxBackground = (
  closetBox: ClosetBoxService,
  target: Exclude<keyof CoverBoxBackgroundConfig, 'nameTag' | 'grab'>,
) => {
  // console.log(closetBox.coverImageMode)
  // console.log(closetBox)

  if (closetBox.coverImgUrl || closetBox.coverImageMode === 'IMAGE') {
    return css`
      background-image: url(${closetBox.coverImgUrl});
      background-size: cover;
    `
  }

  if (closetBox.coverImageMode === 'NONE') {
    return css`
      background-color: white;
    `
  }

  return css`
    background-color: ${DEFAULT_COVER_COLOR_SET[closetBox.colorScheme][target]};
  `
}
