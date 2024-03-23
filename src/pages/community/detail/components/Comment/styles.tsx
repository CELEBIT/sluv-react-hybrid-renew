import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.5rem 1.5rem 0 1.5rem;
  gap: 0.5rem;
  border-top: 1px solid ${Common.colors.GR200};
`

export const CommentExpression = styled.div`
  display: flex;
  padding: 0 1.25rem 1.5rem 1.25rem;
  /* border-bottom: 1px solid ${Common.colors.GR200}; */
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

export const BannedContent = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
`

export const NickName = styled.span`
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const Time = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
`

export const UserImg = styled.div<{ imgUrl: string }>`
  width: 2.25rem;
  height: 2.25rem;
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
  background-color: ${Common.colors.GR50};
  padding: 1.25rem;
  margin-top: 1.25rem;
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
    z-index: 30;
  }
`

export const BlockedContainer = styled.div`
  display: flex;
  padding: 0.75rem 1.25rem;
`

export const BlockedBg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: c;
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  background-color: ${Common.colors.GR100};
  border-radius: 1rem;
  gap: 0.5rem;
`
