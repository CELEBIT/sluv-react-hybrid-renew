import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../components/styles'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0;
  gap: 1.25rem;
`
export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  padding-left: 1.5rem;
`
export const UserImg = styled.div<{ imgUrl: string }>`
  flex-shrink: 0;
  width: 4.625rem;
  height: 4.625rem;
  border-radius: 50%;
  border: 1px solid orange;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl ?? (props.imgUrl || '')});
`
export const InfoRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5625rem 0;
`

export const InfoTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
`
export const InfoBottomWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.625rem;
`
export const Line = styled.div`
  width: 1px;
  height: 100%;
  border-left: 1px solid ${Common.colors.GR300};
`
export const FollowWrapper = styled.div`
  display: flex;
  gap: 4px;
`
export const FollowText = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
`
export const FollowNumber = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const InterestCelebWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
`

export const ChipWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  overflow: scroll;
  padding: 0 1.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ArrowDim = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1.25rem;
`
export const ArrowWrapper = styled.div`
  display: flex;
  background-color: white;
  z-index: 10;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 50%;
  border: 1px solid ${Common.colors.GR600};
`
