import React, { useEffect } from 'react'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import BottomSheetModal from '.'
import { ModalWrapper } from './ItemBrandSelectModal/ItemBrandSelectModal'
import Header from '../Header/Header'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'
import { selectInterestCelebState } from '../../pages/selectInterestCeleb'
import {
  CategoryTitle,
  CelebCategoryWrapper,
  CelebListWrapper,
} from '../../pages/selectInterestCeleb/styles'
import ColorChip from '../Chip/ColorChip'
import { Common } from '../styles'

const SelectedInterestCelebModal = () => {
  const { closeModal } = useModals()
  const onClose = () => {
    closeModal(modals.SelectedInterestCelebModal)
  }

  const [selectedCelebList, setSelectedCelebList] = useRecoilState(selectInterestCelebState)
  const colorList = ['pink', 'orange', 'yellow', 'green', 'blue']

  const deleteCeleb = (categoryId: number, celebId: number) => {
    setSelectedCelebList((prevState) =>
      prevState.map((category) =>
        category.categoryId === categoryId
          ? {
              ...category,
              celebList: category.celebList.filter((celeb) => celeb.celebId !== celebId),
            }
          : category,
      ),
    )
  }

  useEffect(() => {
    const allCelebListsEmpty = selectedCelebList.every(
      (category) => category.celebList.length === 0,
    )

    if (allCelebListsEmpty) {
      closeModal(modals.SelectedInterestCelebModal)
    }
  }, [selectedCelebList])

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header isModalHeader={true} title='관심 셀럽 목록' modalCloseBtnClick={onClose} />
        </div>
        <MenuWrapper className='long'>
          {selectedCelebList?.map((Category, index) => {
            if (Category.celebList.length > 0) {
              return (
                <CelebCategoryWrapper key={Category.categoryId}>
                  <CategoryContentWrapper>
                    <CategoryTitle>{Category.categoryName}</CategoryTitle>
                    <CelebListWrapper>
                      {Category.celebList.map((celeb) => {
                        console.log(celeb)
                        return (
                          <ColorChip
                            key={celeb.celebId}
                            color={colorList[index]}
                            canDelete={true}
                            active={true}
                            onDelete={() => deleteCeleb(Category.categoryId, celeb.celebId)}
                          >
                            {celeb.celebName}
                          </ColorChip>
                        )
                      })}
                    </CelebListWrapper>
                  </CategoryContentWrapper>
                </CelebCategoryWrapper>
              )
            }
            return null
          })}
        </MenuWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  height: 80%;
  border-top: 1px solid ${Common.colors.GR200};
`
export const CategoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
  width: 100%;
  height: 100%;
`

export default SelectedInterestCelebModal
