import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const ItemCreatePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-left: 0;
  background-color: white;
  padding-bottom: 3.4375rem;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1.25rem;
  gap: 0.25rem;
`

export const Label = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
  .optional {
    ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.GR500 })}
  }
`
export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2.5rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 1.25rem;
  /* padding-bottom: 5.625rem; */
  ::-webkit-scrollbar {
    display: none;
  }
  .padding {
    padding: 0 1.25rem;
  }
  .top {
    padding-top: 1.25rem;
  }
  .noGap {
    gap: 0;
  }
`

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  .error {
    margin-top: -0.5rem;
    margin-left: 1.25rem;
  }
`

export const BottomBar = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  bottom: 0;
  z-index: 10;
  padding: 0 1rem;
  background-color: white;
  border-top: 1px solid ${Common.colors.GR300};
  width: 100%;
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
