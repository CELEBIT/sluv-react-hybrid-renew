import React, { ChangeEvent, useEffect, useRef } from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'

import Header from '../Header/Header'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { Common, Pretendard } from '../styles'
import { ReactComponent as Share } from '../../assets/share_24.svg'
import { convertToFile, openGallery } from '../../utils/utility'
import useUserMypageQuery from '../../apis/user/hooks/useUserMypageQuery'
import S3Service from '../../apis/s3/S3Service'

interface ProfileImgModalProps {
  imgExist: boolean
}

const ProfileImgModal = ({ imgExist }: ProfileImgModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { closeModal } = useModals()

  const {
    editProfileImage: { mutate: mutateByEdit },
    deleteProfileImage: { mutate: mutateByDelete },
  } = useUserMypageQuery()

  const onOpengallery = () => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      closeModal(modals.ProfileImgModal, () => openGallery(1, 1))
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.click() // 파일 선택 창 열기
      }
    }
  }

  const onDeleteImg = () => {
    closeModal(modals.ProfileImgModal, () => mutateByDelete())
  }

  const onClose = () => {
    closeModal(modals.ProfileImgModal)
  }

  const changeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      alert('파일이 없습니다.')
      return
    }
    const s3 = new S3Service()
    const imgURL = await s3.postProfileImg(file)
    // console.log('imgURL', imgURL)
    mutateByEdit(imgURL)

    if (fileInputRef.current?.value) fileInputRef.current.value = ''
    closeModal(modals.ProfileImgModal)
  }

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = async (event: any) => {
      const images = convertToFile(event.detail)
      const s3 = new S3Service()
      const imgURL = await s3.postProfileImg(images[0])
      if (imgURL) mutateByEdit(imgURL)
    }
    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
    }
  }, [])

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header isModalHeader={true} modalCloseBtnClick={onClose} />
        <MenuWrapper>
          <Menu onClick={onOpengallery}>
            <input
              id='inputFile'
              type='file'
              accept='image/*'
              onChange={(e) => changeImg(e)}
              style={{ display: 'none' }}
              multiple
              max={1}
              ref={fileInputRef}
            ></input>
            <Share stroke={Common.colors.BK}></Share>라이브러리에서 선택
          </Menu>
          {!imgExist && (
            <Menu onClick={onDeleteImg}>
              <Share stroke={Common.colors.BK}></Share>프로필 사진 삭제
            </Menu>
          )}
        </MenuWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1.25rem 0.75rem 2rem;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 0.875rem 0;
  gap: 0.625rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export default ProfileImgModal
