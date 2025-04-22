import { ReactNode } from 'react'
import { ReactComponent as Delete } from '../../assets/delete_18.svg'
import { Common } from '../styles'
import { ColorChipWrapper } from './styles'

export type ColorType = 'pink' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray'

interface ColorChipProps {
  children: ReactNode
  color: ColorType
  active: boolean
  size?: string
  canDelete?: boolean
  onClick?: () => void
  onDelete?: () => void
}

const colorMap: Record<ColorType, string> = {
  pink: Common.colors.PK,
  orange: Common.colors.ORG,
  yellow: Common.colors.YL,
  green: Common.colors.GRN,
  blue: Common.colors.BL,
  purple: Common.colors.PRI,
  gray: Common.colors.GR100,
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
  const chipColor = colorMap[color]

  return (
    <ColorChipWrapper active={active} canDelete={canDelete} color={color} size={size}>
      <p onClick={onClick}>{children}</p>
      {canDelete && (
        <div onClick={handleDeleteClick}>
          <Delete stroke={chipColor} />
        </div>
      )}
    </ColorChipWrapper>
  )
}

export default ColorChip
