import React, { useRef } from 'react'
import useHotCelebItemQuery from '../../../../apis/item/hooks/useHotCelebItemQuery'
import ItemListGrid from '../../../../components/ItemListGrid/ItemListGrid'
import useUserItemQuery from '../../../../apis/user/hooks/useUserItemQuery'
import { useParams } from 'react-router-dom'
import { UserItemListContainer } from './styles'
import { ContentContainer, HeaderWrapper, PageContainer } from '../../styles'
import Header from '../../../../components/Header/Header'
import { EmptyStateWrapper } from '../FollowList/Follower/Follower'
import EmptyState from '../../../../components/EmptyState'
import ButtonSmall from '../../../../components/ButtonSmall/ButtonSmall'

const UserItem = () => {
  const { id } = useParams()
  if (id) {
    // 타 유저의 마이페이지
    const { getOtherUserUploadItem } = useUserItemQuery()
    const { data } = getOtherUserUploadItem(Number(id))
    const tempData = data?.pages[0].content
    console.log('tempData', data)
    return <ItemListGrid data={tempData} canChangeView={true}></ItemListGrid>
  } else {
    const { getUserUploadItem } = useUserItemQuery()
    const { data } = getUserUploadItem()
    const tempData = data?.pages[0].content
    return (
      <PageContainer>
        <HeaderWrapper>
          <Header title='아이템' isModalHeader={false} hasArrow={true}></Header>
        </HeaderWrapper>
        <ContentContainer>
          {tempData && tempData.length > 0 ? (
            <ItemListGrid data={tempData} canChangeView={true}></ItemListGrid>
          ) : (
            <EmptyStateWrapper>
              <EmptyState
                icon='item'
                title='업로드한 아이템이 없어요'
                subtitle='셀럽의 아이템 정보를 공유해 보아요'
              >
                <ButtonSmall
                  text='정보 공유하러 가기'
                  type='pri'
                  onClick={() => alert('clicked')}
                />
              </EmptyState>
            </EmptyStateWrapper>
          )}
        </ContentContainer>
      </PageContainer>
    )
  }
}

export default UserItem
