import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export const ItemListGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ItemListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  flex-shrink: 0;
  gap: 0.5rem;
  row-gap: 1.5rem;
  width: 100%;
  padding: 1.25rem;
`

export const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.25rem 0 1.25rem;
`

export const ViewHeaderLeft = styled.div`
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
`
export const ViewHeaderRight = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`
