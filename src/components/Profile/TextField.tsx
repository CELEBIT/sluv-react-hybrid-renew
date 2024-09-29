import { FocusEventHandler, forwardRef, InputHTMLAttributes, useState } from 'react'
import Input from './Input'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import Flex from '../Flex'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hasError, helpMessage, onFocus, onBlur, ...props },
  ref,
) {
  const [focused, setFocused] = useState(false)

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(false)
    onBlur?.(event)
  }

  return (
    <Flex align='center' direction='column'>
      <Input
        ref={ref}
        aria-invalid={hasError}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />

      {helpMessage ? <ErrorMessage>{helpMessage}</ErrorMessage> : null}
    </Flex>
  )
})

export default TextField

export const ErrorMessage = styled.span`
  text-align: center;
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.ERROR })}
`
