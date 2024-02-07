import React from 'react'
import { HeaderWrapper, PageContainer } from '../../styles'
import Header from '../../../../components/Header/Header'

const Help = () => {
  return (
    <PageContainer>
      <HeaderWrapper>
        <Header title='문의하기' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
    </PageContainer>
  )
}

export default Help
