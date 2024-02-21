import React from 'react'
import useSearchCommentQuery from '../../../../../apis/comment/hooks/useSearchCommentQuery'

import { ReactComponent as ShowMore } from '../../../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../../assets/storage_on_24.svg'
import {
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
import { ReactComponent as Alert } from '../../../../../assets/info_18.svg'
import { useNavigate } from 'react-router-dom'
import { CommentResult, Item as CommentItem } from '../../../../../apis/comment/commentService.type'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import { useSetRecoilState } from 'recoil'
import { commentState } from '../../CommunityDetail'
interface CommentProps {
  questionId: number
  comment: CommentResult
}

const Comment = ({ questionId, comment }: CommentProps) => {
  const navigate = useNavigate()
  const { openModal } = useModals()
  const setCommentObject = useSetRecoilState(commentState)

  function convertToUTC(dateString: string): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + 9)
    return date.toUTCString()
  }
  console.log(comment)
  const {
    likeComment: { mutate: mutateByLike },
  } = useSearchCommentQuery()
  const onClickLike = (commentId: number, questionId: number) => {
    mutateByLike({ commentId, questionId })
  }
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

    openModal(modals.CommentEditModal)
  }

  return (
    <CommentWrapper key={comment.id}>
      <ContentWrapper>
        <ContentLeft>
          <UserImg imgUrl={comment.user.profileImgUrl}></UserImg>
        </ContentLeft>
        <ContentRight>
          <ContentTop>
            <UserInfo>
              <NickName>{comment.user.nickName}</NickName>
              <Time>{formatUpdatedAt(convertToUTC(comment.createdAt))}</Time>
            </UserInfo>
            <ShowMore onClick={onShowMore}></ShowMore>
          </ContentTop>
          {comment.commentStatus === 'ACTIVE' ? (
            <CommentContent>{comment.content}</CommentContent>
          ) : (
            <BlockedContainer>
              <Alert></Alert>
              <CommentContent>AI에 의해 필터링된 댓글입니다.</CommentContent>
            </BlockedContainer>
          )}
        </ContentRight>
      </ContentWrapper>
      {comment.itemList && comment.itemList.length > 0 && (
        <ItemWrapper>
          {comment.itemList.map((each) => {
            return (
              <Item key={each.item.itemId}>
                <Img imgUrl={each.item.imgUrl}>
                  {each.item.scrapStatus ? (
                    <StorageOn className='represent'></StorageOn>
                  ) : (
                    <StorageOff className='represent'></StorageOff>
                  )}
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
      <CommentExpression>
        <ExpressionWrapper>
          <span
            onClick={() =>
              navigate('/community/comment/subcomment', { state: { comment, questionId } })
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
      <SubCommentList comment={comment} questionId={questionId}></SubCommentList>
    </CommentWrapper>
  )
}

export default Comment
