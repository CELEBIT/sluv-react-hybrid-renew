import React from 'react'
import { DisplayFieldWrapper, SingleField, FirstField, MiddleField, LastField } from './styles'
import { ErrorText } from '../DefaultTextfield/styles'

interface DisplayFieldProps {
  children: React.ReactNode
  disabled?: boolean
  error?: boolean
  errorMsg?: string
}
const DisplayField = ({ children, disabled, error, errorMsg }: DisplayFieldProps) => {
  const childrenCount = React.Children.count(children)

  if (childrenCount === 1) {
    return (
      <DisplayFieldWrapper>
        <SingleField disabled={disabled}>{children}</SingleField>
        {error && <ErrorText>{errorMsg}</ErrorText>}
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
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </DisplayFieldWrapper>
  )
}

export default DisplayField