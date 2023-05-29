import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const TStoragePageStyle = styled.main`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
`

export const HeaderWrap = styled.div`
  padding: 0 1.25rem;
  font-size: 1.0625rem;
  font-weight: ${Common.bold.regular};
`

export const SelectedCtnDiv = styled.div`
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR600,
  })};
  padding: 0.5625rem 0.25rem;

  span {
    color: ${Common.colors.BK};
  }
`

export const ListWrap = styled.div``
