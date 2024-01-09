import React from 'react'
import ItemListGrid from '../../../../components/ItemListGrid/ItemListGrid'
import useHotCelebItemQuery from '../../../../apis/item/hooks/useHotCelebItemQuery'
import { useParams } from 'react-router-dom'
import useUserClosetQuery from '../../../../apis/user/hooks/useUserClosetQuery'

const UserCloset = () => {
  const { id } = useParams()
  if (id) {
    // 타 유저의 마이페이지
    const { getOtherUserClosetList } = useUserClosetQuery()
    const { data } = getOtherUserClosetList(Number(id))
    const tempData = data?.pages[0].content
    console.log('tempData', tempData)
    return <ItemListGrid data={data} canChangeView={false}></ItemListGrid>
  } else {
    const {
      getUserClosetList: { data },
    } = useUserClosetQuery()
    return <ItemListGrid data={data} canChangeView={false}></ItemListGrid>
  }
}

export default UserCloset
