import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const EditItemInfo = styled.div<{ size?: number }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 1.25rem;
  gap: 0.625rem;
  border-bottom: 1px solid ${Common.colors.GR300};
  .infoText {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .itemInfoText {
      display: flex;
      flex-direction: column;
    }
  }
`

export const RequestContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 1.25rem;
`

export const RequestContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: ${Common.colors.BG};
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.75rem;
`
export const ContentTitle = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })};
`
export const Content = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.thin, color: Common.colors.BK })};
  user-select: text;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  width: 100%;
`

export const StyledLink = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.thin, color: Common.colors.BK })};
  text-decoration: underline;
  cursor: pointer;
  word-break: break-all;
  word-wrap: break-word;
  user-select: text;
`
