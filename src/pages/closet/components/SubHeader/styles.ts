import styled from '@emotion/styled'

export const Root = styled.header`
  height: 3.125rem;
  width: 100%;
  box-sizing: border-box;
`

export const PaddedRoot = styled.header`
  padding: 0 1.5rem;
  width: 100%;
  box-sizing: border-box;
`

export const Layout = styled.div`
  display: flex;
  gap: 0.75rem;
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
