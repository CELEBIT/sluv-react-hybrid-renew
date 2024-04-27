import React from 'react'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'
import { QuestionListWrapper } from '../../../../community/styles'
import CommentListItem from '../../../../../components/CommentListItem/CommentListItem'
import { Line } from '../../../../community/detail/styles'

const CommentUpload = () => {
  const { getUserUploadComment } = useUserMypageQuery()
  const { data } = getUserUploadComment()
  const tempData = data?.pages[0].content
  console.log(data)
  return (
    <QuestionListWrapper>
      {tempData?.map((each, index) => {
        return (
          <>
            <CommentListItem key={each.id} comment={each}></CommentListItem>
            {index !== tempData.length - 1 && <Line></Line>}
          </>
        )
      })}
    </QuestionListWrapper>
  )
}

export default CommentUpload
