import React, { forwardRef } from 'react'
import * as S from './NameTag.styles'

import { AddIcon, LockIcon } from './NameTag.styles'
import ToolTip from '../../../../components/ToolTip/ToolTip'
import NameTagEditIcon from '../../../../assets/closet_name_tag_edit_icon.svg'
import { useNameTag } from './hooks'
import { NameTagService } from '../../services'

export type NameTagProps = { service: NameTagService }

const NameTag = forwardRef<HTMLInputElement, NameTagProps>(function RenderNameTag(
  { service },
  ref,
) {
  const { closetBox, editMode, onSave, isSortingLocation = false } = service
  const {
    handlers: { handleChangeInputValue, handleFocus, handleFocusOut, handleClick },
    states: { showValidationTooltip, tooltipText },
  } = useNameTag({ onSave })

  return (
    <S.RootContainer onClick={handleClick}>
      <S.Layout colorScheme={closetBox.colorScheme}>
        <S.TitleWrapper>
          {editMode ? (
            <>
              <S.NameTagEditInput
                onBlur={handleFocusOut}
                onFocus={handleFocus}
                onChange={handleChangeInputValue}
                ref={ref}
                placeholder={'옷장 이름을 입력해 주세요'}
                type='text'
              />
              <ToolTip
                left={'-2.5rem'}
                arrowPosition={'top-left'}
                isVisible={showValidationTooltip}
              >
                {tooltipText}
              </ToolTip>
            </>
          ) : (
            closetBox.name
          )}
        </S.TitleWrapper>
        <S.IconContainer>
          {!isSortingLocation && closetBox.closetStatus === 'PRIVATE' && (
            <SideLockIcon editMode={editMode} />
          )}
          {isSortingLocation && <SideEditIcon />}
          {<SideAddIcon editMode={editMode} />}
        </S.IconContainer>
      </S.Layout>
    </S.RootContainer>
  )
})

type LockIconProps = {
  editMode: boolean
}
export const SideLockIcon = ({ editMode }: LockIconProps) => {
  return <LockIcon editMode={editMode} />
}

type AddIconProps = {
  editMode: boolean
}
export const SideAddIcon = ({ editMode }: AddIconProps) => {
  return <AddIcon editMode={editMode} />
}

type EditIconProps = {
  testProps?: any
}
export const SideEditIcon = ({}: EditIconProps) => {
  return <NameTagEditIcon />
}

export default NameTag
