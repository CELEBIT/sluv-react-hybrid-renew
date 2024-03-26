import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.25rem 2.5rem 1.25rem;
  gap: 1rem;
`
export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`
export const Title = styled.div`
  ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.1875rem;
`
export const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`

export const UserName = styled.div`
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const VoteStatus = styled.div<{ color?: string }>`
  ${({ color }) =>
    color === 'red'
      ? Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.ERROR })
      : Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
`
