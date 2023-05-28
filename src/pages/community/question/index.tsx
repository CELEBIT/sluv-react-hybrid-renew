import React from 'react'
import { FindRequestContainer } from '../findRequest/styles'
import CommunityHeader from '../../../components/Header/CommunityHeader/CommunityHeader'

const Question = () => {
  return (
    <FindRequestContainer>
      <CommunityHeader>
        <span className='submit' onClick={() => alert('submit')}>
          완료
        </span>
      </CommunityHeader>
    </FindRequestContainer>
  )
}

export default Question
