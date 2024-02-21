import React from 'react'
import { useParams } from 'react-router-dom'
import * as S from '../../../closet/styles'
import ClosetList from '../../../closet/components/ClosetList'
import EmptyState from '../../../../components/EmptyState'
import { Root, ScrollRoot } from './styles'
import useGetOtherUserClosetQuery from '../../../../apis/user/hooks/useGetOtherUserClosetQuery'
const UserCloset = () => {
  const { id } = useParams()
  const { getOtherUserClosetList } = useGetOtherUserClosetQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } =
    getOtherUserClosetList(Number(id))
  console.log('closet Data', data)
  if (!data?.pages[0].content.length) {
    return (
      <Root>
        <EmptyState
          title='옷장이 없어요'
          subtitle='옷장이 만들어 질 때까지
조금만 기다려주세요'
          icon='item'
        />
      </Root>
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
