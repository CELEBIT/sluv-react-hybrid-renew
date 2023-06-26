import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import Filter from '../../../../components/FIlter/Filter'
import BlackFilter from '../../../../components/FIlter/BlackFilter'
import { FilterListWrapper } from './styles'

const WeeklyTopUser = () => {
  return (
    <ScrollComponentWrapper bgColor='gray'>
      <HomeTitle className='title'>이번주 인기 스러버</HomeTitle>
      <FilterListWrapper>
        <BlackFilter isSelected={true} onClick={() => console.log('clicked')}>
          전체
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          스트레이키즈
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          최우식
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          아이유
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          르세라핌
        </BlackFilter>

        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          블랙핑크
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          악동뮤지션
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          빅뱅
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          소녀시대
        </BlackFilter>
      </FilterListWrapper>
    </ScrollComponentWrapper>
  )
}

export default WeeklyTopUser
