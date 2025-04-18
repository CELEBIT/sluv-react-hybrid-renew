import React, { useEffect, useState } from 'react'
// import { Common } from '../styles'
import { ReactComponent as Delete } from '../../assets/delete_18.svg'
import { Common } from '../styles'
import { ColorChipWrapper } from './styles'

interface ColorChipProps {
  children: React.ReactNode
  color: string
  active: boolean
  size?: string
  canDelete?: boolean
  onClick?: () => void
  onDelete?: () => void
}

const ColorChip = ({
  children,
  active,
  color,
  size,
  canDelete,
  onClick,
  onDelete,
}: ColorChipProps) => {
  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onDelete?.()
  }
  const [chipColor, setChipColor] = useState('black')
  useEffect(() => {
    if (color === 'pink') {
      setChipColor(Common.colors.PK)
    } else if (color === 'orange') {
      setChipColor(Common.colors.ORG)
    } else if (color === 'yellow') {
      setChipColor(Common.colors.YL)
    } else if (color === 'green') {
      setChipColor(Common.colors.GRN)
    } else if (color === 'blue') {
      setChipColor(Common.colors.BL)
    } else if (color === 'purple') {
      setChipColor(Common.colors.PRI)
    }
  })

  return (
    <ColorChipWrapper active={active} canDelete={canDelete} color={color} size={size}>
      <p onClick={onClick}>{children}</p>
      {canDelete ? (
        <div onClick={handleDeleteClick}>
          <Delete stroke={chipColor} />
        </div>
      ) : (
        <></>
      )}
    </ColorChipWrapper>
  )
}

export default ColorChip
