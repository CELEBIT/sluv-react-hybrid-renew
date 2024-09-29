import { useState } from 'react'
import { CoverBoxColorKey } from '../utils/consts'
import { ClosetStatus, CoverImageMode } from '../../../apis/closet/model'
import { ClosetBoxService } from '../services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { closetQueryConfig } from '../../../apis/closet/hooks'
import { getClosetCheckName, putCloset } from '../../../apis/closet'
import { useNavigate } from 'react-router-dom'

const useClosetFormStates = (service?: ClosetBoxService) => {
  const [name, setName] = useState<string>(service?.name || '')
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(service?.coverImgUrl || '')
  const [closetStatus, setClosetStatus] = useState<ClosetStatus>(service?.closetStatus || 'PUBLIC')
  const [colorScheme, setColorScheme] = useState<CoverBoxColorKey>(service?.colorScheme || 'RED')
  const [coverImageMode, setCoverImageMode] = useState<CoverImageMode>(
    service?.coverImageMode || 'NONE',
  )

  return {
    name,
    coverImgUrl,
    closetStatus,
    colorScheme,
    coverImageMode,
    setCoverImageMode,
    setColor: setColorScheme,
    setClosetStatus,
    setName,
    setCoverImgUrl,
  }
}

export const useCreateClosetFormContext = (
  service?: ClosetBoxService,
  onDuplicatedName?: () => void,
  isEditMode?: boolean,
) => {
  const {
    name,
    coverImgUrl,
    closetStatus,
    colorScheme,
    coverImageMode,
    setCoverImageMode,
    setColor: setColorScheme,
    setClosetStatus,
    setName,
    setCoverImgUrl,
  } = useClosetFormStates(service)

  const queryClient = useQueryClient()
  const createClosetMutation = useMutation({
    ...closetQueryConfig.postCloset({ name, closetStatus, colorScheme, coverImgUrl }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['get', 'closet', 'list'], exact: false })
      navigate('/closet')
    },
  })

  const editClosetMutation = useMutation({
    ...closetQueryConfig.putCloset(Number(service?.id), {
      name,
      closetStatus,
      colorScheme,
      coverImgUrl,
    }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['get', 'closet', 'list'], exact: false })
      navigate('/closet')
    },
  })
  const navigate = useNavigate()

  // console.log(name)
  // console.log(coverImgUrl)
  // console.log(closetStatus)
  // console.log(colorScheme)
  // console.log(coverImageMode)

  const handleCreateNewCloset = async () => {
    const isDuplicated =
      service?.name !== name && (await getClosetCheckName(name)).result?.isDuplicated

    if (isDuplicated) {
      onDuplicatedName?.()
      return
    }
    if (isEditMode) {
      await editClosetMutation.mutateAsync()
      return
    }
    await createClosetMutation.mutateAsync()
  }

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
      createClosetMutation,
      handleCreateNewCloset,
    },
  }
}
