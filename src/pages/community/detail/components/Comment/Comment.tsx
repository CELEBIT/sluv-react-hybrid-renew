import React from 'react'
import useSearchCommentQuery from '../../../../../apis/comment/hooks/useSearchCommentQuery'
import EmptyState from '../../../../../components/EmptyState'

import { ReactComponent as ShowMore } from '../../../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../../assets/storage_on_24.svg'
import {
  BrandName,
  CelebName,
  CommentContainer,
  CommentContent,
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

interface CommentProps {
  questionId: number
}

const Comment = ({ questionId }: CommentProps) => {
  const { getComment } = useSearchCommentQuery()
  const { data } = getComment(Number(questionId))
  console.log('comment', data)
  function convertToUTC(dateString: string): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + 9)
    return date.toUTCString()
  }

  if (data && data.length > 0) {
    return (
      <CommentContainer>
        {data.map((comment) => {
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
                    <ShowMore></ShowMore>
                  </ContentTop>
                  <CommentContent>{comment.content}</CommentContent>
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
              <SubCommentList commentId={comment.id}></SubCommentList>
            </CommentWrapper>
          )
        })}
      </CommentContainer>
    )
  } else {
    return (
      <EmptyState
        icon='comment'
        title='아직 댓글이 없어요'
        subtitle='스러버를위해 첫 댓글을 남겨보세요'
      ></EmptyState>
    )
  }
}

export default Comment
