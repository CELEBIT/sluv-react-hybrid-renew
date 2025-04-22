import { useParams } from 'react-router-dom'
import useInterestCelebQuery from '../../../../../apis/user/hooks/useInterestCelebQuery'
import ColorChip, { ColorType } from '../../../../../components/Chip/ColorChip'
import { ChipWrapper } from '../styles'

const InterestCelebList = () => {
  const { id } = useParams()
  const getColorForCategory = (category: string | undefined): ColorType => {
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
      case '추가된 셀럽':
        return 'purple'
      default:
        return 'gray'
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
              key={celeb.id ?? celeb.newCelebId}
              color={getColorForCategory(celeb.celebCategory)}
              active={true}
              size='small'
            >
              {celeb.celebNameKr ?? celeb.newCelebName}
            </ColorChip>
          )
        })}
      </ChipWrapper>
    )
  } else {
    const {
      getInterestCeleb: { data: interestCelebList },
    } = useInterestCelebQuery()
    console.log(interestCelebList)
    return (
      <ChipWrapper>
        {interestCelebList?.map((celeb) => {
          return (
            <ColorChip
              key={celeb.id ?? celeb.newCelebId}
              color={getColorForCategory(celeb.celebCategory)}
              active={true}
              size='small'
              canDelete={false}
            >
              {celeb.celebNameKr ?? celeb.newCelebName}
            </ColorChip>
          )
        })}
      </ChipWrapper>
    )
  }
}

export default InterestCelebList
