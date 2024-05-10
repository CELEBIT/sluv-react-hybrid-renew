import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ItemImg } from '../../apis/question/questionService.type'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../config/atomKeys'
import { ImgResult } from '../../apis/item/itemService.type'
import Modal from 'react-modal'
import { useKeenSlider } from 'keen-slider/react'
import { ReactComponent as Close } from '../../assets/close_24_white.svg'
import { Common, Pretendard } from '../styles'

interface ImageModalProps {
  imgList: ImgResult[] | ItemImg[]
  onClose: () => any
}

export const currentPictureIndexState = atom<number>({
  key: atomKeys.currentPictureIndexState,
  default: 0,
})

function FullPageImageModal({ imgList, onClose }: ImageModalProps) {
  const pictures = imgList
  const [currentPictureIndex, setCurrentPictureIndex] = useRecoilState(currentPictureIndexState)

  const onAfterOpen = () => (document.body.style.overflow = 'hidden')

  const onCloseModal = () => {
    document.body.style.overflow = 'auto'
    onClose()
  }

  const [currentSlide, setCurrentSlide] = useState(currentPictureIndex)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: currentPictureIndex,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  return (
    <Modal
      isOpen={true}
      onAfterOpen={onAfterOpen}
      onRequestClose={() => onCloseModal()}
      style={{
        content: {
          display: 'flex',
          width: '100vw',
          inset: 0,
          marginLeft: 'calc(-50vw + 50%)',
          border: 'none',
          background: 'transparent',
          padding: 0,
        },
        overlay: {
          display: 'flex',
          marginLeft: 'calc(-50vw + 50%)',
          backgroundColor: 'black',
          width: '100vw',
          height: '100%',
          zIndex: '10',
        },
      }}
    >
      <PopupLayout>
        <ImageContainer ref={sliderRef} className='keen-slider'>
          {imgList.map((itemImg: ImgResult, index) => (
            <Image key={index} url={itemImg.imgUrl} className='keen-slider__slide'></Image>
          ))}
        </ImageContainer>
        <CloseButton onClick={onCloseModal}>
          <Close></Close>
        </CloseButton>
        <PhotoCount>{currentSlide + 1 + '/' + imgList.length}</PhotoCount>
      </PopupLayout>
    </Modal>
  )
}

export default FullPageImageModal

export const PopupLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  span {
    color: white;
  }
`

export const ImageContainer = styled.div`
  width: 100vw;
  height: 32.625rem;
  position: relative;
  background-color: black;
`

const Image = styled.div<{ url: string }>`
  width: 100vw;
  height: auto;
  background-image: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const List = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MainImage = styled.img`
  width: 800px;
  height: 500px;
  object-fit: cover;
  margin-top: -50px;
`

export const SubImage = styled.img`
  height: 100px;
  width: 130px;
  margin: 0 3px 6px;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;

  &:hover {
    color: #ccc;
  }
`
export const PhotoCount = styled.span`
  position: absolute;
  bottom: 3.125rem;
  line-height: 20.29px;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.WH })}
`
