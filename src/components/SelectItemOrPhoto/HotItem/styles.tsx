import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'

export const HotItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.4375rem;
`
export const ListWrapper = styled.div`
  display: flex;
  justify-items: center;
  overflow: scroll;
  gap: 0.625rem;

  ::-webkit-scrollbar {
    display: none;
  }
`
export const TitleText = styled.div`
  ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
`
