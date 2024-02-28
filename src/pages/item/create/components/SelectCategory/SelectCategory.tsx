import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useModals from '../../../../../components/Modals/hooks/useModals'
import useItemCategoryQuery from '../../../../../apis/item/hooks/useItemCategoryQuery'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  Category,
  parentCategoryState,
  subCategoryState,
} from '../../../../../components/BottomSheetModal/ItemCategoryModal'
import ButtonMedium from '../../../../../components/ButtonMedium/ButtonMedium'
import { modals } from '../../../../../components/Modals'
import { ChipWrapper } from './styles'
import { itemInfoState } from '../../../../../recoil/itemInfo'

function SelectCategory() {
  const { openModal } = useModals()
  const activeCategoryRef = useRef<HTMLDivElement>(null)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const {
    getItemCategory: { data },
  } = useItemCategoryQuery()
  console.log('category data', data)

  const [parentCategory, setParentCategory] = useRecoilState(parentCategoryState)
  const subCategory = useRecoilValue(subCategoryState)

  const onCategoryClick = (category: Category) => {
    setParentCategory({
      ...parentCategory,
      id: category.id,
      name: category.name,
      subCategoryList: category.subCategoryList,
    })
    openModal(modals.ItemCategoryModal)
  }

  useEffect(() => {
    if (parentCategory.id && data) {
      setParentCategory({
        ...parentCategory,
        subCategoryList: data[parentCategory.id - 1].subCategoryList,
      })
    }
    if (parentCategory && subCategory) {
      setItemInfo({
        ...itemInfo,
        itemCategory: {
          categoryId: subCategory.id,
          childName: subCategory.name,
          parentCategoryId: parentCategory.id,
          parentName: parentCategory.name,
        },
      })
    }
  }, [])

  // scroll 관련
  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [parentCategory])

  return (
    <ChipWrapper>
      {data?.map((category) => {
        return (
          <ButtonMedium
            key={category.id}
            // 상위 + > + 하위
            text={
              parentCategory.id && subCategory.id && category.id === parentCategory.id
                ? `${parentCategory.name}>${subCategory.name}`
                : category.name
            }
            icon={true}
            type='pri'
            active={parentCategory.id === category.id}
            onClick={() => onCategoryClick(category)}
            ref={parentCategory.id === category.id ? activeCategoryRef : null}
          ></ButtonMedium>
        )
      })}
    </ChipWrapper>
  )
}

export default SelectCategory
