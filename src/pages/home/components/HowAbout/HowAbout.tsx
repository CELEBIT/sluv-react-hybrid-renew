import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Line } from '../../../community/detail/styles'
import { Common, Pretendard } from '../../../../components/styles'

import { ReactComponent as StorageOff } from '../../../../assets/storage_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../assets/storage_on_24.svg'
import useHowAboutItemQuery from '../../../../apis/item/hooks/useHowAboutItemQuery'
import { useQueryClient } from '@tanstack/react-query'
import useModals from '../../../../components/Modals/hooks/useModals'
import { deleteScrap } from '../../../../apis/closet'
import { ItemClosetListModal } from '../../../closet/detail'

const HowAbout = () => {
  const navigate = useNavigate()

  const { getHowAboutItem } = useHowAboutItemQuery()
  const { data } = getHowAboutItem()

  const queryClient = useQueryClient()
  const { openModal } = useModals()
  const handleScrapItem = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    scrapStatus: boolean,
    itemId: number,
  ) => {
    e.stopPropagation()
    if (scrapStatus) {
      const res = await deleteScrap(itemId)

      if (res.isSuccess) {
        alert('아이템 저장이 취소되었어요')
        queryClient.invalidateQueries()
      }
    } else {
      openModal(ItemClosetListModal, { itemId: String(itemId) ?? '' })
    }
  }

  return (
    <ScrollComponentWrapper>
      <HomeTitle className='title'>이 아이템은 어때요?</HomeTitle>
      <HowAboutList>
        {data &&
          data.map((item, index) => {
            return (
              <div key={'howabout' + item.itemId}>
                <HowAboutItem
                  onClick={() => navigate(`/item/detail/${item.itemId}`)}
                  className={index === data.length - 1 ? 'last' : undefined}
                >
                  <CirclePhoto imgUrl={item.imgUrl}></CirclePhoto>
                  <RightWrapper>
                    <ItemInfoWrapper>
                      <ItemName>{item.celebName}</ItemName>
                      <ItemText>{item.brandName}</ItemText>
                      <ItemText>{item.itemName}</ItemText>
                    </ItemInfoWrapper>
                    {item.scrapStatus ? (
                      <StorageOn
                        className='represent'
                        onClick={(e) => handleScrapItem(e, item.scrapStatus, item.itemId)}
                      ></StorageOn>
                    ) : (
                      <StorageOff
                        className='represent'
                        onClick={(e) => handleScrapItem(e, item.scrapStatus, item.itemId)}
                      ></StorageOff>
                    )}
                  </RightWrapper>
                </HowAboutItem>
                {index !== data.length - 1 && <Line></Line>}
              </div>
            )
          })}
      </HowAboutList>
    </ScrollComponentWrapper>
  )
}

export default HowAbout

export const HowAboutList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
  gap: 1rem;
  .last {
    margin-bottom: 0 !important;
  }
`

export const HowAboutItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`

export const CirclePhoto = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-color: ${Common.colors.GR300};
`

export const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 0.75rem;
`

export const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 0.25rem;
`
export const ItemName = styled.span`
  margin-bottom: 0.375rem;
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const ItemText = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
`
