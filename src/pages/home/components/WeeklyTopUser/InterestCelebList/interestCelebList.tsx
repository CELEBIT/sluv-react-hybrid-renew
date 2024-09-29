import React from 'react'
import { FilterListWrapper } from '../styles'
import BlackFilter from '../../../../../components/FIlter/BlackFilter'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../../../../config/atomKeys'
import useInterestCelebQuery from '../../../../../apis/user/hooks/useInterestCelebQuery'

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
              key={'interest' + celeb.id}
              isSelected={selectedInterestCeleb === celeb.id}
              onClick={() => setselectedInterestCeleb(celeb.id)}
            >
              {celeb.celebNameKr}
            </BlackFilter>
          )
        })}
    </FilterListWrapper>
  )
}

export default InterestCelebList
