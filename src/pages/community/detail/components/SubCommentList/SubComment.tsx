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
import { CommentResult, SubCommentResult } from '../../../../../apis/comment/commentService.type'
import { formatUpdatedAt } from '../../../../../utils/utility'

import { ReactComponent as ShowMore } from '../../../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../../assets/storage_on_24.svg'
import { ReactComponent as LikeOff } from '../../../../../assets/like_off_18.svg'
import { ReactComponent as LikeOn } from '../../../../../assets/like_on_18.svg'
import { ReactComponent as SubCommentArrow } from '../../../../../assets/arrow_comment_18.svg'
import useSearchSubCommentQuery from '../../../../../apis/comment/hooks/useSearchSubCommentQuery'
import { useNavigate } from 'react-router-dom'
interface SubCommentProps {
  subcomment: SubCommentResult
  comment: CommentResult
}

const SubComment = ({ subcomment, comment }: SubCommentProps) => {
  const navigate = useNavigate()
  function convertToUTC(dateString: string): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + 9)
    return date.toUTCString()
  }

  const {
    likeSubComment: { mutate: mutateByLike },
  } = useSearchSubCommentQuery()
  const onClickLike = (commentId: number, subCommentId: number) => {
    console.log('clicked')
    mutateByLike({ commentId, subCommentId })
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
                  <NickName>{subcomment.user.nickName}</NickName>
                  <Time>{formatUpdatedAt(convertToUTC(subcomment.createdAt))}</Time>
                </UserInfo>
                <ShowMore></ShowMore>
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
          <span onClick={() => navigate('/community/comment/subcomment', { state: { comment } })}>
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
