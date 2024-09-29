import React, { useEffect, useRef, useState } from 'react'
import BottomSheetModal from '.'
import useItemCategoryQuery from '../../apis/item/hooks/useItemCategoryQuery'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../config/atomKeys'
import { ModalWrapper } from './ItemBrandSelectModal/ItemBrandSelectModal'
import { ButtonWrapper, ChipWrapper } from './ItemPlaceInputModal/ItemPlaceInputModal'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import { createItemCategoryState, itemInfoState } from '../../recoil/itemInfo'

export const parentCategoryState = atom<Category>({
  key: atomKeys.parentCategoryIdState,
  default: {
    id: 0,
    name: '',
  },
})
export const subCategoryState = atom<Category>({
  key: atomKeys.subCategoryIdState,
  default: {
    id: 0,
    name: '',
  },
})

export interface Category {
  id: number
  name: string
  subCategoryList?: Category[]
}

const ItemCategoryModal = () => {
  const { closeModal } = useModals()

  const [category, setCategory] = useRecoilState(createItemCategoryState)

  const [selectedParentCategory, setSelectedParentCategory] = useRecoilState(parentCategoryState)
  const [subCategory, setsubCategory] = useRecoilState(subCategoryState)

  const [selectedParent, setSelectedParent] = useState<Category>({
    id:
      selectedParentCategory.id === category?.parentCategoryId
        ? category.parentCategoryId
        : selectedParentCategory.id ?? 0,
    name:
      selectedParentCategory.id === category?.parentCategoryId
        ? category?.parentName
        : selectedParentCategory.name ?? '',
    subCategoryList: selectedParentCategory.subCategoryList,
  })
  const [selectedChild, setSelectedChild] = useState<Category>({
    id: category?.categoryId ?? 0,
    name: category?.childName ?? '',
  })

  const onComplete = () => {
    closeModal(modals.ItemCategoryModal, () => {
      setCategory({
        categoryId: selectedChild.id,
        childName: selectedChild.name,
        parentCategoryId: selectedParent.id,
        parentName: selectedParent.name,
      })
    })
  }
  const onParentClick = (category: Category) => {
    setSelectedParentCategory(category)
    setSelectedParent(category)
    setsubCategory({
      id: 0,
      name: '',
    })
  }
  const onSubClick = (category: Category) => {
    setSelectedChild(category)
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
            data?.map((each) => {
              return (
                <ButtonMedium
                  key={each.id}
                  text={each.name}
                  type='pri'
                  active={selectedParent.id === each.id}
                  onClick={() => onParentClick(each)}
                  ref={selectedParent.id === each.id ? activeCategoryRef : null}
                ></ButtonMedium>
              )
            })}
        </ChipWrapper>
        <SubCategoryContainer>
          {subCategories.length > 0 && (
            <>
              <CategoryLabel>{selectedParent.name} 종류</CategoryLabel>
              <SubCategoryWrapper>
                {subCategories.map((each) => {
                  return (
                    <ButtonMedium
                      key={each.id}
                      text={each.name}
                      type='pri'
                      active={selectedChild.id === each.id}
                      onClick={() => onSubClick(each)}
                    ></ButtonMedium>
                  )
                })}
              </SubCategoryWrapper>
            </>
          )}
        </SubCategoryContainer>

        <ButtonWrapper>
          <ButtonLarge
            text='완료'
            active={selectedParent.id < 9 ? selectedChild.id !== 0 : true}
            onClick={onComplete}
          ></ButtonLarge>
        </ButtonWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemCategoryModal

const SubCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 11.875rem;
`

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
