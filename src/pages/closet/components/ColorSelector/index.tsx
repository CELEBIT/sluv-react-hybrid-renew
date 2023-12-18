import React, { useContext } from 'react'
import * as S from './styles'
import { CoverBoxColorKey, DEFAULT_COVER_COLOR_SET } from '../../utils/consts'
import { CreateClosetFormContext } from '../../create'

const checkDefaultColor = (color: CoverBoxColorKey) => {
  return color === 'PURPLE' || color === 'DEFAULT'
}

const ColorSelector = () => {
  const context = useContext(CreateClosetFormContext)

  if (!context) return <></>

  const handleSelectColor = (color: CoverBoxColorKey) => {
    context.handlers.setColor(color)
  }

  return (
    <S.Root>
      <S.Layout>
        {Object.keys(DEFAULT_COVER_COLOR_SET).map((colorKey) => {
          const color: CoverBoxColorKey = colorKey as CoverBoxColorKey
          if (checkDefaultColor(color)) return
          return (
            <S.ColorCircleWrapper key={color}>
              <S.SelectedDot isSelected={context.states.colorScheme === color} />
              <S.ColorCircle
                colorScheme={color}
                onClick={() => {
                  handleSelectColor(color)
                }}
              />
            </S.ColorCircleWrapper>
          )
        })}
      </S.Layout>
    </S.Root>
  )
}

export default ColorSelector
