import { atom, useRecoilState } from 'recoil'
import useInterestCelebQuery from '../../../../../apis/user/hooks/useInterestCelebQuery'
import BlackFilter from '../../../../../components/FIlter/BlackFilter'
import { atomKeys } from '../../../../../config/atomKeys'
import { FilterListWrapper } from '../styles'

export const selectedInterestCelebState = atom<number>({
  key: atomKeys.selectedInterestCelebState,
  default: 0,
})

const InterestCelebList = () => {
  const [selectedInterestCeleb, setselectedInterestCeleb] = useRecoilState(
    selectedInterestCelebState,
  )
  const {
    getInterestCeleb: { data: interestCelebList },
  } = useInterestCelebQuery()
  console.log(interestCelebList)
  return (
    <FilterListWrapper>
      <BlackFilter
        isSelected={selectedInterestCeleb === 0}
        onClick={() => setselectedInterestCeleb(0)}
      >
        전체
      </BlackFilter>
      {(interestCelebList?.length ?? 0) > 0 &&
        interestCelebList?.map((celeb) => {
          return (
            <BlackFilter
              key={celeb.id ? 'interest' + celeb.id : 'interest' + celeb.newCelebId}
              isSelected={
                celeb.id
                  ? selectedInterestCeleb === celeb.id
                  : selectedInterestCeleb === celeb.newCelebId
              }
              onClick={() => setselectedInterestCeleb(celeb.id ?? celeb.newCelebId)}
            >
              {celeb.celebNameKr ?? celeb.newCelebName}
            </BlackFilter>
          )
        })}
    </FilterListWrapper>
  )
}

export default InterestCelebList
