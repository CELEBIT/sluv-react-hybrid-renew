import React, { useState } from 'react'
import Header from '../../../components/Header/Header'
import { HeaderWrap, ListWrap, SelectedCtnDiv, TStoragePageStyle } from './styles'

const TemporaryStorage = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <TStoragePageStyle>
      <HeaderWrap>
        <Header isModalHeader={false} title={'임시 보관함'} hasArrow={true}>
          {isEditMode ? (
            <span className='complete-btn'>완료</span>
          ) : (
            <span className='edit-btn' onClick={() => setIsEditMode(true)}>
              편집
            </span>
          )}
        </Header>
        {isEditMode && (
          <SelectedCtnDiv>
            총<span> 0</span>개 선택됨
          </SelectedCtnDiv>
        )}
      </HeaderWrap>
      <ListWrap></ListWrap>
    </TStoragePageStyle>
  )
}

export default TemporaryStorage
