import React, { useState } from 'react'
import { HotCelebTitle, ScrollComponentWrapper } from '../../styles'
import {
  HotItem,
  HotItemCeleb,
  HotItemDim,
  HotItemText,
  HotItemWrap,
  Tab,
  TabWrapper,
} from './styles'
import { ReactComponent as StorageOff } from '../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../assets/storage_on_24.svg'
// Design Icon
import { ReactComponent as Beauty } from '../../../../assets/Beauty.svg'
import { ReactComponent as Fashion } from '../../../../assets/Fashion.svg'
import { ReactComponent as Luxury } from '../../../../assets/Luxury.svg'
import { ReactComponent as Celebrity } from '../../../../assets/Celebrity.svg'
import { ReactComponent as Fire } from '../../../../assets/Fire.svg'
import { ReactComponent as Diamond } from '../../../../assets/Diamond.svg'
import useHotCelebItemQuery from '../../../../apis/item/hooks/useHotCelebItemQuery'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useModals from '../../../../components/Modals/hooks/useModals'
import { deleteScrap } from '../../../../apis/closet'
import { ItemClosetListModal } from '../../../closet/detail'

const HotCelebItems = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<string>('일간')

  const { getHotCelebItem } = useHotCelebItemQuery()
  const { data } = getHotCelebItem(tab)

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
      console.log(res)
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
      <HotCelebTitle className='title'>HOT 셀럽 아이템</HotCelebTitle>
      <Beauty style={{ position: 'absolute', top: 10, left: '-3.4375rem' }}></Beauty>
      <Fire style={{ position: 'absolute', top: 130, left: 40, zIndex: 10 }}></Fire>
      <Fashion style={{ position: 'absolute', top: 80, right: '-6.875rem' }}></Fashion>
      <Diamond style={{ position: 'absolute', top: 40, right: 5 }}></Diamond>
      <Celebrity style={{ position: 'absolute', bottom: 10, right: -135, zIndex: 10 }}></Celebrity>
      <Luxury style={{ position: 'absolute', top: 150, left: -90, zIndex: 10 }}></Luxury>

      <TabWrapper>
        <Tab active={tab === '일간'} onClick={() => setTab('일간')}>
          일간
        </Tab>
        <Tab active={tab === '주간'} onClick={() => setTab('주간')}>
          주간
        </Tab>
      </TabWrapper>
      <HotItemWrap>
        {data &&
          data.map((hotitem) => (
            <HotItem
              key={'hot' + hotitem.itemId}
              imgUrl={hotitem.imgUrl}
              onClick={() => navigate(`/item/detail/${hotitem.itemId}`)}
            >
              <div className='column'>
                <HotItemCeleb>{hotitem.celebName}</HotItemCeleb>
                <HotItemText>{hotitem.brandName}</HotItemText>
                <HotItemText>{hotitem.itemName}</HotItemText>
              </div>

              {hotitem.scrapStatus ? (
                <StorageOn
                  className='storage'
                  onClick={(e) => handleScrapItem(e, hotitem.scrapStatus, hotitem.itemId)}
                ></StorageOn>
              ) : (
                <StorageOff
                  className='storage'
                  onClick={(e) => handleScrapItem(e, hotitem.scrapStatus, hotitem.itemId)}
                ></StorageOff>
              )}
              <HotItemDim></HotItemDim>
            </HotItem>
          ))}
      </HotItemWrap>
    </ScrollComponentWrapper>
  )
}

export default HotCelebItems
