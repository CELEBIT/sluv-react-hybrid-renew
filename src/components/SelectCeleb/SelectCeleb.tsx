import React, { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { atomKeys } from '../../config/atomKeys'
import { SelectCelebWrapper } from './styles'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { ICelebResult } from '../../apis/user/userService'
import { celebInfoInItemState, itemInfoState } from '../../recoil/itemInfo'
import useInterestCelebQuery from '../../apis/user/hooks/useInterestCelebQuery'
import useRecentCelebQuery from '../../apis/celeb/hooks/useRecentCelebQuery'

export interface CelebData {
  id: number
  celebNameKr: string
  subCelebList?: {
    id: number
    celebNameKr: string
  }[]
}

export interface NewCeleb {
  newCelebName: string
}

export const selectedGroupState = atom<CelebData>({
  key: atomKeys.selectedGroupState,
  default: { id: 0, celebNameKr: '' },
})

export const selectedCelebState = atom<CelebData>({
  key: atomKeys.selectedCelebState,
  default: { id: 0, celebNameKr: '' },
})

export const selectedNewCelebState = atom<NewCeleb>({
  key: atomKeys.selectedNewCelebState,
  default: { newCelebName: '' },
})

const SelectCeleb = () => {
  const { openModal } = useModals()

  const {
    getInterestCeleb: { data: interestCelebList },
  } = useInterestCelebQuery()
  const {
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  } = useRecentCelebQuery()

  const [celebInfoInItem, setCelebInfoInItem] = useRecoilState(celebInfoInItemState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)
  const setNewCeleb = useSetRecoilState(selectedNewCelebState)
  const newCeleb = useRecoilValue(selectedNewCelebState)
  const [displayList, setDisplayList] = useState<Array<ICelebResult> | null>([])
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.scrollLeft = 0
    }
  }, [displayList])
  const onSearchSelect = () => {
    openModal(modals.ItemCelebSearchModal)
  }
  const onClickCeleb = (celebResult: ICelebResult) => {
    if (celebInfoInItem.soloId == celebResult.id || celebInfoInItem.groupId == celebResult.id) {
      setCelebInfoInItem({
        groupId: null,
        groupName: null,
        soloId: null,
        soloName: null,
      })
      setItemInfo({
        ...itemInfo,
        celeb: null,
      })
      return
    }
    if (celebResult.subCelebList) {
      // 그룹
      setCelebInfoInItem({
        soloId: null,
        soloName: null,
        groupId: celebResult.id,
        groupName: celebResult.celebNameKr,
      })
      setSelectedGroup(celebResult)
      setSelectedCeleb({ id: 0, celebNameKr: '' })
      openModal(modals.ItemCelebSelectModal)
    } else {
      // 솔로
      setCelebInfoInItem({
        soloId: celebResult.id,
        soloName: celebResult.celebNameKr,
        groupId: null,
        groupName: null,
      })
      setItemInfo({
        ...itemInfo,
        celeb: {
          celebId: celebResult.id,
          celebName: celebResult.celebNameKr,
        },
      })
      setSelectedCeleb(celebResult)
      setSelectedGroup({ id: 0, celebNameKr: '' })
      setNewCeleb({ newCelebName: '' })

      mutateByPostRecentCeleb({ celebId: celebResult.id, newCelebId: null })
    }
  }

  useEffect(() => {
    if (itemInfo.celeb) {
      // 수정시
    }
    if ((interestCelebList?.length ?? 0) <= 0) {
      // 관심셀럽이 없으므로 리턴
      return
    }
    if (!celebInfoInItem.groupId && !celebInfoInItem.soloId) {
      // 그룹과 솔로 셀럽 정보 둘다 Atom State에 없다면
      setDisplayList(interestCelebList ?? null)
      return
    }
    if (celebInfoInItem.soloId && !celebInfoInItem.groupId) {
      // 선택한 셀럽이 솔로인 경우
      // 관심셀럽 리스트에 해당 솔로가 있다면
      // 기존 관심셀럽 리스트에서 삭제 후 리스트 맨 앞으로 보냄
      const newList = interestCelebList?.filter((celeb) => celeb.id !== celebInfoInItem.soloId)
      if (newList) {
        setDisplayList([
          {
            id: celebInfoInItem.soloId,
            celebNameKr: celebInfoInItem.soloName ?? '',
          },
          ...newList,
        ])
      }
      return
    }
    if (celebInfoInItem.groupId && celebInfoInItem.soloId) {
      // 선택한 셀럽이 그룹의 멤버인 경우
      // 관심셀럽 리스트에서 해당 그룹이 있다면
      // 기존 관심셀럽 리스트에서 삭제 후 리스트 맨 앞으로 보내고
      // 그룹명 + 멤버명 형태로 보여줌
      const newList = interestCelebList?.filter((celeb) => celeb.id !== celebInfoInItem.groupId)
      if (newList) {
        setDisplayList([
          {
            id: celebInfoInItem.soloId,
            celebNameKr: celebInfoInItem.groupName + ' ' + celebInfoInItem.soloName,
          },
          ...newList,
        ])
      }
      return
    }
  }, [celebInfoInItem, interestCelebList])

  return (
    <SelectCelebWrapper>
      <div className='select' ref={selectRef}>
        {/* 관심셀럽 리스트 */}
        {displayList?.map((celeb, index) => {
          if (!newCeleb.newCelebName) {
            return (
              <ButtonMedium
                key={index}
                text={celeb.celebNameKr}
                type='pri'
                active={celebInfoInItem.soloId === celeb.id || celebInfoInItem.groupId === celeb.id}
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
