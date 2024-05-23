import React, { UIEventHandler, useContext, useEffect, useRef, useState } from 'react'
import * as S from './styles'
import Header from '../../../components/Header/Header'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { closetQueryConfig } from '../../../apis/closet/hooks'
import { queryToObject } from '../../../utils/utility'
import { ReactComponent as SaveIcon } from '../../../assets/save_36.svg'
import NameTagChip from '../components/NameTag/NameTagChip'
import SubHeader, { PaddingSubHeader } from '../components/SubHeader'
import { ClosetInnerItemContext, useEditClosetInnerItemContext } from './hooks'
import { ReactComponent as MoveIcon } from '../../../assets/move_24.svg'
import { ReactComponent as TrashIcon } from '../../../assets/trash_can_24.svg'
import BottomSheetModal from '../../../components/BottomSheetModal'
import { ReClosetList, ScrapClosetList } from '../components/ClosetList'
import DefaultCreateBox from '../components/ClosetCreateBox/DefaultCreateBox'
import useModals from '../../../components/Modals/hooks/useModals'
import { DeleteRecheckModalParam } from '../deleteAndSort'
import TwoButtonModal from '../../../components/TwoButtonModal'
import { BtnModalContent } from '../../../components/Modals/styles'
import ItemListGrid from '../../../components/ItemListGrid/ItemListGrid'

const ClosetDetailPage = () => {
  const { id } = queryToObject(window.location.search.split('?')[1])

  const context = useEditClosetInnerItemContext()
  const subheaderRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [showCount, setShowCount] = useState(false)
  const { data, status, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    ...closetQueryConfig.getCloset(id),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.page + 1
      }
      return undefined
    },
  })

  useEffect(() => {
    const handleScroll = () => {
      if (subheaderRef.current) {
        console.log(subheaderRef.current.getBoundingClientRect().top)
        setShowCount(subheaderRef.current.getBoundingClientRect().top < 50)
      }
    }

    const bodyElement = bodyRef.current
    if (bodyElement) {
      bodyElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (bodyElement) {
        bodyElement.removeEventListener('scroll', handleScroll)
      }
    }
  })

  if (!id) return <div>Error Occurred</div>
  if (status !== 'success') return <div>...is loading...</div>

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
            {/* <button>인기 아이템 보러가기</button> */}
          </S.EmptyBoxContainer>
        </S.EmptyPageRoot>
      )}
      {data?.pages[0].itemNum > 0 && (
        <S.Body ref={bodyRef}>
          <S.BackgroundContainer
            colorScheme={data?.pages[0].colorScheme}
            imgUrl={data?.pages[0].coverImgUrl}
          >
            <NameTagChip colorScheme={data?.pages[0].colorScheme} count={data?.pages[0].itemNum} />
          </S.BackgroundContainer>
          <ClosetInnerItemContext.Provider value={context}>
            <PaddingSubHeader
              ref={subheaderRef}
              leftPaneChildren={
                <S.SubHeaderEditText>
                  {context.states.isEditMode ? (
                    `${context.states.selectedIds.length}개 선택됨`
                  ) : (
                    <>{showCount ? `${data?.pages[0].itemNum}개 보관 중` : ''}</>
                  )}
                </S.SubHeaderEditText>
              }
              rightPaneChildren={
                <S.SubHeaderEditText onClick={context.handlers.handleSubHeaderClick}>
                  {context.states.isEditMode ? '완료' : '편집'}
                </S.SubHeaderEditText>
              }
            />
            <S.ItemListGridContainer className={context.states.isEditMode ? 'edit' : undefined}>
              {status === 'success' && data && data.pages[0].content.length > 0 && (
                <ItemListGrid
                  closetData={data}
                  canChangeView={false}
                  status={status}
                  context={context}
                  fetchNextPage={fetchNextPage}
                  isFetching={isFetching}
                  isFetchingNextPage={isFetchingNextPage}
                ></ItemListGrid>
              )}
            </S.ItemListGridContainer>
          </ClosetInnerItemContext.Provider>
        </S.Body>
      )}
      {context.states.isEditMode && (
        <S.EditFooter>
          <S.FooterLayout>
            <S.FooterContentContainer
              onClick={
                context.states.selectedIds.length > 0
                  ? () => context.handlers.handleMoveItemsToAnotherCloset(id)
                  : undefined
              }
            >
              <MoveIcon />
              <p>옷장 이동</p>
            </S.FooterContentContainer>
            <S.FooterContentContainer
              onClick={
                context.states.selectedIds.length > 0
                  ? () => context.handlers.handleRemoveItems()
                  : undefined
              }
            >
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
  setSelectedIds,
  setIsEditMode,
}: {
  fromClosetId: string
  selectedIds: number[]
  setSelectedIds: any
  setIsEditMode: any
}) => {
  const { data, status } = useQuery({ ...closetQueryConfig.getClosetList() })
  const { closeModal } = useModals()
  if (status === 'error' || !data?.result?.closetList) {
    return <div>error</div>
  }
  // const context = useEditClosetInnerItemContext()

  const handleCloseModal = () => {
    closeModal(AnotherClosetListModal)
  }

  return (
    <BottomSheetModal>
      <S.HeaderWrapper>
        <Header modalCloseBtnClick={handleCloseModal} isModalHeader={true} title={'나의 옷장'} />
      </S.HeaderWrapper>
      <S.AnotherClosetBodyContainer>
        <ReClosetList
          data={data.result.closetList}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          setIsEditMode={setIsEditMode}
        />
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
