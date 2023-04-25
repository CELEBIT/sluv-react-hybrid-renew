import React from 'react'
import Header from '../../../../components/Header/Header'
import { TStoragePageStyle } from './styles'

const TemporaryStorage = () => {
  return (
    <TStoragePageStyle>
      <Header isModalHeader={false} title={'임시 보관함'} hasArrow={true}>
        <span>편집</span>
      </Header>
    </TStoragePageStyle>
  )
}

export default TemporaryStorage
