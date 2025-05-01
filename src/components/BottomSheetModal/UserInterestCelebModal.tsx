import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import BottomSheetModal from '.'
import useInterestCelebQuery from '../../apis/user/hooks/useInterestCelebQuery'
import { colorList } from '../../config/constant'
import {
  CategoryTitle,
  CelebCategoryWrapper,
  CelebListWrapper,
} from '../../pages/selectInterestCeleb/styles'
import ColorChip from '../Chip/ColorChip'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { Common } from '../styles'
import { ModalWrapper } from './ItemBrandSelectModal/ItemBrandSelectModal'

export interface userIdProps {
  id: number
}

const UserInterestCelebModal = ({ id }: userIdProps) => {
  const { closeModal } = useModals()
  const onClose = () => {
    closeModal(modals.UserInterestCelebModal)
  }

  // const deleteCeleb = (categoryId: number, celebId: number) => {
  //   // setSelectedCelebList((prevState) =>
  //   //   prevState.map((category) =>
  //   //     category.categoryId === categoryId
  //   //       ? {
  //   //           ...category,
  //   //           celebList: category.celebList.filter((celeb) => celeb.celebId !== celebId),
  //   //         }
  //   //       : category,
  //   //   ),
  //   // )
  // }
  const [_, setExpanded] = useState(false)

  if (id) {
    // 다른 유저
    const { getOtherUserInterestCelebWithCategory } = useInterestCelebQuery()
    const { data: interestCelebList } = getOtherUserInterestCelebWithCategory(Number(id))
    useEffect(() => {
      const celebListWrapper = document.getElementById('celebListWrapper')
      if (celebListWrapper) {
        const wrapperHeight = celebListWrapper.clientHeight
        setExpanded(wrapperHeight > 240)
      }
    }, [interestCelebList])
    return (
      <BottomSheetModal>
        <ModalWrapper>
          <div className='Header'>
            <Header isModalHeader={true} title='관심 셀럽 목록' modalCloseBtnClick={onClose} />
          </div>
          <MenuWrapper>
            {interestCelebList?.map((Category, index) => {
              if (Category.celebList.length > 0) {
                return (
                  <CelebCategoryWrapper key={Category.categoryName}>
                    <CategoryContentWrapper>
                      <CategoryTitle>{Category.categoryName}</CategoryTitle>
                      <CelebListWrapper id='celebListWrapper'>
                        {Category.celebList.map((celeb) => {
                          return (
                            <ColorChip
                              key={celeb.id}
                              color={colorList[index]}
                              canDelete={false}
                              active={true}
                            >
                              {celeb.celebNameKr}
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
  } else {
    // 현재 유저
    const {
      getInterestCelebWithCategory: { data: interestCelebList },
    } = useInterestCelebQuery()
    useEffect(() => {
      const celebListWrapper = document.getElementById('celebListWrapper')
      if (celebListWrapper) {
        const wrapperHeight = celebListWrapper.clientHeight
        setExpanded(wrapperHeight > 240)
      }
    }, [interestCelebList])
    return (
      <BottomSheetModal>
        <ModalWrapper>
          <div className='Header'>
            <Header isModalHeader={true} title='관심 셀럽 목록' modalCloseBtnClick={onClose} />
          </div>
          <MenuWrapper>
            {interestCelebList?.map((Category, index) => {
              if (Category.celebList.length > 0) {
                return (
                  <CelebCategoryWrapper key={Category.categoryName}>
                    <CategoryContentWrapper>
                      <CategoryTitle>{Category.categoryName}</CategoryTitle>
                      <CelebListWrapper id='celebListWrapper'>
                        {Category.celebList.map((celeb) => {
                          return (
                            <ColorChip
                              key={celeb.id + celeb.celebNameKr}
                              color={colorList[index]}
                              canDelete={false}
                              active={true}
                            >
                              {celeb.celebNameKr}
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
}
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  max-height: 75vh;
  border-top: 1px solid ${Common.colors.GR200};
  min-height: 15rem;
`
export const CategoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
  width: 100%;
  height: 100%;
`

export default UserInterestCelebModal
