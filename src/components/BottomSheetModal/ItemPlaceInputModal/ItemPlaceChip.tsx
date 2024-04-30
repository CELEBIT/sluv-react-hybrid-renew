import React from 'react'
import Chip from '../../Chip/Chip'
import useRecentPlaceQuery from '../../../apis/place/hooks/useRecentPlaceQuery'
import usePostPlaceQuery from '../../../apis/place/hooks/usePostPlaceQuery'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { createItemPlaceState, itemInfoState } from '../../../recoil/itemInfo'

interface ItemPlaceChipProps {
  placeName: string
  canDelete: boolean
}

const ItemPlaceChip = ({ placeName, canDelete }: ItemPlaceChipProps) => {
  /**
   * canDelete가 true인 경우 : 최근 입력한 장소 Chip
   * canDelete가 false인 경우 : 핫 플레이스 Chip
   */
  const setWhereDiscovery = useSetRecoilState(createItemPlaceState)

  const {
    deleteRecentPlace: { mutate: mutateByDeleteRecentPlace },
  } = useRecentPlaceQuery()
  const {
    postItemPlace: { mutate: mutateByPostItemPlace },
  } = usePostPlaceQuery()

  const onDeletePlace = () => {
    mutateByDeleteRecentPlace({ placeName })
  }
  const onClickPlace = () => {
    mutateByPostItemPlace({ placeName })
    setWhereDiscovery(placeName)
  }

  return (
    <Chip
      text={placeName}
      canDelete={canDelete}
      onDelete={canDelete ? onDeletePlace : undefined}
      onClick={onClickPlace}
    />
  )
}

export default React.memo(ItemPlaceChip)
