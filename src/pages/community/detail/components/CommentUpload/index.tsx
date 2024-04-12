import React, { useEffect, useState } from 'react'
import { CommentUploadContainer, HeaderWrapper, TextFieldWrapper } from './styles'
import Header from '../../../../../components/Header/Header'
import TextArea from '../../../../../components/TextField/TextArea/TextArea'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { commentQuestionIdState, commentState } from '../../CommunityDetail'
import { imgItemListState } from '../../../../../recoil/communityInfo'
import AddPhotos from '../../../../../components/AddPhotos/AddPhotos'
import AddItemPhotos from '../../../../../components/AddPhotos/AddItemPhotos'
import useSearchCommentQuery, {
  IAddComment,
  IEditComment,
} from '../../../../../apis/comment/hooks/useSearchCommentQuery'
import useSearchSubCommentQuery from '../../../../../apis/comment/hooks/useSearchSubCommentQuery'
import S3Service from '../../../../../apis/s3/S3Service'

const CommentUpload = () => {
  const navigate = useNavigate()
  const { state, pathname } = useLocation()
  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const resetCommentObject = useResetRecoilState(commentState)
  const questionId = useRecoilValue(commentQuestionIdState)
  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)
  const resetimgItemList = useResetRecoilState(imgItemListState)
  const [comment, setcomment] = useState(commentObject.content)
  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  // console.log(imgItemList)

  const onSubmit = () => {
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
      resetimgItemList()
      navigate(`/community/detail/${questionId}`)
    } else {
      setInfoValid(false)
    }
  }

  const {
    addComment: { mutate: mutateByAddComment },
    editComment: { mutate: mutateByEditComment },
  } = useSearchCommentQuery()

  const {
    addSubComment: { mutate: mutateByAddSubComment },
  } = useSearchSubCommentQuery()

  console.log('imgItemList in comment upload', imgItemList)
  const onAddComment = async () => {
    const itemsWithImgFile = imgItemList.filter((item) => item.imgFile)
    const s3 = new S3Service()
    const imgURL = await s3.postCommentImg(itemsWithImgFile)
    const newComment: IAddComment = {
      questionId: Number(questionId),
      content: comment,
      imgList: itemsWithImgFile ? imgURL : null,
      itemList: commentObject.itemList,
    }
    console.log('newComment', newComment)

    if (pathname === '/community/comment/upload') mutateByAddComment(newComment)
    if (pathname === '/community/subcomment/upload')
      mutateByAddSubComment({ ...newComment, commentId: state.id })
    if (pathname === '/community/comment/edit') {
      // console.log('commentObject', commentObject)
      if (commentObject.id) {
        const newComment: IEditComment = {
          questionId: Number(questionId),
          commentId: commentObject.id,
          content: comment,
          imgList: itemsWithImgFile ? imgURL : null,
          itemList: commentObject.itemList,
        }
        // console.log('newComment', newComment)
        mutateByEditComment(newComment)
      }
    }
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

  const onAddPhotos = () => {
    if (pathname === '/community/comment/edit') {
      navigate('/community/comment/comment-item-photo', { state: 'edit' })
    } else navigate('/community/comment/comment-item-photo')
  }

  return (
    <CommentUploadContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title={'댓글 달기'}>
          <span className='submit' onClick={onSubmit}>
            등록
          </span>
        </Header>
      </HeaderWrapper>
      <AddItemPhotos size={103.5} onClick={onAddPhotos}></AddItemPhotos>
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
