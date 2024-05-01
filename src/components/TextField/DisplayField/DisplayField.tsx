import React from 'react'
import { DisplayFieldWrapper, SingleField, FirstField, MiddleField, LastField } from './styles'
import { ErrorText } from '../DefaultTextfield/styles'

interface DisplayFieldProps {
  children: React.ReactNode
  disabled?: boolean
  valid?: boolean
  errorMsg?: string
  onClick?: () => void
}
const DisplayField = ({ children, disabled, valid, errorMsg, onClick }: DisplayFieldProps) => {
  const childrenCount = React.Children.toArray(children).length

  if (childrenCount === 1) {
    return (
      <DisplayFieldWrapper onClick={onClick}>
        <SingleField disabled={disabled}>{children}</SingleField>
        {!valid && <ErrorText>{errorMsg}</ErrorText>}
      </DisplayFieldWrapper>
    )
  }

  const childrenArray = React.Children.toArray(children)

  return (
    <DisplayFieldWrapper>
      <FirstField disabled={disabled}>{childrenArray[0]}</FirstField>
      {React.Children.map(childrenArray.slice(1, childrenCount - 1), (child, index) => (
        <MiddleField key={index} disabled={disabled}>
          {child}
        </MiddleField>
      ))}
      <LastField disabled={disabled}>{childrenArray[childrenCount - 1]}</LastField>
      {!valid && <ErrorText>{errorMsg}</ErrorText>}
    </DisplayFieldWrapper>
  )
}

export default DisplayField
