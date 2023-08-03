import React from 'react'
import useSelectCelebQuery from '../../../apis/celeb/hooks/useSelectCelebQuery'
import { useDebounce } from 'use-debounce'
import {
  CategoryContentWrapper,
  CategoryTitle,
  CelebCategoryWrapper,
  CelebListWrapper,
  ContentWrapper,
  SearchResultContainer,
} from '../styles'
import ColorChip from '../../../components/Chip/ColorChip'
import { ISelectCelebResult } from '../../../apis/celeb/CelebService'
import { useRecoilState } from 'recoil'
import { selectInterestCelebState } from '..'

interface CelebSearchResultProps {
  celebName: string
}

const CelebSearchResult = ({ celebName }: CelebSearchResultProps) => {
  const [debouncedSearch] = useDebounce(celebName, 300)
  const { searchSelectCeleb } = useSelectCelebQuery()
  const { data } = searchSelectCeleb(debouncedSearch)
  console.log(data)
  const getSelectedCelebIds = (celebResults: Array<ISelectCelebResult>): Array<number> => {
    const celebIds: Array<number> = []
    for (const celebResult of celebResults) {
      for (const celeb of celebResult.celebList) {
        celebIds.push(celeb.celebId)
      }
    }

    return celebIds
  }
  const [selectedInterestCeleb, setSelectedInterestCeleb] = useRecoilState(selectInterestCelebState)
  const celebIds = getSelectedCelebIds(selectedInterestCeleb)
  const colorList = ['pink', 'orange', 'yellow', 'green', 'blue']
  const handleColorChipClick = (
    categoryId: number,
    celebId: number,
    celebName: string,
    isSelected: boolean,
  ) => {
    setSelectedInterestCeleb((prevInterestCelebs) => {
      const updatedInterestCelebs = prevInterestCelebs.map((category) => {
        if (category.categoryId === categoryId) {
          const updatedCelebList = isSelected
            ? category.celebList.filter((celeb) => celeb.celebId !== celebId)
            : [...category.celebList, { celebId, celebName }]

          return {
            ...category,
            celebList: updatedCelebList,
          }
        }
        return category
      })
      return updatedInterestCelebs
    })
  }
  return (
    <SearchResultContainer>
      {data?.map((Category, index) => {
        if (Category.subCelebList.length > 0) {
          return (
            <CelebCategoryWrapper key={Category.id} id={Category.celebNameKr}>
              <CategoryContentWrapper>
                <CategoryTitle>{Category.celebNameKr}</CategoryTitle>
                <CelebListWrapper open={true}>
                  {Category.subCelebList.map((celeb) => {
                    const isSelected = celebIds.includes(celeb.id)
                    return (
                      <ColorChip
                        key={celeb.id}
                        color={colorList[index]}
                        active={isSelected}
                        onClick={() =>
                          handleColorChipClick(Category.id, celeb.id, celeb.celebNameKr, isSelected)
                        }
                      >
                        {celeb.celebNameKr}
                      </ColorChip>
                    )
                  })}
                </CelebListWrapper>
              </CategoryContentWrapper>
            </CelebCategoryWrapper>
          )
        } else {
          return null
        }
      })}
    </SearchResultContainer>
  )
}

export default CelebSearchResult
