import React, { useState } from 'react'
import ColorChip from '../../components/Chip/ColorChip'
import { ChipWrapper } from '../../components/BottomSheetModal/ItemPlaceInputModal/ItemPlaceInputModal'
import {
  CategoryContentWrapper,
  CategoryTitle,
  CelebCategoryWrapper,
  CelebListWrapper,
  ContentWrapper,
  SelectCelebContainer,
  TitleSearchWrapper,
} from './styles'
import Header from '../../components/Header/Header'
import SearchTextfield from '../../components/TextField/SearchTextfield/SearchTextfield'
import { HeaderWrapper } from '../item/addInfo/styles'
import useSelectCelebQuery from '../../apis/celeb/hooks/useSelectCelebQuery'
import { Category } from '../item/detail/styles'

const SelectCeleb = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSearchField, setShowSearchField] = useState(false)

  const { getSelectCelebList } = useSelectCelebQuery()
  const { data } = getSelectCelebList

  // POST API 용 CelebId List 필요
  // 선택한 관심셀럽 확인 및 수정용 Category[{CelebId, CelebName}] List 필요

  const colorList = ['pink', 'orange', 'yellow', 'green', 'blue']
  console.log(data)
  return (
    <SelectCelebContainer>
      {!isFocused ? (
        <>
          <HeaderWrapper>
            <Header isModalHeader={false} hasArrow={true}></Header>
          </HeaderWrapper>
          <ContentWrapper>
            <TitleSearchWrapper>
              <span>
                관심 있는 셀럽 태그를 <br />
                선택해 주세요
              </span>
              <SearchTextfield
                value={searchValue}
                setValue={setSearchValue}
                placeholder='셀럽을 검색해 주세요'
              ></SearchTextfield>
            </TitleSearchWrapper>
            {data?.map((Category) => {
              return (
                <CelebCategoryWrapper key={Category.categoryId}>
                  <CategoryContentWrapper>
                    <CategoryTitle>{Category.categoryName}</CategoryTitle>

                    <CelebListWrapper>
                      {Category.celebList.map((celeb) => {
                        return (
                          <ColorChip
                            key={celeb.celebId}
                            color={colorList[Category.categoryId - 1]}
                            active={true}
                            onClick={() => console.log(celeb.celebName)}
                          >
                            {celeb.celebName}
                          </ColorChip>
                        )
                      })}
                    </CelebListWrapper>
                  </CategoryContentWrapper>
                </CelebCategoryWrapper>
              )
            })}
          </ContentWrapper>
        </>
      ) : (
        <></>
      )}
    </SelectCelebContainer>
  )
}

export default SelectCeleb
