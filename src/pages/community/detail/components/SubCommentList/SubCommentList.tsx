import React, { useEffect, useState } from 'react'
import { ShowMoreLayout, ShowMoreSubCommentWrapper, SubCommentListContainer } from './styles'
import useSearchSubCommentQuery from '../../../../../apis/comment/hooks/useSearchSubCommentQuery'
import SubComment from './SubComment'
import { ReactComponent as SubCommentArrow } from '../../../../../assets/arrow_comment_18.svg'
import { ReactComponent as ArrowDown } from '../../../../../assets/arrow_down_13.svg'
import { ReactComponent as ArrowUp } from '../../../../../assets/arrow_up_13.svg'
import { CommentResult } from '../../../../../apis/comment/commentService.type'

interface SubcommentProps {
  comment: CommentResult
  questionId: number
}

const SubCommentList = ({ comment, questionId }: SubcommentProps) => {
  const [restNum, setRestNum] = useState<number | undefined>()
  const { getSubComment } = useSearchSubCommentQuery()
  const { data, refetch } = getSubComment(comment.id, restNum)

  const [hasMore, setHasMore] = useState(false)
  const [showRest, setshowRest] = useState<boolean>(false)

  useEffect(() => {
    if (data?.restCommentNum) {
      setHasMore(true)
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [restNum, refetch])

  const onShowMore = () => {
    if (showRest) {
      // 열려있을 때
      setRestNum(undefined)
    } else {
      // 닫혀있을 때
      if (data?.restCommentNum) {
        setRestNum(data.content.length + data.restCommentNum)
      }
    }
    setshowRest(!showRest)
  }

  if (data && data.content.length > 0) {
    return (
      <SubCommentListContainer>
        {data.content.map((subcomment) => {
          return (
            <SubComment
              subcomment={subcomment}
              comment={comment}
              questionId={questionId}
              key={subcomment.id}
            ></SubComment>
          )
        })}
        {hasMore === true && (
          <ShowMoreLayout>
            {!showRest ? (
              <ShowMoreSubCommentWrapper onClick={onShowMore}>
                <SubCommentArrow style={{ flexShrink: 0 }}></SubCommentArrow>
                <span>답글 {data.restCommentNum}개 더보기</span>
                <ArrowDown></ArrowDown>
              </ShowMoreSubCommentWrapper>
            ) : (
              <ShowMoreSubCommentWrapper onClick={onShowMore}>
                <SubCommentArrow style={{ flexShrink: 0 }}></SubCommentArrow>
                <span>답글 숨기기</span>
                <ArrowUp></ArrowUp>
              </ShowMoreSubCommentWrapper>
            )}
          </ShowMoreLayout>
        )}
      </SubCommentListContainer>
    )
  } else return null
}

export default SubCommentList
