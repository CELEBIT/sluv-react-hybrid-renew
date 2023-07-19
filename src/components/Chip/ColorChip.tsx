import React from 'react'
// import { Common } from '../styles'
import { ChipWrapper, ColorChipWrapper } from './styles'
import { ReactComponent as Delete } from '../../assets/chipDelete_24.svg'

interface ColorChipProps {
  children: React.ReactNode
  color: string
  active: boolean
  canDelete?: boolean
  onClick: () => void
  onDelete?: () => void
}

const ColorChip = ({ children, active, color, canDelete, onClick, onDelete }: ColorChipProps) => {
  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onDelete?.()
  }
  return (
    <ColorChipWrapper active={active} canDelete={canDelete} color={color}>
      <p onClick={onClick}>{children}</p>
      {canDelete ? (
        <div onClick={handleDeleteClick}>
          <Delete style={{ width: '24px', height: '1.5rem' }} />
        </div>
      ) : (
        <></>
      )}
    </ColorChipWrapper>
  )
}

export default ColorChip
