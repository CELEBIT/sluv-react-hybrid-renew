import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const ItemCreatePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`

export const Label = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
`
export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2.5rem;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 5.625rem;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  .error {
    margin-top: -0.5rem;
  }
`

export const BottomBar = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  bottom: 0;
  padding: 0 1rem;
  background-color: white;
  border-top: 1px solid ${Common.colors.GR300};
  width: 100%;
  margin-left: calc(-1.25rem);
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 0.5rem;
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
  }
`
