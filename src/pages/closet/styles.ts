import styled from '@emotion/styled'

export const Root = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-left: 0;
  background-color: white;
  /* padding-bottom: 3.125rem;/ */
  ::-webkit-scrollbar {
    display: none;
  }
`

export const HeaderContainer = styled.header`
  width: 100%;
  margin-bottom: 8px;
`

export const BodyContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 0.75rem;
  flex-direction: column;
  padding: 0 1.25rem 4.375rem 1.25rem;
  /* padding-bottom: 4.375rem; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const SubHeader = styled.section`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`

export const SubHeaderTitleWrapper = styled.p<{ fontColor?: string }>`
  flex: 1;
  width: 100%;
  font-weight: 500;
  font-family: Pretendard;
  line-height: 18px;
  font-size: 15px;
  color: ${({ fontColor }) => fontColor ?? '#000000'};
`
