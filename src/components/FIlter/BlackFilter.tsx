import React from 'react'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

interface FilterProps {
  children: any
  isSelected: boolean
  onClick: any
}

const BlackFilter = ({ children, isSelected, onClick }: FilterProps) => {
  return (
    <FilterWrapper isSelected={isSelected} onClick={() => onClick()}>
      {children}
    </FilterWrapper>
  )
}

export default BlackFilter

export const FilterWrapper = styled.div<{ isSelected: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  height: 2.625rem;
  min-width: 3.625rem;
  padding: 0.5rem 0.75rem;
  border-radius: 1.5625rem;
  background-color: ${(props) =>
    props.isSelected ? `${Common.colors.BK}` : `${Common.colors.WH}`};
  ${(props) =>
    props.isSelected
      ? Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.WH })
      : Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.GR600 })}

  border:${(props) =>
    props.isSelected ? '1px solid ${Common.colors.BK}' : `1px solid ${Common.colors.GR300}`};
`
