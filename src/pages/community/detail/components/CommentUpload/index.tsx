import React, { useEffect, useState } from 'react'
import { CommentUploadContainer, HeaderWrapper, TextFieldWrapper } from './styles'
import Header from '../../../../../components/Header/Header'
import TextArea from '../../../../../components/TextField/TextArea/TextArea'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { commentQuestionIdState, commentState } from '../../CommunityDetail'
import { imgItemListState } from '../../../../../recoil/communityInfo'
import AddPhotos from '../../../../../components/AddPhotos/AddPhotos'
import AddItemPhotos from '../../../../../components/AddPhotos/AddItemPhotos'
import useSearchCommentQuery, {
  IAddComment,
} from '../../../../../apis/comment/hooks/useSearchCommentQuery'

const CommentUpload = () => {
  const navigate = useNavigate()
  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const resetCommentObject = useResetRecoilState(commentState)
  const questionId = useRecoilValue(commentQuestionIdState)
  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)
  const [comment, setcomment] = useState(commentObject.content)
  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSubmit = () => {
    console.log('imgItemList', imgItemList)
    console.log(commentObject)
    setHasSubmitted(true)
    setCommentObject({ ...commentObject, content: comment })
    if (
      comment ||
      (commentObject.imgList?.length ?? 0 > 0) ||
      (commentObject.itemList?.length ?? 0 > 0)
    ) {
      setInfoValid(true)
      onAddComment()
      resetCommentObject()
      navigate(`/community/detail/${questionId}`)
    } else {
      setInfoValid(false)
    }
  }

  const {
    addComment: { mutate: mutateByAddComment },
  } = useSearchCommentQuery()
  const onAddComment = () => {
    const newComment: IAddComment = {
      questionId: Number(questionId),
      content: comment,
      imgList: commentObject.imgList,
      itemList: commentObject.itemList,
    }
    mutateByAddComment(newComment)
  }

  useEffect(() => {
    if (hasSubmitted) {
      if (
        comment ||
        (commentObject.imgList?.length ?? 0 > 0) ||
        (commentObject.itemList?.length ?? 0 > 0)
      ) {
        setInfoValid(true)
      } else {
        setInfoValid(false)
      }
    }
  }, [comment, commentObject.imgList, commentObject.itemList])

  return (
    <CommentUploadContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title={'댓글 달기'}>
          <span className='submit' onClick={onSubmit}>
            등록
          </span>
        </Header>
      </HeaderWrapper>
      <AddItemPhotos
        size={103.5}
        onClick={() => navigate('/community/comment/comment-item-photo')}
      ></AddItemPhotos>
      <TextFieldWrapper>
        <TextArea
          value={comment ?? ''}
          setValue={setcomment}
          placeholder='아이템과 함께 올릴 댓글을 적어주세요'
          error={hasSubmitted ? !infoValid : false}
          errorMsg='댓글 입력 또는 아이템을 선택해 주세요'
        ></TextArea>
      </TextFieldWrapper>
    </CommentUploadContainer>
  )
}

export default CommentUpload
