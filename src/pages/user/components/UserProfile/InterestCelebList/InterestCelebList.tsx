import React from 'react'
import { ChipWrapper } from '../styles'
import useInterestCelebQuery from '../../../../../apis/user/hooks/useInterestCelebQuery'
import ColorChip from '../../../../../components/Chip/ColorChip'
import { useParams } from 'react-router-dom'

const InterestCelebList = () => {
  const { id } = useParams()
  const getColorForCategory = (category: string | undefined) => {
    switch (category) {
      case '가수':
        return 'pink'
      case '배우':
        return 'orange'
      case '방송인':
        return 'yellow'
      case '스포츠인':
        return 'green'
      case '인플루언서':
        return 'blue'
      default:
        return ''
    }
  }
  if (id) {
    const { getOtherUserInterestCeleb } = useInterestCelebQuery()
    const { data: interestCelebList } = getOtherUserInterestCeleb(Number(id))
    return (
      <ChipWrapper>
        {interestCelebList?.map((celeb) => {
          return (
            <ColorChip
              key={celeb.id}
              color={getColorForCategory(celeb.celebCategory)}
              active={true}
              size='small'
            >
              {celeb.celebNameKr}
            </ColorChip>
          )
        })}
      </ChipWrapper>
    )
  } else {
    const {
      getInterestCeleb: { data: interestCelebList },
    } = useInterestCelebQuery()
    return (
      <ChipWrapper>
        {interestCelebList?.map((celeb) => {
          return (
            <ColorChip
              key={celeb.id}
              color={getColorForCategory(celeb.celebCategory)}
              active={true}
              size='small'
            >
              {celeb.celebNameKr}
            </ColorChip>
          )
        })}
      </ChipWrapper>
    )
  }
}

export default InterestCelebList
