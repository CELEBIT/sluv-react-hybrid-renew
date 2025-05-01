import { atom, useRecoilState } from 'recoil'
import useInterestCelebQuery from '../../../../../apis/user/hooks/useInterestCelebQuery'
import BlackFilter from '../../../../../components/FIlter/BlackFilter'
import { atomKeys } from '../../../../../config/atomKeys'
import { FilterListWrapper } from '../styles'

export type TCeleb = {
  celebId: number
  isNewCeleb: boolean
}

export const selectedInterestCelebState = atom<TCeleb>({
  key: atomKeys.selectedInterestCelebState,
  default: { celebId: 0, isNewCeleb: false },
})

const InterestCelebList = () => {
  const [selectedInterestCeleb, setselectedInterestCeleb] = useRecoilState(
    selectedInterestCelebState,
  )
  const {
    getInterestCeleb: { data: interestCelebList },
  } = useInterestCelebQuery()
  return (
    <FilterListWrapper>
      <BlackFilter
        isSelected={selectedInterestCeleb.celebId === 0}
        onClick={() => setselectedInterestCeleb({ celebId: 0, isNewCeleb: false })}
      >
        전체
      </BlackFilter>
      {(interestCelebList?.length ?? 0) > 0 &&
        interestCelebList?.map((celeb) => {
          return (
            <BlackFilter
              key={celeb.id + celeb.isNewCeleb.toString()}
              isSelected={
                celeb.id === selectedInterestCeleb.celebId &&
                celeb.isNewCeleb === selectedInterestCeleb.isNewCeleb
              }
              onClick={() =>
                setselectedInterestCeleb({ celebId: celeb.id, isNewCeleb: celeb.isNewCeleb })
              }
            >
              {celeb.celebNameKr}
            </BlackFilter>
          )
        })}
    </FilterListWrapper>
  )
}

export default InterestCelebList
