import styled from '@emotion/styled'

export const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
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
  gap: 12px;
  flex-direction: column;
  padding-bottom: 70px;
  overflow-y: scroll;
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
