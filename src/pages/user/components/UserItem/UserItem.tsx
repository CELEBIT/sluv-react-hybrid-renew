import { useNavigate, useParams } from 'react-router-dom'
import useUserItemQuery from '../../../../apis/user/hooks/useUserItemQuery'
import ButtonSmall from '../../../../components/ButtonSmall/ButtonSmall'
import EmptyState from '../../../../components/EmptyState'
import Header from '../../../../components/Header/Header'
import ItemListGrid from '../../../../components/ItemListGrid/ItemListGrid'
import { ContentContainer, HeaderWrapper, PageContainer } from '../../styles'
import { EmptyStateWrapper } from '../FollowList/Follower/Follower'

const UserItem = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  if (id) {
    // 타 유저의 마이페이지
    const { getOtherUserUploadItem } = useUserItemQuery()
    const { data, status, isFetching, isFetchingNextPage, fetchNextPage } = getOtherUserUploadItem(
      Number(id),
    )

    const tempData = data?.pages[0].content
    return (
      <>
        {tempData && (
          <ItemListGrid
            data={data}
            canChangeView={true}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            status={status}
          ></ItemListGrid>
        )}
      </>
    )
  } else {
    const { getUserUploadItem } = useUserItemQuery()
    const { data, status, isFetching, isFetchingNextPage, fetchNextPage } = getUserUploadItem()
    return (
      <PageContainer>
        <HeaderWrapper>
          <Header title='아이템' isModalHeader={false} hasArrow={true}></Header>
        </HeaderWrapper>
        <ContentContainer>
          {data && data?.pages[0].content.length > 0 ? (
            <ItemListGrid
              data={data}
              canChangeView={true}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              status={status}
            ></ItemListGrid>
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
                  onClick={() => navigate('/item/create')}
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
