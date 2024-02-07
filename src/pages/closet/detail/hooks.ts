import { createContext, useState } from 'react'
import { useCreateClosetFormContext } from '../create/hooks'
import { ClosetBoxService } from '../services'
import useModals from '../../../components/Modals/hooks/useModals'
import { AnotherClosetListModal, DeleteReCheckModal } from './index'
import { useNavigate } from 'react-router-dom'
import { patchClosetItemsDelete } from '../../../apis/closet'
import { queryToObject } from '../../../utils/utility'

type ClosetInnerItemContextType = ReturnType<typeof useEditClosetInnerItemContext>
export const ClosetInnerItemContext = createContext<ClosetInnerItemContextType | null>(null)

export const useEditClosetInnerItemContext = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { id } = queryToObject(window.location.search.split('?')[1])
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const { openModal, closeModal } = useModals()

  const navigate = useNavigate()

  const handleSubHeaderClick = () => {
    if (!isEditMode) {
      setIsEditMode(true)
      return
    }
    setIsEditMode(false)
  }

  const handleSelectItem = (id: number, nextSelectedState: boolean) => {
    if (nextSelectedState) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((prevId) => prevId !== id))
    }
  }

  const handleMoveItemsToAnotherCloset = (id: string) => {
    openModal(AnotherClosetListModal, { fromClosetId: id, selectedIds })
  }

  const handleMoveItems = () => {
    // TODO API Call

    closeModal(AnotherClosetListModal)
    setIsEditMode(false)
  }

  const handleRemoveItems = () => {
    // TODO API CAll
    openModal(DeleteReCheckModal, {
      handleCancel: () => {
        closeModal(DeleteReCheckModal)
      },
      handleConfirm: async () => {
        const res = await patchClosetItemsDelete(id, selectedIds)
        if (res.isSuccess) alert('성공적으로 삭제되었습니다.')
        setIsEditMode(false)
        closeModal(DeleteReCheckModal)
      },
    })
  }
  return {
    states: {
      isEditMode,
      selectedIds,
    },
    handlers: {
      setIsEditMode,
      setSelectedIds,
      handleSubHeaderClick,
      handleSelectItem,
      handleMoveItemsToAnotherCloset,
      handleMoveItems,
      handleRemoveItems,
    },
  }
}
