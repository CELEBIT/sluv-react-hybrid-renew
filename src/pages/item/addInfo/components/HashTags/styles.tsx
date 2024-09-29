import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'

export const Container = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  width: 100%;
  ${Pretendard({ size: 16, weight: Common.bold.thin, color: Common.colors.BK })}
`

export const HashTagInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  line-height: 1.5em;
  max-height: 4.5em;

  &::placeholder {
    color: #999;
  }
`
export const TagInputContainer = styled.div`
  display: block;
  padding: 0 1.25rem;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  word-wrap: break-word;
  white-space: wrap;
  overflow-wrap: break-word;
  word-break: break-all;
  box-sizing: border-box;
  line-height: 1.5em;
  ${Pretendard({ size: 16, weight: Common.bold.thin, color: Common.colors.BK })}
  &::placeholder {
    color: #999;
  }
`

export const Tag = styled.span`
  margin-right: 0.25rem;
`

export const TagInput = styled.input<{ placeholder?: string; value?: string }>`
  border: none;
  outline: none;
  white-space: wrap;
  flex-grow: 1;
  ${Pretendard({ size: 16, weight: Common.bold.thin, color: Common.colors.BK })}
  width: ${(props) =>
    props.placeholder === '' ? `calc(3ch + ${props.value?.length ?? 0}ch)` : 'auto'};
`
export const SearchedHashTag = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  .count {
    margin: 0 4px;
  }
  .symbol {
    margin-right: 2px;
  }
`
