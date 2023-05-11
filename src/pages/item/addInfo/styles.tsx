import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const AddInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const HeaderWrapper = styled.div`
  /* padding: 0 1.25rem; */
  .submit {
    ${Pretendard({
      size: 17,
      weight: Common.bold.regular,
      color: Common.colors.BK,
    })};
  }
`

export const TextFieldWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 0;
`
export const HashTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  gap: 0.5rem;
  padding: 0 0 1.25rem 0;
  .hashtag {
    display: flex;
    overflow-x: scroll;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 0 0 1.25rem;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    gap: 0.5rem;
    & > *:last-child {
      margin-right: 1.25rem;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
`
export const SourceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* padding: 1.25rem; */
  margin-top: 0.5rem;
  border-top: 1px solid ${Common.colors.GR200};
`
