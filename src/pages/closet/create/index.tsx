import React, { ChangeEvent, createContext, useCallback, useEffect, useMemo, useRef } from 'react'
import { useCreateClosetFormContext } from './hooks'
import Header from '../../../components/Header/Header'

import * as S from './styles'
import ClosetCreateBox, { ClosetCreateBoxProps } from '../components/ClosetCreateBox'
import ColorSelector from '../components/ColorSelector'
import useModals from '../../../components/Modals/hooks/useModals'
import ClosetBoxCreateBottomSheetModal, {
  ClosetBoxBottomSheetListItem,
} from '../../../components/BottomSheetModal/ClosetBoxCreateBottomSheetModal'
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch'
import { ClosetBoxService } from '../services'
import { useLocation, useParams } from 'react-router-dom'
import OneButtonModal from '../../../components/OneButtonModal'
import { BtnModalContent } from '../../../components/Modals/styles'
import S3Service from '../../../apis/s3/S3Service'
import { convertToFile, openGallery } from '../../../utils/utility'
import { HeaderWrapper } from '../../item/addInfo/styles'
import { toast } from 'react-toastify'

type CreateClosetFormContextType = ReturnType<typeof useCreateClosetFormContext>
export const CreateClosetFormContext = createContext<CreateClosetFormContextType | null>(null)

type ClosetBoxCreatePageProps = {
  service?: ClosetBoxService
  isEditMode: boolean
}

const DuplicatedModal = () => {
  const { closeModal } = useModals()
  return (
    <OneButtonModal buttonName={'확인'} buttonOnClick={() => closeModal(DuplicatedModal)}>
      <BtnModalContent>중복된 옷장 이름입니다.</BtnModalContent>
    </OneButtonModal>
  )
}

const ClosetBoxCreatePage = ({ service, isEditMode = false }: ClosetBoxCreatePageProps) => {
  const coverImageRef = useRef<HTMLInputElement>(null)

  const { openModal, closeModal } = useModals()

  const contextValue = useCreateClosetFormContext(
    service,
    () => {
      openModal(DuplicatedModal)
    },
    isEditMode,
  )

  const onClickOpenGallery = () => {
    openGallery(1, 1, coverImageRef)
  }

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = async (event: any) => {
      const images = convertToFile(event.detail)
      const s3 = new S3Service()
      const imgURL = await s3.postProfileImg(images[0])
      if (imgURL) {
        console.log('이미지 url', imgURL)
        contextValue.handlers.setCoverImgUrl(imgURL)
        contextValue.handlers.setCoverImageMode('IMAGE')
      }
    }
    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
    }
  }, [])

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = async (event: any) => {
      const parsedData = JSON.parse(event.data)
      const images = convertToFile(parsedData.detail)
      const s3 = new S3Service()
      const imgURL = await s3.postProfileImg(images[0])
      if (imgURL) {
        console.log('이미지 url', imgURL)
        contextValue.handlers.setCoverImgUrl(imgURL)
        contextValue.handlers.setCoverImageMode('IMAGE')
      }
    }
    document.addEventListener('message', handlePhotosMessage)
    return () => {
      document.removeEventListener('message', handlePhotosMessage)
    }
  }, [])

  const SELECT_COVER_IMAGE_MODAL_ITEMS: ClosetBoxBottomSheetListItem[] = useMemo(
    () => [
      {
        title: '앨범에서 사진 선택',
        callback: () => {
          onClickOpenGallery()
          closeModal(ClosetBoxCreateBottomSheetModal)
        },
      },
      {
        title: '기본 커버 선택',
        callback: () => {
          // TODO: 웹뷰 통신
          contextValue.handlers.setCoverImageMode('DEFAULT')
          contextValue.handlers.setCoverImgUrl(null)
          closeModal(ClosetBoxCreateBottomSheetModal)
        },
      },
    ],
    [],
  )

  const handleOpenSelectCoverModal = useCallback(() => {
    openModal(ClosetBoxCreateBottomSheetModal, {
      items: SELECT_COVER_IMAGE_MODAL_ITEMS,
      title: '커버 이미지 선택',
    })
  }, [])

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log(file)
    if (!file) {
      toast('파일이 없습니다.')
      return
    }
    const s3 = new S3Service()
    const imgURL = await s3.postClosetImg(file)

    contextValue.handlers.setCoverImgUrl(imgURL)
    contextValue.handlers.setCoverImageMode('IMAGE')
  }

  return (
    <CreateClosetFormContext.Provider value={contextValue}>
      <S.CreateRoot>
        <HeaderWrapper>
          <S.CreateHeaderContainer>
            <Header isModalHeader={false} hasArrow title={'옷장 만들기'} />
          </S.CreateHeaderContainer>
        </HeaderWrapper>
        <S.BodyContainer>
          <ClosetCreateBox onForwardingCreate={handleOpenSelectCoverModal} />
          <ColorSelector />
          <input
            type='file'
            onChange={handleChangeFile}
            ref={coverImageRef}
            style={{ display: 'none' }}
            accept='image/*'
          />
        </S.BodyContainer>
        <S.CreateFooter>
          <S.ClosetCreateFooterElementWrapper>
            <S.SwitchContainer>
              <p>비공개</p>
              <ToggleSwitch
                isToggleOn={contextValue.states.closetStatus === 'PRIVATE'}
                onToggleSwitch={(e) =>
                  contextValue.handlers.setClosetStatus(e.target.checked ? 'PRIVATE' : 'PUBLIC')
                }
              />
            </S.SwitchContainer>
          </S.ClosetCreateFooterElementWrapper>
          <S.ClosetCreateFooterElementWrapper>
            <S.Button
              onClick={async () => {
                await contextValue.handlers.handleCreateNewCloset()
              }}
            >
              완료
            </S.Button>
          </S.ClosetCreateFooterElementWrapper>
        </S.CreateFooter>
      </S.CreateRoot>
    </CreateClosetFormContext.Provider>
  )
}

export default ClosetBoxCreatePage
