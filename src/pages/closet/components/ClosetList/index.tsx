import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { patchClosetItems, patchClosetScrap } from '../../../../apis/closet'
import { ClosetBoxModel, ClosetStatus } from '../../../../apis/closet/model'
import useModals from '../../../../components/Modals/hooks/useModals'
import { queryToObject } from '../../../../utils/utility'
import { AnotherClosetListModal, ItemClosetListModal } from '../../detail'
import ClosetCoverBox from '../ClosetCoverBox'

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

export const ScrapClosetList = ({
  status = 'PUBLIC',
  data,
  itemId,
}: ClosetListContainerProps & { itemId: string }) => {
  const filteredClosetBoxList =
    status === 'PRIVATE' ? data.filter((closet) => closet.closetStatus === 'PRIVATE') : data
  const { closeModal } = useModals()
  const queryClient = useQueryClient()

  const handleScrapItem = async (toClosetId: string) => {
    const res = await patchClosetScrap(itemId, toClosetId)
    if (res.isSuccess) {
      closeModal(ItemClosetListModal, () => {
        toast('성공적으로 스크랩되었습니다.')
        queryClient.invalidateQueries()
      })
    }
  }

  return (
    <>
      {filteredClosetBoxList.map((closet) => {
        return (
          <ClosetCoverBox
            service={closet}
            key={closet.id}
            handleClickBox={() => handleScrapItem(closet.id)}
          />
        )
      })}
    </>
  )
}

export const ReClosetList = ({
  status = 'PUBLIC',
  data,
  selectedIds,
  setSelectedIds,
  setIsEditMode,
}: ClosetListContainerProps & {
  selectedIds: number[]
  setSelectedIds: any
  setIsEditMode: any
}) => {
  const filteredClosetBoxList =
    status === 'PRIVATE' ? data.filter((closet) => closet.closetStatus === 'PRIVATE') : data
  const { id } = queryToObject(window.location.search.split('?')[1])

  const { closeModal } = useModals()
  const queryClient = useQueryClient()

  const MoveItems = async (toClosetId: string) => {
    const res = await patchClosetItems(id, toClosetId, { itemList: selectedIds })
    if (res.isSuccess) {
      closeModal(AnotherClosetListModal, () => {
        toast('성공적으로 이동되었습니다.')
        setIsEditMode(false)
        setSelectedIds([])
        queryClient.invalidateQueries()
      })
    }
  }

  return (
    <>
      {filteredClosetBoxList.map((closet) => {
        return (
          <ClosetCoverBox
            service={closet}
            key={closet.id}
            handleClickBox={() => MoveItems(closet.id)}
          />
        )
      })}
    </>
  )
}

export default ClosetList
