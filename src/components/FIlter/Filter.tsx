import React from 'react'
import { ColorIndicator, FilterWrapper } from './styles'
import { ReactComponent as ArrowDown } from '../../assets/arrow_down_18.svg'
import { Common } from '../styles'

interface FilterProps {
  children: any
  isSelected: boolean
  onClick: any
  hasArrow?: boolean
  isColor?: boolean
  color?: string
}

const Filter = ({ children, isSelected, onClick, hasArrow, isColor, color }: FilterProps) => {
  return (
    <FilterWrapper isSelected={isSelected} isColor={isColor} onClick={() => onClick()}>
      {isColor && color && <ColorIndicator color={color}></ColorIndicator>}
      <span>{children}</span>
      {hasArrow && (
        <>
          {isSelected ? (
            <ArrowDown stroke='#212529'></ArrowDown>
          ) : (
            <ArrowDown stroke='#C7CED4'></ArrowDown>
          )}
        </>
      )}
    </FilterWrapper>
  )
}

export default Filter
