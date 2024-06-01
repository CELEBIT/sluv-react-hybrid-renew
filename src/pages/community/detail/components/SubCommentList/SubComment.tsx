import React from 'react'
import {
  BrandName,
  CelebName,
  CommentContent,
  Content,
  ContentLeft,
  ContentRight,
  ContentTop,
  ContentWrapper,
  ExpressionWrapper,
  Img,
  Item,
  ItemName,
  ItemTextWrapper,
  ItemWrapper,
  LikeWrapper,
  NickName,
  SubCommentContainer,
  SubCommentLeft,
  SubCommentRight,
  Time,
  UserImg,
  UserInfo,
} from './styles'
import {
  CommentResult,
  SubCommentResult,
  Item as CommentItem,
  Img as CommentImg,
} from '../../../../../apis/comment/commentService.type'
import { formatUpdatedAt } from '../../../../../utils/utility'

import { ReactComponent as ShowMore } from '../../../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../../assets/storage_on_24.svg'
import { ReactComponent as LikeOff } from '../../../../../assets/like_off_18.svg'
import { ReactComponent as LikeOn } from '../../../../../assets/like_on_18.svg'
import { ReactComponent as SubCommentArrow } from '../../../../../assets/arrow_comment_18.svg'
import useSearchSubCommentQuery from '../../../../../apis/comment/hooks/useSearchSubCommentQuery'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dim } from '../../../../../components/UserImage/UserImage'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { commentState } from '../../CommunityDetail'
import { RequestEditItemState } from '../../../../item/editRequest'
import { imgItemListState } from '../../../../../recoil/communityInfo'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
interface SubCommentProps {
  subcomment: SubCommentResult
  comment: CommentResult
  questionId: number
}

const SubComment = ({ subcomment, comment, questionId }: SubCommentProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { openModal } = useModals()

  function convertToUTC(dateString: string): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + 9)
    return date.toUTCString()
  }

  const {
    likeSubComment: { mutate: mutateByLike },
  } = useSearchSubCommentQuery()
  const onClickLike = (commentId: number, subCommentId: number) => {
    mutateByLike({ commentId, subCommentId })
  }

  const setCommentObject = useSetRecoilState(commentState)
  const resetCommentObject = useResetRecoilState(commentState)
  const setEditReportItemState = useSetRecoilState(RequestEditItemState)
  const setImageItemList = useSetRecoilState(imgItemListState)

  const onShowMore = () => {
    if (subcomment.itemList) {
      const transformedItemList = subcomment.itemList.map((item: CommentItem) => ({
        itemId: item.item.itemId,
        sortOrder: item.sortOrder,
      }))
      setCommentObject({
        id: subcomment.id,
        content: subcomment.content,
        imgList: subcomment.imgUrlList,
        itemList: transformedItemList,
      })
    } else {
      setCommentObject({
        id: subcomment.id,
        content: subcomment.content,
        imgList: subcomment.imgUrlList,
        itemList: null,
      })
    }

    let sortedImgUrlList: CommentImg[] = []
    let sortedItemList: CommentItem[] = []
    console.log(subcomment.imgUrlList)
    console.log(subcomment.itemList)
    if (subcomment.imgUrlList && subcomment.imgUrlList.length > 0) {
      const imgUrlListCopy = [...subcomment.imgUrlList]
      sortedImgUrlList = imgUrlListCopy.sort((a, b) => a.sortOrder - b.sortOrder)
    }
    // console.log('sortedImgUrlList', sortedImgUrlList)
    if (subcomment.itemList && subcomment.itemList.length > 0) {
      const itemListCopy = [...subcomment.itemList]
      sortedItemList = itemListCopy.sort((a, b) => a.sortOrder - b.sortOrder)
    }
    // console.log('sortedItemList', sortedItemList)

    // Combine sorted imgUrlList and itemList based on sortOrder
    const combinedList = [...sortedItemList, ...sortedImgUrlList].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    )
    // console.log('combinedList', combinedList)
    // Transform and store sorted items into imgItemList
    const transformedItems = combinedList.map((each) => ({
      itemId: 'item' in each ? (each as CommentItem).item.itemId : null,
      imgUrl: 'imgUrl' in each ? each.imgUrl : (each as CommentItem).item.imgUrl,
      description: null,
      representFlag: each.sortOrder === 0, // Assuming sortOrder indicates representation
      sortOrder: each.sortOrder,
    }))
    // console.log('transformedItems', transformedItems)

    setImageItemList(transformedItems)
    if (subcomment.hasMine) {
      openModal(modals.SubCommentEditModal, {
        commentId: subcomment.id,
        questionId,
        callbackFunc: () => resetCommentObject(),
      })
    } else {
      setEditReportItemState({
        itemId: Number(subcomment.id),
        itemWriterId: subcomment.user.id,
        itemWriterName: subcomment.user.nickName,
        questionId: questionId,
      })
      openModal(modals.CommentReportModal, { callbackFunc: () => resetCommentObject() })
    }
  }

  return (
    <SubCommentContainer>
      <SubCommentLeft>
        <SubCommentArrow style={{ flexShrink: 0 }}></SubCommentArrow>
      </SubCommentLeft>
      <SubCommentRight>
        <ContentWrapper>
          <Content>
            <ContentLeft>
              <UserImg imgUrl={subcomment.user.profileImgUrl}></UserImg>
            </ContentLeft>
            <ContentRight>
              <ContentTop>
                <UserInfo>
                  <NickName>
                    {subcomment.user.id !== -1 ? subcomment.user.nickName : '탈퇴한 유저'}
                  </NickName>
                  <Time>{formatUpdatedAt(subcomment.createdAt)}</Time>
                </UserInfo>
                <ShowMore onClick={onShowMore}></ShowMore>
              </ContentTop>
              <CommentContent>{subcomment.content}</CommentContent>
            </ContentRight>
          </Content>
        </ContentWrapper>
        {subcomment.itemList && subcomment.itemList.length > 0 && (
          <ItemWrapper>
            {subcomment.itemList.map((each: any) => {
              return (
                <Item key={each.item.itemId}>
                  <Img imgUrl={each.item.imgUrl}>
                    {each.item.scrapStatus ? (
                      <StorageOn className='represent'></StorageOn>
                    ) : (
                      <StorageOff className='represent'></StorageOff>
                    )}
                    <Dim></Dim>
                  </Img>
                  <ItemTextWrapper>
                    <CelebName>{each.item.celebName}</CelebName>
                    <BrandName>{each.item.brandName}</BrandName>
                    <ItemName>{each.item.itemName}</ItemName>
                  </ItemTextWrapper>
                </Item>
              )
            })}
          </ItemWrapper>
        )}
        <ExpressionWrapper>
          <span
            onClick={
              location.pathname.includes('detail')
                ? () =>
                    navigate('/community/comment/subcomment', { state: { comment, questionId } })
                : undefined
            }
          >
            답글 달기
          </span>
          <LikeWrapper>
            <span>{subcomment.likeNum}</span>
            {subcomment.likeStatus ? (
              <LikeOn onClick={() => onClickLike(comment.id, subcomment.id)}></LikeOn>
            ) : (
              <LikeOff onClick={() => onClickLike(comment.id, subcomment.id)}></LikeOff>
            )}
          </LikeWrapper>
        </ExpressionWrapper>
      </SubCommentRight>
    </SubCommentContainer>
  )
}

export default SubComment
