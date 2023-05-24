import React from 'react'
import { EditReportContainer } from './styles'
import Header from '../../../components/Header/Header'

const EditRequest = () => {
  const onSubmit = () => {
    console.log('완료')
  }
  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={false} title='게시글 신고'>
        <span className='submit' onClick={onSubmit}>
          완료
        </span>
      </Header>
    </EditReportContainer>
  )
}

export default EditRequest
