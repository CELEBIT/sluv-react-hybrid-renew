import React, { useEffect, useRef } from 'react'
import { modals } from '../../../../../components/Modals'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { Label, SelectCelebWrapper } from '../../../../../components/SelectCeleb/styles'
import useItemCategoryQuery from '../../../../../apis/item/hooks/useItemCategoryQuery'
import ButtonMedium from '../../../../../components/ButtonMedium/ButtonMedium'
import {
  Category,
  CategoryDisplayListState,
  selectedParentCategoryState,
  selectedSubCategoryState,
} from '../../../../../components/BottomSheetModal/ItemCategoryModal'
import { useRecoilState } from 'recoil'
import { ChipWrapper } from './styles'

const SelectCategory = () => {
  const { openModal } = useModals()
  const selectRef = useRef<HTMLDivElement>(null)

  const {
    getItemCategory: { data },
  } = useItemCategoryQuery()

  const [categoryDisplayList, setCategoryDisplayList] = useRecoilState(CategoryDisplayListState)
  const [selectedParentCategory, setSelectedParentCategory] = useRecoilState(
    selectedParentCategoryState,
  )
  const [selectedSubCategory, setSelectedSubCategory] = useRecoilState(selectedSubCategoryState)

  const onCategoryClick = (category: Category) => {
    openModal(modals.ItemCategoryModal)
    setSelectedParentCategory(category)
    setSelectedSubCategory({ id: 0, name: '' })
  }
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.scrollLeft = 0
    }
  }, [categoryDisplayList])
  useEffect(() => {
    if (data) {
      setCategoryDisplayList(data)
    }
  }, [data, setCategoryDisplayList])

  useEffect(() => {
    if (data) {
      const updatedList = data.filter((category) => category.id !== selectedParentCategory.id)
      if (selectedParentCategory.id !== 9) {
        const newDisplayItem = {
          id: selectedParentCategory.id,
          name: selectedParentCategory.name + '>' + selectedSubCategory.name,
          subCategoryList: selectedParentCategory.subCategoryList,
        }
        setCategoryDisplayList([newDisplayItem, ...updatedList])
      } else {
        const newDisplayItem = {
          id: selectedParentCategory.id,
          name: selectedParentCategory.name,
        }
        setCategoryDisplayList([newDisplayItem, ...updatedList])
      }
    }
  }, [selectedParentCategory, selectedSubCategory])

  return (
    <SelectCelebWrapper>
      <Label>어떤 아이템인가요?</Label>
      <ChipWrapper ref={selectRef}>
        {selectedParentCategory.id !== 0 && selectedSubCategory.id !== 0 ? (
          <>
            {categoryDisplayList?.map((category) => {
              return (
                <ButtonMedium
                  key={category.id}
                  text={category.name}
                  icon={true}
                  type='pri'
                  active={selectedParentCategory.id === category.id && selectedSubCategory.id !== 0}
                  onClick={() => onCategoryClick(category)}
                ></ButtonMedium>
              )
            })}
          </>
        ) : (
          <>
            {selectedParentCategory.id === 9 ? (
              <>
                {categoryDisplayList?.map((category) => {
                  return (
                    <ButtonMedium
                      key={category.id}
                      text={category.name}
                      icon={true}
                      type='pri'
                      active={selectedParentCategory.id === category.id}
                      onClick={() => onCategoryClick(category)}
                    ></ButtonMedium>
                  )
                })}
              </>
            ) : (
              <>
                {(data?.length ?? 0) > 0 &&
                  data?.map((category) => {
                    return (
                      <ButtonMedium
                        key={category.id}
                        text={category.name}
                        icon={true}
                        type='pri'
                        active={
                          selectedParentCategory.id === 9
                            ? true
                            : selectedParentCategory.id === category.id &&
                              selectedSubCategory.id !== 0
                        }
                        onClick={() => onCategoryClick(category)}
                      ></ButtonMedium>
                    )
                  })}
              </>
            )}
          </>
        )}
      </ChipWrapper>
    </SelectCelebWrapper>
  )
}

export default SelectCategory
