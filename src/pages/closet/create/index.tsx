import React, { createContext, useCallback, useMemo } from 'react'
import { useCreateClosetFormContext } from './hooks'
import Header from '../../../components/Header/Header'

import * as S from './styles'
import ClosetCreateBox from '../components/ClosetCreateBox'
import ColorSelector from '../components/ColorSelector'
import useModals from '../../../components/Modals/hooks/useModals'
import ClosetBoxBottomSheetModal, {
  ListItem,
} from '../../../components/BottomSheetModal/ClosetBoxBottomSheetModal'

type CreateClosetFormContextType = ReturnType<typeof useCreateClosetFormContext>
export const CreateClosetFormContext = createContext<CreateClosetFormContextType | null>(null)

const ClosetBoxCreatePage = () => {
  const contextValue = useCreateClosetFormContext()

  const { openModal, closeModal } = useModals()

  const SELECT_COVER_IMAGE_MODAL_ITEMS: ListItem[] = useMemo(
    () => [
      {
        title: '앨범에서 사진 선택',
        callback: () => {
          // TODO: 웹뷰 통신
          console.log('앨범 선택')
        },
      },
      {
        title: '기본 커버 선택',
        callback: () => {
          // TODO: 웹뷰 통신
          contextValue.handlers.setCoverImageMode('DEFAULT')
          closeModal(ClosetBoxBottomSheetModal)
        },
      },
    ],
    [],
  )

  const handleOpenSelectCoverModal = useCallback(() => {
    openModal(ClosetBoxBottomSheetModal, { items: SELECT_COVER_IMAGE_MODAL_ITEMS })
  }, [])

  return (
    <CreateClosetFormContext.Provider value={contextValue}>
      <S.CreateRoot>
        <S.CreateHeaderContainer>
          <Header isModalHeader={false} hasArrow title={'옷장 만들기'} />
        </S.CreateHeaderContainer>
        <S.BodyContainer>
          <ClosetCreateBox onForwardingCreate={handleOpenSelectCoverModal} />
          <ColorSelector />
        </S.BodyContainer>
        <S.ClosetCreateFooterElementWrapper></S.ClosetCreateFooterElementWrapper>
      </S.CreateRoot>
    </CreateClosetFormContext.Provider>
  )
}

export default ClosetBoxCreatePage
