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
import { colorList } from '../../../config/constant'

interface CelebSearchResultProps {
  celebName: string
}

const CelebSearchResult = ({ celebName }: CelebSearchResultProps) => {
  const [debouncedSearch] = useDebounce(celebName, 300)
  const { searchSelectCeleb } = useSelectCelebQuery()
  const { data } = searchSelectCeleb(debouncedSearch)

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
        if (Category.celebList.length > 0) {
          return (
            <CelebCategoryWrapper key={Category.categoryId} id={Category.categoryName}>
              <CategoryContentWrapper>
                <CategoryTitle>{Category.categoryName}</CategoryTitle>
                <CelebListWrapper open={true}>
                  {Category.celebList.map((celeb) => {
                    const isSelected = celebIds.includes(celeb.celebId)
                    return (
                      <ColorChip
                        key={celeb.celebId}
                        color={colorList[index]}
                        active={isSelected}
                        onClick={() =>
                          handleColorChipClick(
                            Category.categoryId,
                            celeb.celebId,
                            celeb.celebName,
                            isSelected,
                          )
                        }
                      >
                        {celeb.celebName}
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
