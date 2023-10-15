import { ChangeEvent, FocusEvent, useState, MouseEvent } from 'react'
import { VALIDATION_ERROR_CASE } from './consts'
import { NameTagService } from '../../services'

export const validateEditInputText = (text: string): keyof typeof VALIDATION_ERROR_CASE | null => {
  if (text) {
    if (text.length >= 13) return 'maxLength'
    if (text.length <= 1) return 'minLength'
  }
  return null
}

type UseNameTagProps = Pick<NameTagService, 'onSave'>

export const useNameTag = ({ onSave }: UseNameTagProps) => {
  const [showValidationTooltip, setShowValidationTooltip] = useState<boolean>(false)
  const [tooltipText, setTooltipText] = useState<string>('')

  const handleFocusOut = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setShowValidationTooltip(false)
    setTooltipText('')
    onSave?.(e.target.value)
  }

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const errorKey = validateEditInputText(e.target.value)
    if (errorKey !== null) {
      setTooltipText(VALIDATION_ERROR_CASE[errorKey])
      setShowValidationTooltip(true)
      return
    }
    setTooltipText('')
    setShowValidationTooltip(false)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const errorKey = validateEditInputText(e.target.value)
    if (errorKey) {
      setTooltipText(VALIDATION_ERROR_CASE[errorKey])
    } else {
      setTooltipText(VALIDATION_ERROR_CASE.initial)
    }
    setShowValidationTooltip(true)
  }

  // for stop event bubbling to modal
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return {
    handlers: {
      handleChangeInputValue,
      handleFocus,
      handleFocusOut,
      handleClick,
    },
    states: {
      showValidationTooltip,
      tooltipText,
    },
  }
}
