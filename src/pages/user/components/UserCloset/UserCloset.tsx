import { useParams } from 'react-router-dom'
import useGetOtherUserClosetQuery from '../../../../apis/user/hooks/useGetOtherUserClosetQuery'
import EmptyState from '../../../../components/EmptyState'
import ClosetList from '../../../closet/components/ClosetList'
import { EmptyStateWrapper } from '../FollowList/Follower/Follower'
import { ScrollRoot } from './styles'
const UserCloset = () => {
  const { id } = useParams()
  const { getOtherUserClosetList } = useGetOtherUserClosetQuery()
  const { data } = getOtherUserClosetList(Number(id))
  if (!data?.pages[0].content.length) {
    return (
      // <ContentContainer>
      <EmptyStateWrapper>
        <EmptyState
          title='옷장이 없어요'
          subtitle='옷장이 만들어 질 때까지
조금만 기다려주세요'
          icon='item'
        />
      </EmptyStateWrapper>
      // </ContentContainer>
    )
  }

  return (
    <ScrollRoot>
      {/* <S.BodyContainer> */}
      <ClosetList data={data?.pages[0].content} />
      {/* </S.BodyContainer> */}
    </ScrollRoot>
  )
}

export default UserCloset
