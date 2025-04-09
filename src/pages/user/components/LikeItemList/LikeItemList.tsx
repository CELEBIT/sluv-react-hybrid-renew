import useUserMypageQuery from '../../../../apis/user/hooks/useUserMypageQuery'
import Header from '../../../../components/Header/Header'
import ItemListGrid from '../../../../components/ItemListGrid/ItemListGrid'
import { ContentFullContainer, HeaderWrapper } from '../../styles'
import { UserItemListContainer } from '../UserItem/styles'

const LikeItemList = () => {
  const { getUserLikeItem } = useUserMypageQuery()
  const { data, status, isFetching, isFetchingNextPage, fetchNextPage } = getUserLikeItem()

  return (
    <UserItemListContainer>
      <HeaderWrapper>
        <Header title='좋아요한 아이템' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        <ItemListGrid
          data={data}
          canChangeView={true}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          status={status}
          emptyIcon='like'
          emptyTitle='좋아요한 아이템이 없어요'
          emptySubTitle='마음에 드는 아이템에 좋아요해 보아요'
        ></ItemListGrid>
      </ContentFullContainer>
    </UserItemListContainer>
  )
}

export default LikeItemList
