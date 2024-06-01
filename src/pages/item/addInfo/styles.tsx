import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const AddInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const HeaderWrapper = styled.div`
  padding: 0 1.25rem;
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
  padding: 1rem 1.25rem;
`
export const HashTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  padding: 0 0 1.25rem 0;
  ${Pretendard({ size: 16, weight: Common.bold.thin, color: Common.colors.BK })}

  .searchedTags {
    display: flex;
    flex-shrink: 1;
    overflow-x: scroll;
    white-space: wrap;
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
  .searchedTags {
    display: flex;
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
