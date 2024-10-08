import React from 'react'
import useSearchCommentQuery from '../../../../../apis/comment/hooks/useSearchCommentQuery'

import { ReactComponent as ShowMore } from '../../../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../../assets/storage_on_24.svg'
import {
  BannedContent,
  BlockedBg,
  BlockedContainer,
  BrandName,
  CelebName,
  CommentContainer,
  CommentContent,
  CommentExpression,
  CommentWrapper,
  ContentLeft,
  ContentRight,
  ContentTop,
  ContentWrapper,
  Img,
  Item,
  ItemName,
  ItemTextWrapper,
  ItemWrapper,
  NickName,
  Time,
  UserImg,
  UserInfo,
} from './styles'
import { formatUpdatedAt } from '../../../../../utils/utility'
import SubCommentList from '../SubCommentList/SubCommentList'
import { ExpressionWrapper, LikeWrapper } from '../SubCommentList/styles'
import { ReactComponent as LikeOff } from '../../../../../assets/like_off_18.svg'
import { ReactComponent as LikeOn } from '../../../../../assets/like_on_18.svg'
import { ReactComponent as Alert } from '../../../../../assets/bannedError_20.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CommentResult,
  Item as CommentItem,
  Img as CommentImg,
} from '../../../../../apis/comment/commentService.type'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { commentState } from '../../CommunityDetail'
import { Dim } from '../../../../../components/UserImage/UserImage'
import { imgItemListState } from '../../../../../recoil/communityInfo'
import { ReactComponent as DefaultProfile } from '../../../../../assets/defaultProfile_40.svg'
import { RequestEditItemState } from '../../../../item/editRequest'
import CommentBlur from './CommentBlur'

interface CommentProps {
  questionId: number
  commentId: number
  isPreview?: boolean
}

const Comment = ({ questionId, commentId, isPreview }: CommentProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { openModal } = useModals()
  const setCommentObject = useSetRecoilState(commentState)
  const resetCommentObject = useResetRecoilState(commentState)
  const setEditReportItemState = useSetRecoilState(RequestEditItemState)
  const setImageItemList = useSetRecoilState(imgItemListState)

  const { getComment, getTestComment } = useSearchCommentQuery()
  const { data: comment } = getComment(commentId)
  // const { data: comment } = getTestComment(commentId)
  console.log(comment)

  function convertToUTC(dateString: string): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + 9)
    return date.toUTCString()
  }
  const {
    likeComment: { mutate: mutateByLike },
  } = useSearchCommentQuery()
  const onClickLike = (commentId: number, questionId: number) => {
    mutateByLike({ commentId, questionId })
  }

  const mergeAndSort = (comment: CommentResult): (CommentImg | CommentItem)[] => {
    const mergedList: (CommentImg | CommentItem)[] = []
    // imgUrlList가 있는 경우 복사
    if (comment.imgUrlList) {
      mergedList.push(...comment.imgUrlList)
    }
    // itemList가 있는 경우 복사
    if (comment.itemList) {
      mergedList.push(...comment.itemList)
    }
    // sortOrder를 기준으로 정렬
    mergedList.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

    return mergedList
  }

  if (comment) {
    const sortedList = mergeAndSort(comment)

    const onShowMore = () => {
      if (comment.itemList) {
        const transformedItemList = comment.itemList.map((item: CommentItem) => ({
          itemId: item.item.itemId,
          sortOrder: item.sortOrder,
        }))
        setCommentObject({
          id: comment.id,
          content: comment.content,
          imgList: comment.imgUrlList,
          itemList: transformedItemList,
        })
      } else {
        setCommentObject({
          id: comment.id,
          content: comment.content,
          imgList: comment.imgUrlList,
          itemList: null,
        })
      }

      let sortedImgUrlList: CommentImg[] = []
      let sortedItemList: CommentItem[] = []
      // console.log(comment.imgUrlList)
      // console.log(comment.itemList)
      if (comment.imgUrlList && comment.imgUrlList.length > 0) {
        const imgUrlListCopy = [...comment.imgUrlList]
        sortedImgUrlList = imgUrlListCopy.sort((a, b) => a.sortOrder - b.sortOrder)
      }
      // console.log('sortedImgUrlList', sortedImgUrlList)
      if (comment.itemList && comment.itemList.length > 0) {
        const itemListCopy = [...comment.itemList]
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
      if (comment.hasMine) {
        openModal(modals.CommentEditModal, {
          commentId: comment.id,
          questionId,
          callbackFunc: () => resetCommentObject(),
        })
      } else {
        setEditReportItemState({
          itemId: Number(comment.id),
          itemWriterId: comment.user.id,
          itemWriterName: comment.user.nickName,
          questionId: questionId,
        })
        openModal(modals.CommentReportModal, { callbackFunc: () => resetCommentObject() })
      }
    }

    const onProfileClick = (id: number, hasMine: boolean) => {
      if (hasMine) {
        navigate('/user')
      } else {
        navigate(`/user/${id}`)
      }
    }
    return (
      <CommentWrapper key={comment.id}>
        <ContentWrapper>
          <ContentLeft onClick={() => onProfileClick(comment.user.id, comment.hasMine)}>
            {comment.user.profileImgUrl ? (
              <UserImg imgUrl={comment.user.profileImgUrl}></UserImg>
            ) : (
              <DefaultProfile style={{ width: '2.25rem', height: '2.25rem' }}></DefaultProfile>
            )}
          </ContentLeft>
          <ContentRight>
            <ContentTop>
              <UserInfo>
                <NickName onClick={() => onProfileClick(comment.user.id, comment.hasMine)}>
                  {comment.user.id !== -1 ? comment.user.nickName : '탈퇴한 유저'}
                </NickName>
                <Time>{formatUpdatedAt(comment.createdAt)}</Time>
              </UserInfo>
              {comment.commentStatus === 'ACTIVE' && <ShowMore onClick={onShowMore}></ShowMore>}
            </ContentTop>
            {comment.commentStatus === 'ACTIVE' && (
              <CommentContent>{comment.content}</CommentContent>
            )}
          </ContentRight>
        </ContentWrapper>
        {comment.commentStatus !== 'ACTIVE' && (
          <BlockedContainer>
            <BlockedBg>
              <Alert></Alert>
              <BannedContent>
                {comment.commentStatus === 'BLOCKED'
                  ? 'AI가 부적절한 댓글을 감지했어요'
                  : '댓글 작성자가 삭제한 댓글이에요'}
              </BannedContent>
            </BlockedBg>
          </BlockedContainer>
        )}

        {sortedList && sortedList.length > 0 && (
          <ItemWrapper>
            {sortedList.map((each) => {
              if ('imgUrl' in each) {
                // 각 요소가 Img인지 확인
                return (
                  <Item key={each.imgUrl} className='img'>
                    <Img imgUrl={each.imgUrl}>
                      <Dim></Dim>
                    </Img>
                  </Item>
                )
              } else if ('item' in each) {
                // 각 요소가 Item인지 확인
                return (
                  <Item
                    key={each.item.imgUrl}
                    onClick={() => navigate(`/item/detail/${each.item.itemId}`)}
                  >
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
              }
              return null // 모든 경우에 대해 값을 반환하도록 추가합니다.
            })}
          </ItemWrapper>
        )}
        {comment.commentStatus === 'ACTIVE' && (
          <CommentExpression>
            <ExpressionWrapper>
              <span
                onClick={
                  location.pathname.includes('detail')
                    ? () =>
                        navigate('/community/comment/subcomment', {
                          state: { comment, questionId },
                        })
                    : undefined
                }
              >
                답글 달기
              </span>
              <LikeWrapper>
                <span>{comment.likeNum}</span>
                {comment.likeStatus ? (
                  <LikeOn onClick={() => onClickLike(comment.id, questionId)}></LikeOn>
                ) : (
                  <LikeOff onClick={() => onClickLike(comment.id, questionId)}></LikeOff>
                )}
              </LikeWrapper>
            </ExpressionWrapper>
          </CommentExpression>
        )}
        <SubCommentList comment={comment} questionId={questionId}></SubCommentList>
      </CommentWrapper>
    )
  } else {
    return null
  }
}

export default Comment
