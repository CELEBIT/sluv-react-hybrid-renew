import React, { useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import styled from '@emotion/styled'
import { IRecentSearch } from '../../../apis/search/searchService'
import Rank from './Rank'

interface SliderWrapperProps {
  data?: Array<IRecentSearch>
}

const SliderWrapper = ({data}: SliderWrapperProps) => {

const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
      loop: true,
    }, 
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ]
  )

  return (
    <>
        <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              <SlideItem className="keen-slider__slide">
              {data?.slice(0,6).map((item, idx) => {
                return (
                  <Rank key={idx} keyword={item.keyword} idx={idx}/>
                )
              })}
              </SlideItem>
              <SlideItem className="keen-slider__slide">
              {data?.slice(6,12).map((item, idx) => {
                return (
                  <Rank key={idx} keyword={item.keyword} idx={idx+6}/>
                )
              })}
              </SlideItem>
            </div>
        </div>
        {data && loaded && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}
                ></button>
              )
            })}
          </div>
        )}
    </>
  )
}

export default SliderWrapper

const SlideItem = styled.div`
  padding: 1.5rem 1.5rem 1.25rem 1.5rem;
  display: grid; 
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-flow: column;
  row-gap: 1.3125rem;
`