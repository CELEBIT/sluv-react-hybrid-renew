import { createContext, useState } from 'react'
import { useCreateClosetFormContext } from '../create/hooks'
import { ClosetBoxService } from '../services'
import useModals from '../../../components/Modals/hooks/useModals'
import { AnotherClosetListModal, DeleteReCheckModal } from './index'
import { useNavigate } from 'react-router-dom'
import { patchClosetItemsDelete } from '../../../apis/closet'
import { queryToObject } from '../../../utils/utility'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

type ClosetInnerItemContextType = ReturnType<typeof useEditClosetInnerItemContext>
export const ClosetInnerItemContext = createContext<ClosetInnerItemContextType | null>(null)

export const useEditClosetInnerItemContext = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { id } = queryToObject(window.location.search.split('?')[1])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const queryClient = useQueryClient()
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
