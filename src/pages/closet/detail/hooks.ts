import { useQueryClient } from '@tanstack/react-query'
import { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import { patchClosetItemsDelete } from '../../../apis/closet'
import useModals from '../../../components/Modals/hooks/useModals'
import { queryToObject } from '../../../utils/utility'
import { AnotherClosetListModal, DeleteReCheckModal } from './index'

type ClosetInnerItemContextType = ReturnType<typeof useEditClosetInnerItemContext>
export const ClosetInnerItemContext = createContext<ClosetInnerItemContextType | null>(null)

export const useEditClosetInnerItemContext = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { id } = queryToObject(window.location.search.split('?')[1])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const queryClient = useQueryClient()
  const { openModal, closeModal } = useModals()

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
    openModal(AnotherClosetListModal, {
      fromClosetId: id,
      selectedIds,
      setSelectedIds: setSelectedIds,
      setIsEditMode: setIsEditMode,
    })
  }

  // const handleMoveItems = () => {
  //   closeModal(AnotherClosetListModal, () => {
  //     console.log('handleMoveItems called')
  //     setIsEditMode(false)
  //     setSelectedIds([])
  //     queryClient.invalidateQueries()
  //   })
  // }

  const handleRemoveItems = () => {
    // TODO API CAll
    openModal(DeleteReCheckModal, {
      handleCancel: () => {
        closeModal(DeleteReCheckModal)
      },
      handleConfirm: async () => {
        const res = await patchClosetItemsDelete(id, selectedIds)
        if (res.isSuccess) {
          toast('성공적으로 삭제되었습니다.')

          closeModal(DeleteReCheckModal, () => {
            setIsEditMode(false)
            setSelectedIds([])
            queryClient.invalidateQueries()
          })
        }
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
      // handleMoveItems,
      handleRemoveItems,
    },
  }
}
