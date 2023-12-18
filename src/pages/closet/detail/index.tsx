import React, { UIEventHandler, useContext, useEffect, useRef, useState } from 'react'
import * as S from './styles'
import Header from '../../../components/Header/Header'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { closetQueryConfig } from '../../../apis/closet/hooks'
import { getCloset, PageParams } from '../../../apis/closet'
import { useObserver } from '../../../hooks/useObserver'
import { queryToObject } from '../../../utils/utility'
import { ReactComponent as SaveIcon } from '../../../assets/save_36.svg'
import ColorChip from '../../../components/Chip/ColorChip'
import NameTagChip from '../components/NameTag/NameTagChip'
import { ClosetMainSubHeaderEditText } from '../components/SubHeader/SubHeaderText'
import SubHeader, { PaddingSubHeader } from '../components/SubHeader'
import ClosetInnerItem from '../components/ClosetInnerItem'
import { ClosetInnerItemContext, useEditClosetInnerItemContext } from './hooks'
import { ReactComponent as MoveIcon } from '../../../assets/move_24.svg'
import { ReactComponent as TrashIcon } from '../../../assets/trash_can_24.svg'
import BottomSheetModal from '../../../components/BottomSheetModal'
import ClosetList, { ReClosetList, ScrapClosetList } from '../components/ClosetList'
import DefaultCreateBox from '../components/ClosetCreateBox/DefaultCreateBox'
import useModals from '../../../components/Modals/hooks/useModals'
import { DeleteRecheckModalParam } from '../deleteAndSort'
import TwoButtonModal from '../../../components/TwoButtonModal'
import { BtnModalContent } from '../../../components/Modals/styles'

const DEFAULT_PAGE_PARAMS: PageParams = {
  page: 1,
  size: 12,
}

const ClosetDetailPage = () => {
  const { id } = queryToObject(window.location.search.split('?')[1])
  const observerRef = useRef(null)
  const [contentTop, setContentTop] = useState('29%')

  const context = useEditClosetInnerItemContext()
  if (!id) return <div>Error Occurred</div>

  const { data, status, fetchNextPage, fetchPreviousPage, hasNextPage } = useInfiniteQuery({
    ...closetQueryConfig.getCloset(id),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNext) {
        return lastPage.page + 1
      }
      return undefined
    },
    cacheTime: 0,
    staleTime: 0,
  })

  useObserver({
    target: observerRef,
    onIntersect: () => {
      if (hasNextPage && status !== 'loading') fetchNextPage()
    },
  })

  if (status !== 'success') return <div>...is loading...</div>

  console.log('id', data)
  console.log(id)

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    setContentTop('0px')
    console.log('excuted')
  }

  return (
    <S.Root>
      <S.HeaderContainer>
        <Header isModalHeader={false} hasArrow title={data?.pages[0].name} />
      </S.HeaderContainer>
      {data?.pages[0].itemNum <= 0 && (
        <S.EmptyPageRoot>
          <S.EmptyBoxContainer>
            <SaveIcon />
            <h3>저장한 아이템이 없어요</h3>
            <p>
              좋아하는 셀럽의 아이템을
              <br />
              저장하여 나만의 옷장을 만들어봐요
            </p>
            <button>인기 아이템 보러가기</button>
          </S.EmptyBoxContainer>
        </S.EmptyPageRoot>
      )}
      {data?.pages[0].itemNum > 0 && (
        <S.Body>
          <S.BackgroundContainer
            colorScheme={data?.pages[0].colorScheme}
            imgUrl={data?.pages[0].coverImgUrl}
          >
            <NameTagChip colorScheme={data?.pages[0].colorScheme} count={data?.pages[0].itemNum} />
          </S.BackgroundContainer>
          <S.ContentContainer
            style={{ top: contentTop }}
            onScroll={handleScroll}
            onClick={handleScroll}
            onDrag={handleScroll}
          >
            <ClosetInnerItemContext.Provider value={context}>
              <PaddingSubHeader
                leftPaneChildren={
                  <S.SubHeaderEditText>
                    {context.states.isEditMode
                      ? `${context.states.selectedIds.length}개 선택됨`
                      : `${data?.pages[0].itemNum}개 보관 중`}
                  </S.SubHeaderEditText>
                }
                rightPaneChildren={
                  <S.SubHeaderEditText onClick={context.handlers.handleSubHeaderClick}>
                    {context.states.isEditMode ? '완료' : '편집'}
                  </S.SubHeaderEditText>
                }
              />
              <S.InnerItemGridContainer>
                {data?.pages.map((page) => {
                  return page.content.map((item) => {
                    return (
                      <ClosetInnerItem
                        service={item}
                        isEditMode={context.states.isEditMode}
                        key={item.itemId}
                        onSelectItem={context.handlers.handleSelectItem}
                      />
                    )
                  })
                })}
              </S.InnerItemGridContainer>
            </ClosetInnerItemContext.Provider>
          </S.ContentContainer>
        </S.Body>
      )}
      {context.states.isEditMode && (
        <S.EditFooter>
          <S.FooterLayout>
            <S.FooterContentContainer
              onClick={() => context.handlers.handleMoveItemsToAnotherCloset(id)}
            >
              <MoveIcon />
              <p>옷장 이동</p>
            </S.FooterContentContainer>
            <S.FooterContentContainer onClick={context.handlers.handleRemoveItems}>
              <TrashIcon />
              <p>아이템 삭제</p>
            </S.FooterContentContainer>
          </S.FooterLayout>
        </S.EditFooter>
      )}
    </S.Root>
  )
}

export const AnotherClosetListModal = ({
  fromClosetId,
  selectedIds,
}: {
  fromClosetId: string
  selectedIds: number[]
}) => {
  const { data, status } = useQuery({ ...closetQueryConfig.getClosetList() })
  const context = useContext(ClosetInnerItemContext)
  const { closeModal } = useModals()
  if (status === 'error' || !data?.result?.closetList) {
    return <div>error</div>
  }

  const handleCloseModal = () => {
    closeModal(AnotherClosetListModal)
  }

  return (
    <BottomSheetModal>
      <S.HeaderWrapper>
        <Header modalCloseBtnClick={handleCloseModal} isModalHeader={true} title={'나의 옷장'} />
      </S.HeaderWrapper>
      <S.AnotherClosetBodyContainer>
        <ReClosetList data={data.result.closetList} selectedIds={selectedIds} />
        <DefaultCreateBox />
      </S.AnotherClosetBodyContainer>
    </BottomSheetModal>
  )
}

export const ItemClosetListModal = ({ itemId }: { itemId: string }) => {
  const { data, status } = useQuery({ ...closetQueryConfig.getClosetList() })

  const { closeModal } = useModals()
  if (status === 'error' || !data?.result?.closetList) {
    return <div>error</div>
  }

  const handleCloseModal = () => {
    closeModal(ItemClosetListModal)
  }

  return (
    <BottomSheetModal>
      <S.HeaderWrapper>
        <Header modalCloseBtnClick={handleCloseModal} isModalHeader={true} title={'나의 옷장'} />
      </S.HeaderWrapper>
      <S.AnotherClosetBodyContainer>
        <ScrapClosetList data={data.result.closetList} itemId={itemId} />
        <DefaultCreateBox />
      </S.AnotherClosetBodyContainer>
    </BottomSheetModal>
  )
}

export const DeleteReCheckModal = ({ handleCancel, handleConfirm }: DeleteRecheckModalParam) => {
  return (
    <TwoButtonModal
      leftButtonName={'취소하기'}
      rightButtonName={'삭제하기'}
      rightButtonOnClick={handleConfirm}
      leftButtonOnClick={handleCancel}
    >
      <BtnModalContent>선택한 아이템을 삭제하실 건가요?</BtnModalContent>
    </TwoButtonModal>
  )
}

export default ClosetDetailPage
