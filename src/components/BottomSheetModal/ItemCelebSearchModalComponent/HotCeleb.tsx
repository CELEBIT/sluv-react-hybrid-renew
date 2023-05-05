import React from 'react'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal'
import { selectedCelebState } from '../../SelectCeleb/SelectCeleb'
import { HotWrapper } from '../ItemBrandSelectModalComponent/HotBrand'

const HotCeleb = () => {
  const hotCelebList = [
    {
      id: 0,
      category: 'string',
      celebNameKr: '뉴진스 민지',
      celebNameEn: 'string',
    },
    {
      id: 1,
      category: 'string',
      celebNameKr: '더보이즈 큐',
      celebNameEn: 'string',
    },
    {
      id: 2,
      category: 'string',
      celebNameKr: '아이브 장원영',
      celebNameEn: 'string',
    },
    {
      id: 3,
      category: 'string',
      celebNameKr: '아이유',
      celebNameEn: 'string',
    },
    {
      id: 4,
      category: 'string',
      celebNameKr: '소녀시대 태연',
      celebNameEn: 'string',
    },
    {
      id: 5,
      category: 'string',
      celebNameKr: '빅뱅 지드래곤',
      celebNameEn: 'string',
    },
    {
      id: 6,
      category: 'string',
      celebNameKr: '르세라핌 채원',
      celebNameEn: 'string',
    },
  ]
  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const { closeModal } = useModals()

  const onChipClick = (celebId: number) => {
    setSelectedCeleb(celebId)
    closeModal(modals.ItemCelebSearchModal)
  }

  return (
    <HotWrapper>
      <span>인기 셀럽</span>
      <ChipWrapper>
        {hotCelebList.map((celeb) => {
          return (
            <Chip key={celeb.id} text={celeb.celebNameKr} onClick={() => onChipClick(celeb.id)} />
          )
        })}
      </ChipWrapper>
    </HotWrapper>
  )
}

export default HotCeleb
