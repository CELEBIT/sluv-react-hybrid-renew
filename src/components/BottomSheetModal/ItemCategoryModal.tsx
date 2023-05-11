import React, { useEffect, useRef } from 'react'
import BottomSheetModal from '.'
import useItemCategoryQuery from '../../apis/item/hooks/useItemCategoryQuery'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../config/atomKeys'
import { ModalWrapper } from './ItemBrandSelectModal/ItemBrandSelectModal'
import { ButtonWrapper, ChipWrapper } from './ItemPlaceInputModal'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import ButtonLarge from '../ButtonLarge/ButtonLarge'

export const CategoryDisplayListState = atom<Category[]>({
  key: atomKeys.CategoryListState,
  default: [
    {
      id: 0,
      name: '',
      parentId: 0,
      parentName: '',
      subCategoryList: [],
    },
  ],
})

export const selectedParentCategoryState = atom<Category>({
  key: atomKeys.selectedParentCategoryIdState,
  default: {
    id: 0,
    name: '',
  },
})
export const selectedSubCategoryState = atom<Category>({
  key: atomKeys.selectedSubCategoryIdState,
  default: {
    id: 0,
    name: '',
  },
})

export interface Category {
  id: number
  name: string
  parentId?: 0
  parentName?: ''
  subCategoryList?: Category[]
}

const ItemCategoryModal = () => {
  const { closeModal } = useModals()
  const [selectedParentCategory, setSelectedParentCategory] = useRecoilState(
    selectedParentCategoryState,
  )
  const [selectedSubCategory, setSelectedSubCategory] = useRecoilState(selectedSubCategoryState)

  const onComplete = () => {
    closeModal(modals.ItemCategoryModal)
  }
  const onParentClick = (category: Category) => {
    setSelectedParentCategory(category)
    setSelectedSubCategory({
      id: 0,
      name: '',
    })
  }
  const onSubClick = (category: Category) => {
    setSelectedSubCategory(category)
  }

  const {
    getItemCategory: { data },
  } = useItemCategoryQuery()

  const subCategories = selectedParentCategory?.subCategoryList || []
  const activeCategoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [])
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header
            isModalHeader={true}
            title={'아이템 종류'}
            modalCloseBtnClick={() => closeModal(modals.ItemCategoryModal)}
          />
        </div>
        <ChipWrapper>
          {(data?.length ?? 0) > 0 &&
            data?.map((category) => {
              return (
                <ButtonMedium
                  key={category.id}
                  text={category.name}
                  type='pri'
                  active={selectedParentCategory.id === category.id}
                  onClick={() => onParentClick(category)}
                  ref={selectedParentCategory.id === category.id ? activeCategoryRef : null}
                ></ButtonMedium>
              )
            })}
        </ChipWrapper>
        {subCategories.length > 0 && (
          <>
            <CategoryLabel>{selectedParentCategory?.name} 종류</CategoryLabel>
            <SubCategoryWrapper>
              {subCategories.map((category) => {
                return (
                  <ButtonMedium
                    key={category.id}
                    text={category.name}
                    type='pri'
                    active={selectedSubCategory.id === category.id}
                    onClick={() => onSubClick(category)}
                  ></ButtonMedium>
                )
              })}
            </SubCategoryWrapper>
          </>
        )}

        <ButtonWrapper>
          <ButtonLarge
            text='완료'
            active={selectedParentCategory.id < 9 ? selectedSubCategory.id !== 0 : true}
            onClick={onComplete}
          ></ButtonLarge>
        </ButtonWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemCategoryModal

const SubCategoryWrapper = styled.div`
  display: flex;

  padding: 0.5rem 1.25rem;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const CategoryLabel = styled.span`
  padding: 0.5625rem 1.25rem;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR600,
  })}
`
