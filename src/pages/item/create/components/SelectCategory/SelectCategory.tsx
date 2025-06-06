import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useItemCategoryQuery from '../../../../../apis/item/hooks/useItemCategoryQuery'
import {
  Category,
  parentCategoryState,
} from '../../../../../components/BottomSheetModal/ItemCategoryModal'
import ButtonMedium, {
  ButtonMediumProps,
} from '../../../../../components/ButtonMedium/ButtonMedium'
import { modals } from '../../../../../components/Modals'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { createItemCategoryState } from '../../../../../recoil/itemInfo'
import { ChipWrapper } from './styles'

function SelectCategory() {
  const { openModal } = useModals()
  const activeCategoryRef = useRef<HTMLDivElement>(null)

  const category = useRecoilValue(createItemCategoryState)
  console.log('🚀 ~ SelectCategory ~ category:', category)

  const iconTypes: ButtonMediumProps['icon'][] = [
    'tshirt',
    'jacket',
    'jeans',
    'skirt',
    'skirt', // onepiece도 skirt 아이콘 사용
    'beauty',
    'headphone',
    'life',
    'etc',
  ]
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
      {data?.map((each, idx) => (
        <ButtonMedium
          key={each.id}
          icon={iconTypes[idx]} // string 타입으로 전달
          text={
            category?.parentCategoryId &&
            category.categoryId &&
            each.id === category?.parentCategoryId &&
            category.childName !== ''
              ? `${category.parentName}>${category.childName}`
              : each.name
          }
          type='pri'
          active={category?.parentCategoryId === each.id}
          onClick={() => onCategoryClick(each)}
          ref={category?.parentCategoryId === each.id ? activeCategoryRef : null}
        />
      ))}
    </ChipWrapper>
  )
}

export default SelectCategory
