import React from 'react'
import { DropDownContainer, FirstField, LastField, MiddleField, SingleField } from './styles'

interface DropDownMenuProps {
  children: React.ReactNode
  onClick?: () => void
  top?: number
}
const DropDownMenu = ({ children, onClick, top }: DropDownMenuProps) => {
  const childrenCount = React.Children.toArray(children).length

  if (childrenCount === 1) {
    return (
      <DropDownContainer onClick={onClick}>
        <SingleField>{children}</SingleField>
      </DropDownContainer>
    )
  }

  const childrenArray = React.Children.toArray(children)

  return (
    <DropDownContainer top={top}>
      <FirstField>{childrenArray[0]}</FirstField>
      {React.Children.map(childrenArray.slice(1, childrenCount - 1), (child, index) => (
        <MiddleField key={index}>{child}</MiddleField>
      ))}
      <LastField>{childrenArray[childrenCount - 1]}</LastField>
    </DropDownContainer>
  )
}

export default DropDownMenu
