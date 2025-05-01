import { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import useRecentCelebQuery from '../../apis/celeb/hooks/useRecentCelebQuery'
import useInterestCelebQuery from '../../apis/user/hooks/useInterestCelebQuery'
import { ICelebResult } from '../../apis/user/userService'
import { atomKeys } from '../../config/atomKeys'
import { createItemCelebState, createItemNewCelebState } from '../../recoil/itemInfo'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { SelectCelebWrapper } from './styles'

export interface CelebData {
  id: number
  celebNameKr: string
  isNewCeleb: boolean
  subCelebList?: {
    id: number
    celebNameKr: string
    isNewCeleb: boolean
  }[]
}

export interface NewCeleb {
  id: number
  newCelebName: string
}

export const selectedGroupState = atom<CelebData>({
  key: atomKeys.selectedGroupState,
  default: { id: 0, celebNameKr: '', isNewCeleb: false },
})

export const selectedCelebState = atom<CelebData>({
  key: atomKeys.selectedCelebState,
  default: { id: 0, celebNameKr: '', isNewCeleb: false },
})

const SelectCeleb = () => {
  const { openModal } = useModals()

  const {
    getInterestCeleb: { data: interestCelebList },
  } = useInterestCelebQuery()

  const {
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  } = useRecentCelebQuery()

  const [celebInfoInItem, setCelebInfoInItem] = useRecoilState(createItemCelebState)
  // console.log('celebInfoInItem', celebInfoInItem)

  const [newCeleb, setNewCeleb] = useRecoilState(createItemNewCelebState)
  const resetNewCeleb = useResetRecoilState(createItemNewCelebState)

  // 선택할 셀럽 리스트 (관심셀럽 리스트)
  const [displayList, setDisplayList] = useState<Array<ICelebResult> | null>([])

  // const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const resetSelectedCeleb = useResetRecoilState(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)
  const resetSelectedGroup = useResetRecoilState(selectedGroupState)

  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.scrollLeft = 0
    }
  }, [displayList])

  const onSearchSelect = () => {
    openModal(modals.ItemCelebSearchModal, {
      callbackFunc: () => {
        setSelectedGroup({
          id: celebInfoInItem?.groupId ?? 0,
          celebNameKr: celebInfoInItem?.groupName ?? '',
          isNewCeleb: celebInfoInItem?.isNewCeleb ?? false,
        })
        setSelectedCeleb({
          id: celebInfoInItem?.soloId ?? 0,
          celebNameKr: celebInfoInItem?.soloName ?? '',
          isNewCeleb: celebInfoInItem?.isNewCeleb ?? false,
        })
      },
    })
  }

  const onClickCeleb = (celebResult: ICelebResult) => {
    // 이미 선택된 셀럽
    if (newCeleb?.id === celebResult.id) {
      resetNewCeleb()
    } else if (
      celebInfoInItem?.soloId == celebResult.id ||
      celebInfoInItem?.groupId == celebResult.id
    ) {
      setCelebInfoInItem({
        groupId: null,
        groupName: null,
        soloId: null,
        soloName: null,
        isNewCeleb: false,
      })
      resetSelectedCeleb()
      resetSelectedGroup()
    } else {
      if (celebResult.subCelebList) {
        // 그룹
        setSelectedGroup(celebResult)
        openModal(modals.ItemCelebSelectModal, {
          callbackFunc: () => {
            setSelectedGroup({
              id: celebInfoInItem?.groupId ?? 0,
              celebNameKr: celebInfoInItem?.groupName ?? '',
              isNewCeleb: celebInfoInItem?.isNewCeleb ?? false,
            })
            setSelectedCeleb({
              id: celebInfoInItem?.soloId ?? 0,
              celebNameKr: celebInfoInItem?.soloName ?? '',
              isNewCeleb: celebInfoInItem?.isNewCeleb ?? false,
            })
          },
        })
      } else {
        // 솔로
        setCelebInfoInItem({
          soloId: celebResult.id,
          soloName: celebResult.celebNameKr,
          isNewCeleb: celebResult.isNewCeleb,
          groupId: null,
          groupName: null,
        })
        setSelectedCeleb(celebResult)

        if (celebResult.isNewCeleb) {
          mutateByPostRecentCeleb({ celebId: null, newCelebId: celebResult.id })
        } else {
          mutateByPostRecentCeleb({ celebId: celebResult.id, newCelebId: null })
        }
      }
    }
  }

  useEffect(() => {
    if ((interestCelebList?.length ?? 0) <= 0) {
      // 관심셀럽이 없으므로 리턴
      return
    } else if (!celebInfoInItem?.groupId && !celebInfoInItem?.soloId) {
      // Celeb 선택 전
      if (newCeleb) {
        const newList = interestCelebList?.filter((celeb) => celeb.id !== newCeleb?.id)
        setDisplayList(() => [
          {
            id: newCeleb.id,
            celebNameKr: newCeleb.newCelebName,
            isNewCeleb: true,
          },
          ...(newList || []),
        ])
        return
      } else {
        setDisplayList(interestCelebList ?? null)
        return
      }
    } else if (celebInfoInItem?.groupId && !celebInfoInItem?.soloId) {
      // 그룹은 선택했지만, 멤버 선택 전
      setDisplayList(interestCelebList ?? null)
      return
    } else if (celebInfoInItem?.soloId && !celebInfoInItem?.groupId) {
      // 선택한 셀럽이 솔로인 경우
      // 관심셀럽 리스트에 해당 솔로가 있다면
      // 기존 관심셀럽 리스트에서 삭제 후 리스트 맨 앞으로 보냄
      const newList = interestCelebList?.filter((celeb) => celeb.id !== celebInfoInItem?.soloId)
      if (newList) {
        setDisplayList([
          {
            id: celebInfoInItem?.soloId,
            celebNameKr: celebInfoInItem?.soloName ?? '',
            isNewCeleb: false,
          },
          ...newList,
        ])
      }
      return
    } else if (celebInfoInItem?.groupId && celebInfoInItem?.soloId) {
      // 선택한 셀럽이 그룹의 멤버인 경우
      // 관심셀럽 리스트에서 해당 그룹이 있다면
      // 기존 관심셀럽 리스트에서 삭제 후 리스트 맨 앞으로 보내고
      // 그룹명 + 멤버명 형태로 보여줌
      const newList = interestCelebList?.filter((celeb) => celeb.id !== celebInfoInItem?.groupId)
      if (newList) {
        setDisplayList([
          {
            id: celebInfoInItem?.soloId,
            celebNameKr: celebInfoInItem?.groupName + ' ' + celebInfoInItem?.soloName,
            isNewCeleb: false,
          },
          ...newList,
        ])
      }
      return
    }
  }, [celebInfoInItem, interestCelebList, newCeleb])

  return (
    <SelectCelebWrapper>
      <div className='select' ref={selectRef}>
        {/* 관심셀럽 리스트 */}
        {displayList?.map((celeb, index) => {
          if (!newCeleb) {
            return (
              <ButtonMedium
                key={index}
                text={celeb.celebNameKr}
                type='pri'
                active={celebInfoInItem?.soloId === celeb.id}
                onClick={() => onClickCeleb(celeb)}
              ></ButtonMedium>
            )
          } else {
            return (
              <ButtonMedium
                key={index}
                text={celeb.celebNameKr}
                type='pri'
                active={newCeleb.newCelebName === celeb.celebNameKr}
                onClick={() => onClickCeleb(celeb)}
              ></ButtonMedium>
            )
          }
        })}
      </div>
      <div className='search'>
        <ButtonMedium text='검색' type='sec' icon={true} onClick={onSearchSelect}></ButtonMedium>
      </div>
    </SelectCelebWrapper>
  )
}

export default SelectCeleb
