import React from 'react'
import { HomeTitle, HomeTitleWrapper, ScrollComponentWrapper } from '../../styles'
import { ReactComponent as New } from '../../../../assets/badge_title_new.svg'

const NewItems = () => {
  return (
    <ScrollComponentWrapper>
      <HomeTitleWrapper className='title'>
        <New></New>
        <HomeTitle>실시간 NEW 아이템</HomeTitle>
      </HomeTitleWrapper>
    </ScrollComponentWrapper>
  )
}

export default NewItems
