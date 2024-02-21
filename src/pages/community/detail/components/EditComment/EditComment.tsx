import React, { useEffect, useState } from 'react'
import { CommentUploadContainer, HeaderWrapper, TextFieldWrapper } from '../CommentUpload/styles'
import Header from '../../../../../components/Header/Header'
import AddItemPhotos from '../../../../../components/AddPhotos/AddItemPhotos'
import TextArea from '../../../../../components/TextField/TextArea/TextArea'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { commentQuestionIdState, commentState } from '../../CommunityDetail'
import { IselectedItem, imgItemListState } from '../../../../../recoil/communityInfo'
import { CommentResult, Item } from '../../../../../apis/comment/commentService.type'

const EditComment = () => {
  const location = useLocation()
  // location.state로 받지 말고 edit할 comment state 만들어서 관리해야돼.
  const navigate = useNavigate()

  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const [imgItemList, setImgItemList] = useRecoilState(imgItemListState)

  const handleCommentChange = (newValue: string) => {
    setCommentObject((prevComment) => ({
      ...prevComment,
      content: newValue,
    }))
  }
  // const handleComplete = () => {}

  // useEffect(() => {
  //   if (commentObject && commentObject?.itemList) {
  //     const transformedItemList = location.state.itemList.map((item: Item) => ({
  //       itemId: item.item.itemId,
  //       sortOrder: item.sortOrder,
  //     }))
  //     setCommentObject({
  //       content: commentObject.content,
  //       imgList: commentObject.imgList,
  //       itemList: transformedItemList,
  //     })
  //     const transformedItemImgList: Array<IselectedItem> = commentObject.itemList.map(
  //       (item: Item, index: number) => ({
  //         description: null,
  //         vote: null,
  //         representFlag: index === 0,
  //         itemId: item.item.itemId,
  //         imgUrl: item.item.imgUrl,
  //       }),
  //     )
  //     setImgItemList(transformedItemImgList)
  //   } else {
  //     setCommentObject({
  //       content: commentData.content,
  //       imgList: commentData.imgUrlList,
  //       itemList: null,
  //     })
  //   }
  // }, [])

  return (
    <CommentUploadContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title={'댓글 수정'}>
          <span className='submit'>완료</span>
        </Header>
      </HeaderWrapper>
      <AddItemPhotos
        size={103.5}
        onClick={() => navigate('/community/comment/comment-item-photo', { state: 'edit' })}
      ></AddItemPhotos>
      <TextFieldWrapper>
        <TextArea
          value={commentObject.content ?? ''}
          setValue={handleCommentChange}
          placeholder='아이템과 함께 올릴 댓글을 적어주세요'
          //   error={hasSubmitted ? !infoValid : false}
          errorMsg='댓글 입력 또는 아이템을 선택해 주세요'
        ></TextArea>
      </TextFieldWrapper>
    </CommentUploadContainer>
  )
}

export default EditComment
