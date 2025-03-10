import React from 'react'
import useItemDetailQuery from '../../../../../apis/item/hooks/useItemDetailQuery'
import RecommendedItemList from '../../../../../components/RecommendedItem/RecommendedItemList'

interface SameBrandProps {
  itemId: number
  isPreview: boolean
}

function SameBrand({ itemId, isPreview }: SameBrandProps) {
  const { getSameBrandItem } = useItemDetailQuery()
  const { data } = getSameBrandItem(Number(itemId))
  return (
    <>
      {data && data?.length > 0 && (
        <RecommendedItemList
          title='같은 브랜드의 아이템'
          list={data}
          isPreview={isPreview}
        ></RecommendedItemList>
      )}
    </>
  )
}

export default SameBrand
