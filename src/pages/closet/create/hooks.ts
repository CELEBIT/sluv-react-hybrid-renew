import { useState } from 'react'
import { CoverBoxColorKey } from '../components/ClosetCoverBox/ClosetCoverBox.consts'
import { ClosetStatus, CoverImageMode } from '../../../apis/closet/model'
import { ClosetBoxService } from '../services'

export const useCreateClosetFormContext = () => {
  const [name, setName] = useState<string>('')
  const [coverImgUrl, setCoverImgUrl] = useState<string>()
  const [closetStatus, setClosetStatus] = useState<ClosetStatus>('PRIVATE')
  const [colorScheme, setColorScheme] = useState<CoverBoxColorKey>('RED')
  const [coverImageMode, setCoverImageMode] = useState<CoverImageMode>('NONE')

  console.log(name)
  console.log(coverImgUrl)
  console.log(closetStatus)
  console.log(colorScheme)
  console.log(coverImageMode)

  return {
    states: {
      name,
      coverImgUrl,
      closetStatus,
      colorScheme,
      coverImageMode,
    } as ClosetBoxService,
    handlers: {
      setCoverImageMode,
      setColor: setColorScheme,
      setClosetStatus,
      setName,
      setCoverImgUrl,
    },
  }
}
