import React from 'react'
import Chip from '../../Chip/Chip'
import useRecentPlaceQuery from '../../../apis/place/hooks/useRecentPlaceQuery'
import usePostPlaceQuery from '../../../apis/place/hooks/usePostPlaceQuery'
import { useSetRecoilState } from 'recoil'
import { selectedPlaceState } from '../../../pages/item/create/components/DatePlaceField'

interface ItemPlaceChipProps {
  placeName: string
  canDelete: boolean
}

const ItemPlaceChip = ({ placeName, canDelete }: ItemPlaceChipProps) => {
  /**
   * canDelete가 true인 경우 : 최근 입력한 장소 Chip
   * canDelete가 false인 경우 : 핫 플레이스 Chip
   */
  const {
    deleteRecentPlace: { mutate: mutateByDeleteRecentPlace },
  } = useRecentPlaceQuery()
  const {
    postItemPlace: { mutate: mutateByPostItemPlace },
  } = usePostPlaceQuery()
  const setPlace = useSetRecoilState(selectedPlaceState)

  const onDeletePlace = () => {
    mutateByDeleteRecentPlace({ placeName })
  }
  const onClickPlace = () => {
    mutateByPostItemPlace({ placeName })
    setPlace(placeName)
    console.log(placeName)
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

export default ItemPlaceChip
