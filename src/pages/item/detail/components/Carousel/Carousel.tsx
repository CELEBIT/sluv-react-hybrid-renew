import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import styled from '@emotion/styled'
import { ImgResult } from '../../../../../apis/item/itemService.type'
import { useRecoilState } from 'recoil'
import FullPageImageModal, {
  currentPictureIndexState,
} from '../../../../../components/FullPageImageModal/FullPageImageModal'

interface CarouselProps {
  imgList: Array<ImgResult>
}

const Carousel = ({ imgList }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isImgModalOpen, setIsImgModalOpen] = useState(false)
  const [currentPictureIndex, setCurrentPictureIndex] = useRecoilState(currentPictureIndexState)
  const closeImageModal = () => setIsImgModalOpen(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const onClickImg = (index: number) => {
    setCurrentPictureIndex(index)
    setIsImgModalOpen(true)
  }
  return (
    <div className='navigation-wrapper' style={{ position: 'relative' }}>
      {isImgModalOpen && <FullPageImageModal onClose={closeImageModal} imgList={imgList} />}
      {imgList && (
        <ImageContainer ref={sliderRef} className='keen-slider'>
          {imgList.map((itemImg: ImgResult, index) => (
            <Image
              key={index}
              url={itemImg.imgUrl}
              className='keen-slider__slide'
              onClick={() => onClickImg(index)}
            ></Image>
          ))}
        </ImageContainer>
      )}

      {imgList.length > 0 && (
        <>
          {loaded && instanceRef.current && (
            <Dots>
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                return (
                  <CarouselDot
                    key={idx}
                    className={'dot' + (currentSlide === idx ? ' active' : '')}
                  ></CarouselDot>
                )
              })}
            </Dots>
          )}
        </>
      )}
    </div>
  )
}

export default Carousel

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 23.4375rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  ::-webkit-scrollbar {
    display: none;
  }
`

const Image = styled.div<{ url: string }>`
  width: 100%;
  min-height: 23.4375rem;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: 50%;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Dots = styled.div`
  display: flex;
  position: relative;
  bottom: 20px;
  justify-content: center;
  .active {
    background: #ffffff;
  }
`

const CarouselDot = styled.div`
  border: none;
  width: 30px;
  height: 2px;
  background: rgba(240, 240, 240, 0.5);
  margin: 0;
`
