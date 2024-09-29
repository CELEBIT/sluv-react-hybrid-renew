import { useEffect, useRef } from 'react'
import useModals from '../../../../../components/Modals/hooks/useModals'
import useItemCategoryQuery from '../../../../../apis/item/hooks/useItemCategoryQuery'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Category,
  parentCategoryState,
} from '../../../../../components/BottomSheetModal/ItemCategoryModal'
import ButtonMedium from '../../../../../components/ButtonMedium/ButtonMedium'
import { modals } from '../../../../../components/Modals'
import { ChipWrapper } from './styles'
import { createItemCategoryState, itemInfoState } from '../../../../../recoil/itemInfo'

function SelectCategory() {
  const { openModal } = useModals()
  const activeCategoryRef = useRef<HTMLDivElement>(null)

  const category = useRecoilValue(createItemCategoryState)

  const {
    getItemCategory: { data },
  } = useItemCategoryQuery()

  // display용 value
  const [parentCategory, setParentCategory] = useRecoilState(parentCategoryState)

  const onCategoryClick = (each: Category) => {
    setParentCategory({
      ...parentCategory,
      id: each.id,
      name: each.name,
      subCategoryList: each.subCategoryList,
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
  }, [])

  // scroll 관련
  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [category])

  return (
    <ChipWrapper>
      {data?.map((each) => {
        return (
          <ButtonMedium
            key={each.id}
            // 상위 + > + 하위
            text={
              category?.parentCategoryId &&
              category.categoryId &&
              each.id === category?.parentCategoryId
                ? `${category.parentName}>${category.childName}`
                : each.name
            }
            icon={true}
            type='pri'
            active={category?.parentCategoryId === each.id && category.categoryId !== 0}
            onClick={() => onCategoryClick(each)}
            ref={category?.parentCategoryId === each.id ? activeCategoryRef : null}
          ></ButtonMedium>
        )
      })}
    </ChipWrapper>
  )
}

export default SelectCategory
