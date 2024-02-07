import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal/ItemBrandSelectModal'
import { selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'
import { HotWrapper } from '../ItemBrandSelectModal/HotBrand'
import useHotCelebQuery from '../../../apis/celeb/hooks/useHotCelebQuery'
import useRecentCelebQuery from '../../../apis/celeb/hooks/useRecentCelebQuery'
import { celebInfoInItemState, itemInfoState } from '../../../recoil/itemInfo'
import { IHotCeleb } from '../../../apis/celeb/CelebService'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'

const HotCeleb = () => {
  const { closeModal } = useModals()
  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)
  const [celebInfoInItem, setCelebInfoInItem] = useRecoilState(celebInfoInItemState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const {
    getHotCeleb: { data },
  } = useHotCelebQuery()
  const {
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  } = useRecentCelebQuery()

  const onChipClick = (celebData: IHotCeleb) => {
    if (celebData.parentId) {
      // 선택한 셀럽이 그룹의 멤버인 경우
      setCelebInfoInItem({
        ...celebInfoInItem,
        soloId: celebData.id,
        soloName: celebData.celebChildNameKr,
        groupId: celebData.parentId,
        groupName: celebData.celebParentNameKr,
      })
      setItemInfo({
        ...itemInfo,
        celeb: {
          celebId: celebData.id,
          celebName: celebData.celebChildNameKr,
        },
      })
    } else {
      // 선택한 셀럽이 솔로인 경우
      setCelebInfoInItem({
        ...celebInfoInItem,
        soloId: celebData.id,
        soloName: celebData.celebChildNameKr,
        groupId: null,
        groupName: null,
      })
      setItemInfo({
        ...itemInfo,
        celeb: {
          celebId: celebData.id,
          celebName: celebData.celebChildNameKr,
        },
      })
    }
    mutateByPostRecentCeleb(
      { celebId: celebData.id, newCelebId: null },
      {
        onSuccess: () => {
          closeModal(modals.ItemCelebSearchModal)
        },
      },
    )

    // API 변경 후 수정
    setSelectedCeleb({
      id: celebData.id,
      celebNameKr: celebData.celebChildNameKr,
    })
    setSelectedGroup({ id: 0, celebNameKr: '' })
  }

  return (
    <HotWrapper>
      <span>인기 셀럽</span>
      <ChipWrapper>
        {(data?.length ?? 0) > 0 &&
          data?.map((celeb) => {
            return (
              <Chip
                key={celeb.id}
                text={celeb.celebTotalNameKr}
                onClick={() => onChipClick(celeb)}
              />
            )
          })}
      </ChipWrapper>
    </HotWrapper>
  )
}

export default HotCeleb
