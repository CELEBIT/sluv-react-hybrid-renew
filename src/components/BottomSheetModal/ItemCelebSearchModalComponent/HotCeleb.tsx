import React from 'react'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal'
import { CelebData, selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'
import { HotWrapper } from '../ItemBrandSelectModalComponent/HotBrand'

const HotCeleb = () => {
  const hotCelebList = [
    {
      id: 120,
      category: 'string',
      celebNameKr: '뉴진스 민지',
      celebNameEn: 'string',
    },
    {
      id: 121,
      category: 'string',
      celebNameKr: '더보이즈 큐',
      celebNameEn: 'string',
    },
    {
      id: 122,
      category: 'string',
      celebNameKr: '아이브 장원영',
      celebNameEn: 'string',
    },
    {
      id: 2,
      category: 'string',
      celebNameKr: '아이유',
      celebNameEn: 'string',
    },
    {
      id: 41,
      category: 'string',
      celebNameKr: '소녀시대 태연',
      celebNameEn: 'string',
    },
    {
      id: 42,
      category: 'string',
      celebNameKr: '소녀시대 윤아',
      celebNameEn: 'string',
    },
    {
      id: 31,
      category: 'string',
      celebNameKr: '르세라핌 예지',
      celebNameEn: 'string',
    },
  ]
  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)
  const { closeModal } = useModals()

  const onChipClick = (celeb: CelebData) => {
    setSelectedCeleb(celeb)
    // API 변경 후 수정
    setSelectedGroup({ id: 0, celebNameKr: '' })
    closeModal(modals.ItemCelebSearchModal)
  }

  return (
    <HotWrapper>
      <span>인기 셀럽</span>
      <ChipWrapper>
        {hotCelebList.map((celeb) => {
          return <Chip key={celeb.id} text={celeb.celebNameKr} onClick={() => onChipClick(celeb)} />
        })}
      </ChipWrapper>
    </HotWrapper>
  )
}

export default HotCeleb
