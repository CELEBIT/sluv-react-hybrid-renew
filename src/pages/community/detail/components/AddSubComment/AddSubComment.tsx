import React, { useEffect, useState } from 'react'
import { HeaderWrapper } from '../../../../item/addInfo/styles'
import Header from '../../../../../components/Header/Header'
import { AddSubCommentContainer } from './styles'
import Comment from '../Comment/Comment'
import { CommentResult } from '../../../../../apis/comment/commentService.type'
import { useLocation, useNavigate } from 'react-router-dom'
import { CommentContainer, CommentWrapper, RecommendChipWrapper } from '../../styles'
import Chip from '../../../../../components/Chip/Chip'
import CommentField from '../../../../../components/TextField/CommentField/CommentField'
import useSearchCommentQuery, {
  IAddComment,
} from '../../../../../apis/comment/hooks/useSearchCommentQuery'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { commentState } from '../../CommunityDetail'
import { ReactComponent as SubmitOff } from '../../../../../assets/submit_off_32.svg'
import { ReactComponent as SubmitOn } from '../../../../../assets/submit_on_32.svg'
import useSearchSubCommentQuery, {
  IAddSubComment,
} from '../../../../../apis/comment/hooks/useSearchSubCommentQuery'

const AddSubComment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { comment, questionId } = location.state

  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const resetCommentObject = useResetRecoilState(commentState)

  const [commentString, setCommentString] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)

  const {
    addSubComment: { mutate: mutateByAddSubComment },
  } = useSearchSubCommentQuery()
  const onAddComment = () => {
    const newComment: IAddSubComment = {
      commentId: Number(comment.id),
      questionId: Number(questionId),
      content: commentObject.content,
      imgList: commentObject.imgList,
      itemList: commentObject.itemList,
    }
    mutateByAddSubComment(newComment)
  }
  const submitComment = () => {
    onAddComment()
    resetCommentObject()
    setCommentString('')
  }

  const [isChipClicked, setIsChipClicked] = useState(false)

  const onBlurHandler = () => {
    setTimeout(() => {
      if (!isChipClicked) {
        setIsFocused(false)
      }
    }, 100)
  }

  useEffect(() => {
    setCommentObject({ ...commentObject, content: commentString })
  }, [commentString])

  return (
    <AddSubCommentContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='답글 달기'></Header>
      </HeaderWrapper>
      <Comment questionId={Number(questionId)} comment={comment}></Comment>
      <CommentContainer>
        {isFocused && (
          <RecommendChipWrapper>
            <Chip
              text='아이템 찾아주기'
              onClick={() =>
                navigate('/community/comment/comment-item-photo', {
                  state: { comment: comment, name: 'subcomment' },
                })
              }
            ></Chip>
          </RecommendChipWrapper>
        )}
        <CommentWrapper onFocus={() => setIsFocused(true)} onBlur={onBlurHandler}>
          <CommentField
            value={commentString}
            setValue={setCommentString}
            placeholder='댓글을 남겨주세요'
            onEnter={submitComment}
          ></CommentField>
          {commentString ? (
            <SubmitOn onClick={() => submitComment()}></SubmitOn>
          ) : (
            <SubmitOff></SubmitOff>
          )}
        </CommentWrapper>
      </CommentContainer>
    </AddSubCommentContainer>
  )
}

export default AddSubComment
