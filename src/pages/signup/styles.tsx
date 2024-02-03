import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100vw;
  height: 100%;
  margin-left: calc(-50vw + 50%);
  .headerRight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.25rem;
  }
`
export const Content = styled.div`
  padding: 0 20px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${Common.colors.GR200};
  margin: 0.75rem 0;
`
export const Title = styled.span`
  ${Pretendard({ size: 24, weight: Common.bold.semiBold, color: Common.colors.BK })}
  margin-bottom: 1.5rem;
`
