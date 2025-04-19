import React from 'react'
// import { Common } from '../styles'
import { ReactComponent as Delete } from '../../assets/chipDelete_24.svg'
import { ChipWrapper } from './styles'

interface ChipProps {
  text: string
  canDelete?: boolean
  onClick: () => void
  onDelete?: () => void
}

const Chip = ({ text, canDelete, onClick, onDelete }: ChipProps) => {
  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onDelete?.()
  }
  return (
    <ChipWrapper canDelete={canDelete}>
      <p onClick={onClick}>{text}</p>
      {canDelete ? (
        <div onClick={handleDeleteClick}>
          <Delete style={{ width: '24px', height: '1.5rem' }} />
        </div>
      ) : (
        <></>
      )}
    </ChipWrapper>
  )
}

export default React.memo(Chip)
