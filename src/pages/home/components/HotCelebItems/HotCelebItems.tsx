import React from 'react'
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

const HotCelebItems = () => {
  const itemList = [
    {
      itemId: 35,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트라고하면어떻게될까',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '휴닝카이',
      scrapStatus: false,
    },
    {
      itemId: 1,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '권은비',
      scrapStatus: false,
    },
    {
      itemId: 2,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 3,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 4,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 5,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 6,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 7,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 8,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 9,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 10,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 11,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 12,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 13,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 14,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 15,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 16,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 17,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 18,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 19,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 20,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
  ]
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
        <Tab active={true}>일간</Tab>
        <Tab active={false}>주간</Tab>
      </TabWrapper>
      <HotItemWrap>
        {itemList.map((hotitem) => (
          <HotItem
            key={hotitem.itemId}
            imgUrl={hotitem.imgUrl}
            onClick={() => console.log(hotitem.itemId)}
          >
            <div className='column'>
              <HotItemCeleb>{hotitem.celebName}</HotItemCeleb>
              <HotItemText>{hotitem.brandName}</HotItemText>
              <HotItemText>{hotitem.itemName}</HotItemText>
            </div>

            {hotitem.scrapStatus ? (
              <StorageOn className='storage'></StorageOn>
            ) : (
              <StorageOff className='storage'></StorageOff>
            )}
            <HotItemDim></HotItemDim>
          </HotItem>
        ))}
      </HotItemWrap>
    </ScrollComponentWrapper>
  )
}

export default HotCelebItems
