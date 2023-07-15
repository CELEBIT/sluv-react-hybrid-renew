import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'

export const SubCommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;
`
// 대댓글
export const SubCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
`

export const SubCommentLeft = styled.div`
  display: flex;
  padding: 1.5rem 0 1.5rem 1.25rem;
`
export const SubCommentRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem 1.25rem 1.5rem 0.5rem;
  border-bottom: 1px solid ${Common.colors.GR200};
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

export const Content = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
`

export const ContentLeft = styled.div`
  display: flex;
`
export const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`
export const ContentTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
`

export const CommentContent = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const NickName = styled.span`
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const Time = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
`

export const UserImg = styled.div<{ imgUrl: string }>`
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
  overflow-x: scroll;
  padding: 1.25rem;
  border: 1px solid orange;
`

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  height: 5.4375rem;
  width: 14rem;
  padding-right: 1.125rem;
  gap: 0.5rem;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const CelebName = styled.span`
  margin-bottom: 0.375rem;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
`
export const BrandName = styled.span`
  margin-bottom: 0.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.GR600 })}
`
export const ItemName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.GR600 })}
`

export const Img = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  position: relative;
  width: 5.4375rem;
  height: 5.4375rem;
  border-radius: 0.5rem;
  background-color: grey;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  .represent {
    position: absolute;
    right: 0.25rem;
    bottom: 0.25rem;
  }
`

export const ExpressionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1.25rem;
  span {
    ${Pretendard({ size: 13, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
`

export const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const ShowMoreSubCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  padding: 1.5rem 1.25rem 0 1.25rem;
  span {
    margin-left: 0.375rem;
  }
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.BK })}
`
