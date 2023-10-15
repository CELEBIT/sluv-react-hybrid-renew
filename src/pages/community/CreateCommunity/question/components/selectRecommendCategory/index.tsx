import React from 'react'
import { useRecoilState } from 'recoil'
import { communityItemState } from '../../../../../../recoil/communityInfo'
import { MenuSelectWrapper } from '../selectQuestionMenu/styles'
import ButtonMedium from '../../../../../../components/ButtonMedium/ButtonMedium'
import { RecommendCategory } from '../../../../../../config/communityMenu'

const SelectRecommendCategory = () => {
  const [questionItem, setQuestionItem] = useRecoilState(communityItemState)
  const onClickCategory = (menu: string) => {
    const updatedCategoryList = questionItem.categoryNameList
      ? [...questionItem.categoryNameList]
      : []
    const categoryIndex = updatedCategoryList.indexOf(menu)

    if (categoryIndex === -1) {
      if (updatedCategoryList.length >= 3) {
        alert('최대 3개까지 선택할 수 있어요')
        return
      }
      updatedCategoryList.push(menu)
    } else {
      updatedCategoryList.splice(categoryIndex, 1)
    }

    setQuestionItem((prevState) => ({
      ...prevState,
      categoryNameList: updatedCategoryList,
    }))
    console.log('categoryNameList', questionItem.categoryNameList)
  }
  return (
    <MenuSelectWrapper>
      {RecommendCategory.map((menu) => {
        return (
          <ButtonMedium
            key={menu}
            type='pri'
            text={menu}
            active={
              (questionItem.categoryNameList && questionItem.categoryNameList.includes(menu)) ||
              undefined
            }
            onClick={() => onClickCategory(menu)}
          ></ButtonMedium>
        )
      })}
    </MenuSelectWrapper>
  )
}

export default SelectRecommendCategory
