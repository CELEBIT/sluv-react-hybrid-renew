import { ClosetBoxModel, ClosetStatus } from '../../../../apis/closet/model'
import ClosetCoverBox from '../ClosetCoverBox'
import React from 'react'

type ClosetListContainerProps = {
  status?: ClosetStatus
  data: ClosetBoxModel[]
  statusUpdater?(viewStatus: ClosetStatus): void
}

export const ClosetList = ({ status = 'PUBLIC', data }: ClosetListContainerProps) => {
  const filteredClosetBoxList =
    status === 'PRIVATE' ? data.filter((closet) => closet.closetStatus === 'PRIVATE') : data

  return (
    <>
      {filteredClosetBoxList.map((closet) => {
        return <ClosetCoverBox service={closet} key={closet.id} />
      })}
    </>
  )
}

export default ClosetList
