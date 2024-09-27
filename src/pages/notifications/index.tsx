import React, { useState } from 'react'
import { ContentFullContainer, HeaderWrapper, PageContainer } from '../user/styles'
import Header from '../../components/Header/Header'
import Notification, { deleteNotificationsState } from './components/Notification'
import { Line } from '../community/detail/styles'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'
import useNotificationQuery from '../../apis/notification/hooks/useNotificationQuery'
import { DeleteFloatingContainer, EditBtn } from '../item/temporary-storage/styles'
import { NotificationType } from './components/types'
import EmptyState from '../../components/EmptyState'
import { EmptyStateContainer } from '../community/styles'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { toast } from 'react-toastify'

const Notifications = () => {
  const {
    getNotificationList,
    getDevNotificationList,
    deleteNotification: { mutate: mutateByDeleteSelected },
    deleteAllNotifications: { mutate: mutateByDeleteAll },
  } = useNotificationQuery()
  const { data } = getDevNotificationList()
  const notificationList = data?.pages[0].content
  console.log('notificationList', notificationList)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const checkedList = useRecoilValue(deleteNotificationsState)
  const resetCheckedList = useResetRecoilState(deleteNotificationsState)

  const onEdit = () => {
    // 선택 여부 O
    if (checkedList.length > 0) {
      deleteSelectedNotifications()
    }
    // 선택 여부 X
    setIsEditMode(!isEditMode)
  }
  // 알림 선택 삭제
  const deleteSelectedNotifications = () => {
    if (checkedList.length > 0) {
      mutateByDeleteSelected(checkedList)
      resetCheckedList()
      setIsEditMode(!isEditMode)
      toast('알림이 삭제되었어요')
    } else {
      toast('삭제할 알림을 선택해주세요')
    }
  }
  // 알림 전체 삭제
  const deleteAllNotifications = () => {
    mutateByDeleteAll()
    setIsEditMode(!isEditMode)
    toast('알림이 삭제되었어요')
  }

  return (
    <PageContainer>
      <HeaderWrapper>
        <Header title='알림' isModalHeader={false} hasArrow={true}>
          <EditBtn
            onClick={notificationList?.length !== 0 ? onEdit : undefined}
            disabled={notificationList?.length === 0}
          >
            {isEditMode ? '완료' : '편집'}
          </EditBtn>
        </Header>
      </HeaderWrapper>
      <ContentFullContainer>
        {data ? (
          <>
            {notificationList?.map((each) => {
              return (
                <React.Fragment key={each.alarmId}>
                  <Notification
                    data={each}
                    hasPreviewImg={
                      !!(
                        (each.images || each.userImageUrl) &&
                        each.type !== NotificationType.NOTICE &&
                        each.type !== NotificationType.REPORT
                      )
                    }
                    isEditMode={isEditMode}
                  ></Notification>
                  <Line></Line>
                </React.Fragment>
              )
            })}
            <InfoText>최근 60일간의 알림만 확인할 수 있어요</InfoText>
          </>
        ) : (
          <EmptyStateContainer>
            <EmptyState
              icon='bell'
              title='새로운 알림이 없어요'
              subtitle='최근 60일간의 알림이 없어요
다양한 활동 기대할게요!'
            ></EmptyState>
          </EmptyStateContainer>
        )}
      </ContentFullContainer>
      {isEditMode && (
        <DeleteFloatingContainer>
          <div className='wrapper'>
            <button onClick={deleteAllNotifications}>전체 삭제</button>
            <span className='line'></span>
            <button onClick={deleteSelectedNotifications}>선택 삭제</button>
          </div>
        </DeleteFloatingContainer>
      )}
    </PageContainer>
  )
}

export default Notifications

const InfoText = styled.span`
  text-align: center;
  margin: 1rem 0;
  ${Pretendard({ size: 13, weight: Common.bold.regular, color: Common.colors.GR500 })}
`
