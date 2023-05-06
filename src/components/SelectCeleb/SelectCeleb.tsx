import React, { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { atomKeys } from '../../config/atomKeys'
import { Label, SelectCelebWrapper } from './styles'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'

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

  const MyCelebList = [
    {
      id: 1,
      celebNameKr: '있지',
      subCelebList: [
        {
          id: 11,
          celebNameKr: '예지',
        },
        {
          id: 12,
          celebNameKr: '리아',
        },
        {
          id: 13,
          celebNameKr: '류진',
        },
        {
          id: 14,
          celebNameKr: '채령',
        },
        {
          id: 15,
          celebNameKr: '유나',
        },
        {
          id: 16,
          celebNameKr: '레미콘',
        },
        {
          id: 17,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 2,
      celebNameKr: '아이유',
    },
    {
      id: 3,
      celebNameKr: '르세라핌',
      subCelebList: [
        {
          id: 31,
          celebNameKr: '예지',
        },
        {
          id: 32,
          celebNameKr: '리아',
        },
        {
          id: 3,
          celebNameKr: '류진',
        },
        {
          id: 34,
          celebNameKr: '채령',
        },
        {
          id: 35,
          celebNameKr: '유나',
        },
        {
          id: 36,
          celebNameKr: '레미콘',
        },
        {
          id: 37,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 4,
      celebNameKr: '소녀시대',
      subCelebList: [
        {
          id: 41,
          celebNameKr: '태연',
        },
        {
          id: 42,
          celebNameKr: '윤아',
        },
        {
          id: 43,
          celebNameKr: '서현',
        },
        {
          id: 44,
          celebNameKr: '제시카',
        },
        {
          id: 45,
          celebNameKr: '수영',
        },
        {
          id: 46,
          celebNameKr: '티파니',
        },
        {
          id: 47,
          celebNameKr: '유리',
        },
      ],
    },
    {
      id: 5,
      celebNameKr: '핑클',
      subCelebList: [
        {
          id: 51,
          celebNameKr: '예지',
        },
        {
          id: 52,
          celebNameKr: '리아',
        },
        {
          id: 53,
          celebNameKr: '류진',
        },
        {
          id: 54,
          celebNameKr: '채령',
        },
        {
          id: 55,
          celebNameKr: '유나',
        },
        {
          id: 56,
          celebNameKr: '레미콘',
        },
        {
          id: 57,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 6,
      celebNameKr: 'SES',
      subCelebList: [
        {
          id: 61,
          celebNameKr: '예지',
        },
        {
          id: 62,
          celebNameKr: '리아',
        },
        {
          id: 63,
          celebNameKr: '류진',
        },
        {
          id: 64,
          celebNameKr: '채령',
        },
        {
          id: 65,
          celebNameKr: '유나',
        },
        {
          id: 66,
          celebNameKr: '레미콘',
        },
        {
          id: 67,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 7,
      celebNameKr: 'AOA',
      subCelebList: [
        {
          id: 71,
          celebNameKr: '예지',
        },
        {
          id: 72,
          celebNameKr: '리아',
        },
        {
          id: 73,
          celebNameKr: '류진',
        },
        {
          id: 74,
          celebNameKr: '채령',
        },
        {
          id: 75,
          celebNameKr: '유나',
        },
        {
          id: 76,
          celebNameKr: '레미콘',
        },
        {
          id: 77,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 8,
      celebNameKr: '현아',
    },
  ]
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState)
  const setNewCeleb = useSetRecoilState(selectedNewCelebState)
  const newCeleb = useRecoilValue(selectedNewCelebState)
  const [displayList, setDisplayList] = useState<CelebData[]>([])
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.scrollLeft = 0
    }
  }, [displayList])
  const onSearchSelect = () => {
    openModal(modals.ItemCelebSearchModal)
  }
  const onClickCeleb = (celeb: CelebData) => {
    if (celeb.subCelebList) {
      // 그룹
      setSelectedGroup(celeb)
      setSelectedCeleb({ id: 0, celebNameKr: '' })
      openModal(modals.ItemCelebSelectModal)
    } else {
      // 솔로
      setSelectedCeleb(celeb)
      setSelectedGroup({ id: 0, celebNameKr: '' })
      setNewCeleb({ newCelebName: '' })
    }
    console.log(celeb)
  }
  useEffect(() => {
    if (!newCeleb.newCelebName) {
      // 솔로인 경우
      if (selectedCeleb.id && !selectedGroup.id) {
        // 기존 CelebList에 있는지 확인 후 존재하면 기존 셀럽 리스트 삭제 후 맨 앞으로 보냄
        const updatedList = MyCelebList.filter((celeb) => celeb.id !== selectedCeleb.id)
        const newDisplayItem = {
          id: selectedCeleb.id,
          celebNameKr: selectedCeleb.celebNameKr,
        }
        setDisplayList([newDisplayItem, ...updatedList])
      }
      // 그룹인 경우
      if (selectedCeleb.id && selectedGroup.id !== 0) {
        // 기존 CelebList에 있는지 확인 후 존재하면 기존 그룹 리스트 삭제
        const updatedList = MyCelebList.filter((celeb) => celeb.id !== selectedGroup.id)
        const newDisplayItem = {
          id: selectedCeleb.id,
          celebNameKr: selectedGroup.celebNameKr + ' ' + selectedCeleb.celebNameKr,
        }
        setDisplayList([newDisplayItem, ...updatedList])
      }
      if (!selectedCeleb.id && !selectedGroup.id) {
        setDisplayList([...MyCelebList])
      }
    } else {
      const updatedList = MyCelebList.filter((celeb) => celeb.id !== selectedGroup.id)
      const newDisplayItem = {
        id: -1,
        celebNameKr: newCeleb.newCelebName,
      }
      setDisplayList([newDisplayItem, ...updatedList])
    }
  }, [selectedCeleb, selectedGroup])

  return (
    <SelectCelebWrapper>
      <Label>누가 착용 했나요?</Label>
      <div className='selectSearch'>
        <div className='select' ref={selectRef}>
          {/* 관심셀럽 리스트 */}
          {displayList.map((celeb, index) => {
            if (!newCeleb.newCelebName) {
              return (
                <ButtonMedium
                  key={index}
                  text={celeb.celebNameKr}
                  type='pri'
                  active={selectedCeleb.id === celeb.id}
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
      </div>
    </SelectCelebWrapper>
  )
}

export default SelectCeleb
