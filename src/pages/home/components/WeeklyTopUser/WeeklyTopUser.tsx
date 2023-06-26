import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import Filter from '../../../../components/FIlter/Filter'
import BlackFilter from '../../../../components/FIlter/BlackFilter'

const WeeklyTopUser = () => {
  return (
    <ScrollComponentWrapper bgColor='gray'>
      <HomeTitle className='title'>이번주 인기 스러버</HomeTitle>
      <div>
        <BlackFilter isSelected={true} onClick={() => console.log('clicked')}>
          전체
        </BlackFilter>
        <BlackFilter isSelected={false} onClick={() => console.log('clicked')}>
          전체
        </BlackFilter>
        <Filter isSelected={true} hasArrow={true} onClick={() => console.log('clicked')}>
          카테고리
        </Filter>
        <Filter isSelected={false} hasArrow={true} onClick={() => console.log('clicked')}>
          카테고리
        </Filter>
        <Filter
          isSelected={false}
          color='red'
          isColor={true}
          onClick={() => console.log('clicked')}
        >
          레드
        </Filter>
      </div>
    </ScrollComponentWrapper>
  )
}

export default WeeklyTopUser
