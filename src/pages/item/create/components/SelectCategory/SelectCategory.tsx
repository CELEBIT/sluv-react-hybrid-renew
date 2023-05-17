import React, { useEffect, useRef } from 'react'
import { modals } from '../../../../../components/Modals'
import useModals from '../../../../../components/Modals/hooks/useModals'
import useItemCategoryQuery from '../../../../../apis/item/hooks/useItemCategoryQuery'
import ButtonMedium from '../../../../../components/ButtonMedium/ButtonMedium'
import {
  Category,
  CategoryDisplayListState,
  selectedParentCategoryState,
  selectedSubCategoryState,
} from '../../../../../components/BottomSheetModal/ItemCategoryModal'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ChipWrapper } from './styles'
import { itemInfoState } from '../../../../../recoil/itemInfo'

const SelectCategory = () => {
  const { openModal } = useModals()
  const selectRef = useRef<HTMLDivElement>(null)

  const {
    getItemCategory: { data },
  } = useItemCategoryQuery()

  const itemInfo = useRecoilValue(itemInfoState)

  const [categoryDisplayList, setCategoryDisplayList] = useRecoilState(CategoryDisplayListState)
  const [selectedParentCategory, setSelectedParentCategory] = useRecoilState(
    selectedParentCategoryState,
  )
  const setSelectedSubCategory = useSetRecoilState(selectedSubCategoryState)

  const onCategoryClick = (category: Category) => {
    openModal(modals.ItemCategoryModal)
    console.log(itemInfo.itemCategory?.parentCategoryId)
    setSelectedParentCategory({
      id: itemInfo.itemCategory?.parentCategoryId
        ? itemInfo.itemCategory?.parentCategoryId
        : category.id ?? -1,
      name: itemInfo.itemCategory?.parentName
        ? itemInfo.itemCategory?.parentName
        : category.name ?? '오류',
      subCategoryList: category.subCategoryList,
    })
    console.log(category)
    if (category.id === 9) {
      setSelectedSubCategory({ id: 9, name: '기타' })
    } else {
      setSelectedSubCategory({ id: 0, name: '' })
    }
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

  // useEffect(() => {
  //   if (data) {
  //     const updatedList = data.filter((category) => category.id !== selectedParentCategory.id)
  //     if (selectedParentCategory.id !== 9) {
  //       const newDisplayItem = {
  //         id: selectedParentCategory.id,
  //         name:
  //           data?.find((category) => category.id === selectedParentCategory.id)?.name +
  //           '>' +
  //           selectedSubCategory.name,
  //         subCategoryList: selectedParentCategory.subCategoryList,
  //       }
  //       setCategoryDisplayList([newDisplayItem, ...updatedList])
  //     } else {
  //       const newDisplayItem = {
  //         id: selectedParentCategory.id,
  //         name: selectedParentCategory.name,
  //       }
  //       setCategoryDisplayList([newDisplayItem, ...updatedList])
  //       // setSelectedSubCategory(newDisplayItem)
  //     }
  //   }
  // }, [selectedParentCategory, selectedSubCategory])

  useEffect(() => {
    if (!data) {
      return
    }
    const parentCategoryId = itemInfo.itemCategory?.parentCategoryId
    const filteredListByParent = data.filter((category) => category.id !== parentCategoryId)
    if (parentCategoryId !== 9) {
      const newDisplayItem = {
        id: parentCategoryId ?? -1,
        name:
          (itemInfo.itemCategory?.parentName ?? '오류') + '>' + itemInfo.itemCategory?.childName,
        subCategoryList: selectedParentCategory.subCategoryList,
      }
      setCategoryDisplayList([newDisplayItem, ...filteredListByParent])
    } else {
      const newDisplayItem = {
        id: itemInfo.itemCategory?.parentCategoryId ?? -1,
        name: itemInfo.itemCategory?.parentName ?? '오류',
      }
      setCategoryDisplayList([newDisplayItem, ...filteredListByParent])
    }
  }, [itemInfo.itemCategory?.parentCategoryId, itemInfo.itemCategory?.categoryId])

  return (
    <ChipWrapper ref={selectRef}>
      {itemInfo.itemCategory?.parentCategoryId && itemInfo.itemCategory?.categoryId ? (
        <>
          {categoryDisplayList?.map((category) => {
            return (
              <ButtonMedium
                key={category.id}
                text={category.name}
                icon={true}
                type='pri'
                active={
                  itemInfo.itemCategory?.parentCategoryId === category.id &&
                  itemInfo.itemCategory?.categoryId !== 0
                }
                onClick={() => onCategoryClick(category)}
              ></ButtonMedium>
            )
          })}
        </>
      ) : (
        <>
          {itemInfo.itemCategory?.parentCategoryId === 9 ? (
            <>
              {categoryDisplayList?.map((category) => {
                return (
                  <ButtonMedium
                    key={category.id}
                    text={category.name}
                    icon={true}
                    type='pri'
                    active={itemInfo.itemCategory?.parentCategoryId === category.id}
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
                        itemInfo.itemCategory?.parentCategoryId === 9
                          ? true
                          : itemInfo.itemCategory?.parentCategoryId === category.id &&
                            itemInfo.itemCategory?.categoryId !== 0
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
  )
}

export default SelectCategory
