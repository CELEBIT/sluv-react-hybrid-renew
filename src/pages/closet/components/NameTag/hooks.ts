import { ChangeEvent, FocusEvent, useState, MouseEvent, useContext, useEffect } from 'react'
import { VALIDATION_ERROR_CASE } from './consts'
import { NameTagService } from '../../services'
import { useDebouncedCallback } from 'use-debounce'
import { getClosetCheckName } from '../../../../apis/closet'
import { CreateClosetFormContext } from '../../create'

export const validateEditInputText = (text: string): keyof typeof VALIDATION_ERROR_CASE | null => {
  if (text) {
    if (text.length >= 13) return 'maxLength'
    if (text.length <= 1) return 'minLength'
  }
  return null
}

type UseNameTagProps = Pick<NameTagService, 'onSave' | 'closetBox'> & {
  validators?: (() => boolean)[]
  editMode: boolean
}

export const useNameTag = ({ onSave, closetBox, editMode }: UseNameTagProps) => {
  const [showTooltipValidation, setShowTooltipValidation] = useState<boolean>(false)
  const [tooltipText, setTooltipText] = useState<string>('')
  const [hasValidationError, setHasValidationError] = useState<boolean>(false)
  const context = useContext(CreateClosetFormContext)
  const nameText = context?.states.name
  const setNameText = context?.handlers.setName

  const handleFocusOut = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setShowTooltipValidation(false)
    if (nameText != null) {
      onSave?.(nameText)
    }
  }

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNameText?.(e.target.value)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setShowTooltipValidation(true)
  }

  useEffect(() => {
    // handleTooltipText

    if (editMode) {
      if (nameText != null) {
        const errorKey = validateEditInputText(nameText)
        if (errorKey) {
          setTooltipText(VALIDATION_ERROR_CASE[errorKey])
          setShowTooltipValidation(true)
        } else {
          setTooltipText(VALIDATION_ERROR_CASE.initial)
          setShowTooltipValidation(false)
        }
      }
    }
  }, [nameText])

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
      showTooltipValidation,
      tooltipText,
      nameText,
    },
  }
}
