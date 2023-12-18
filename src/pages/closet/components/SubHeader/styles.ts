import styled from '@emotion/styled'

export const Root = styled.header`
  height: 50px;
  width: 100%;
  box-sizing: border-box;
`

export const PaddedRoot = styled.header`
  padding: 12px 24px 12px 24px;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
`

export const Layout = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
`

export const LeftPaneContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`

export const RightPaneContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 0;
`

export const InnerItemGrid = styled.div`
  display: flex;
`
