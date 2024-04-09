import React from 'react'
import { QuestionListWrapper } from '../../../../community/styles'
import QuestionListItem from '../../../../../components/QuestionListItem/QuestionListItem'
import { Line } from '../../../../community/detail/styles'
import useQuestionListQuery from '../../../../../apis/question/hooks/useQuestionListQuery'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'

const CommunityUpload = () => {
  const { getUserUploadQuestion } = useUserMypageQuery()
  const { data } = getUserUploadQuestion()
  const tempData = data?.pages[0].content

  return (
    <QuestionListWrapper>
      {tempData?.map((each, index) => {
        return (
          <>
            <QuestionListItem key={each.id} item={each}></QuestionListItem>
            {index !== tempData.length - 1 && <Line></Line>}
          </>
        )
      })}
    </QuestionListWrapper>
  )
}

export default CommunityUpload
