import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { PreviewProps } from '../..'
import useGetHotSluverQuery from '../../../../apis/user/hooks/useGetHotSluverQuery'
import { modals } from '../../../../components/Modals'
import useModals from '../../../../components/Modals/hooks/useModals'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import InterestCelebList, {
  selectedInterestCelebState,
} from './InterestCelebList/interestCelebList'
import { UserCardListWrapper } from './styles'
import UserCard from './UserCard/UserCard'

const WeeklyTopUser = ({ isPreview }: PreviewProps) => {
  const { openModal } = useModals()
  const selectedInterestCeleb = useRecoilValue(selectedInterestCelebState)
  const {
    getHotSluver: { data: userList },
  } = useGetHotSluverQuery(selectedInterestCeleb ? selectedInterestCeleb : undefined)
  const navigate = useNavigate()

  const onClickUser = (isMine: boolean, userId: number) => {
    if (isPreview) {
      openModal(modals.LoginToContinueModal)
    } else {
      if (!isMine) {
        navigate(`/user/${userId}`)
      }
    }
  }
  return (
    <ScrollComponentWrapper bgColor='gray'>
      <HomeTitle className='title'>이번주 인기 스러버</HomeTitle>
      <InterestCelebList></InterestCelebList>
      <UserCardListWrapper>
        {userList?.map((user, index) => {
          return (
            <UserCard
              key={'sluver' + user.id}
              rank={index + 1}
              borderRadius={16}
              imgUrl={user.profileImgUrl}
              followStatus={user.followStatus}
              user={user}
              isMine={user.isMine}
              onClick={() => onClickUser(user.isMine, user.id)}
              isPreview={isPreview}
            />
          )
        })}
      </UserCardListWrapper>
    </ScrollComponentWrapper>
  )
}

export default WeeklyTopUser
