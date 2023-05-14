import React from 'react'
import Header from '../../../components/Header/Header'
import { ReactComponent as Home } from '../../../assets/home_24.svg'
import { ReactComponent as Search } from '../../../assets/search_24.svg'
import { ReactComponent as Add } from '../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../assets/storage_off_24.svg'
import { ReactComponent as LikeOff } from '../../../assets/like_off_24.svg'
import { ReactComponent as Share } from '../../../assets/share_24.svg'
import { ReactComponent as Arrow } from '../../../assets/arrow_18.svg'
import { ReactComponent as LikeSmall } from '../../../assets/Like_18.svg'
import { ReactComponent as ShareSmall } from '../../../assets/Share_18.svg'
import { ReactComponent as View } from '../../../assets/page view_18.svg'
import { ReactComponent as LinkIcon } from '../../../assets/link_add_20.svg'
import { ReactComponent as ArrowLarge } from '../../../assets/arrow_20.svg'
import { ReactComponent as Comment } from '../../../assets/comment_18.svg'
import { ReactComponent as Kakao } from '../../../assets/share_kakao_40.svg'
import { ReactComponent as Twitter } from '../../../assets/share_twitter_40.svg'
import { ReactComponent as ShareAdd } from '../../../assets/share_add_40.svg'

// import { ReactComponent as StorageOn } from '../../../assets/storage_on_24.svg'

import {
  AdditionalInfoWrapper,
  BasicInfoWrapper,
  Divider,
  HashTags,
  ItemDetailContainer,
  ItemInfo,
  ItemName,
  ItemReaction,
  ItemWrapper,
  Link,
  LinkInfoWrapper,
  Reaction,
  RecommendWrapper,
  ShareItemWrapper,
  ShareWrapper,
  SourceWrapper,
  UploaderInfoWrapper,
  UserImg,
  WrongInfo,
} from './styles'
import Badge from '../../../components/Badge/Badge'
import BrandLogo from '../../../components/BrandLogo/BrandLogo'
import { Brand } from '../create/components/BrandItemField/BrandItemField'
import { Label } from '../create/styles'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'
import ButtonSmall from '../../../components/ButtonSmall/ButtonSmall'
import { formatPrice } from '../create/components/PriceField/price.util'
import { HeaderWrapper } from '../addInfo/styles'
import RecommendedItemList from '../../../components/RecommendedItem/RecommendedItemList'

const ItemDetail = () => {
  const colors = ['gray', 'pink', 'orange', 'yellow', 'green', 'blue']
  const price = 120235
  const additionalInfoText = 'asdfasdf'
  const HashTagList = [
    {
      hashtagId: 0,
      hashtagContent: '애착템',
      count: 0,
    },
    {
      hashtagId: 1,
      hashtagContent: '애착템',
      count: 0,
    },
    {
      hashtagId: 2,
      hashtagContent: '애착템',
      count: 0,
    },
    {
      hashtagId: 3,
      hashtagContent: '애착템',
      count: 0,
    },
    {
      hashtagId: 4,
      hashtagContent: '애착템',
      count: 0,
    },
    {
      hashtagId: 5,
      hashtagContent: '애착템',
      count: 0,
    },
  ]
  const SourceInfo = '트위터 리노 팬 계정(@leeee)'
  const itemList = [
    {
      itemId: 0,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 1,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
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
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 4,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 5,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
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
  ]
  return (
    <ItemDetailContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true}>
          <div className='headerRight'>
            <Home />
            <Search></Search>
            <Add></Add>
          </div>
        </Header>
      </HeaderWrapper>
      <ItemWrapper>
        <BasicInfoWrapper>
          <div className='top'>
            <Badge color='gray'>스트레이키즈 리노</Badge>
            <div className='interaction'>
              <StorageOff></StorageOff>
              <LikeOff></LikeOff>
              <Share></Share>
            </div>
          </div>
          <ItemInfo>
            <div className='category'>
              <span>상의</span>
              <Arrow></Arrow>
              <span>후드티</span>
            </div>
            <ItemName>BROCCOLI FAMILY HOODIE GRAY</ItemName>
            <Brand>
              <BrandLogo
                size={32}
                url='https://image.msscdn.net/mfile_s01/_brand/free_medium/poloralphlauren.png?202304131632'
              />
              <span>피지컬 에듀케이션 디파트먼트</span>
              <Arrow></Arrow>
            </Brand>
          </ItemInfo>
          <ItemReaction>
            <Reaction>
              <LikeSmall></LikeSmall>
              <span>580</span>
            </Reaction>
            <Reaction>
              <ShareSmall></ShareSmall>
              <span>580</span>
            </Reaction>
            <Reaction>
              <View></View>
              <span>580</span>
            </Reaction>
          </ItemReaction>
        </BasicInfoWrapper>
        <Divider></Divider>
        <LinkInfoWrapper>
          <Label>여기서 구매할 수 있어요!</Label>
          <DisplayField>
            <Link>
              <LinkIcon></LinkIcon>
              <div className='linkinfo'>
                <span>무신사</span>
                <ArrowLarge></ArrowLarge>
              </div>
            </Link>
          </DisplayField>
        </LinkInfoWrapper>
        <UploaderInfoWrapper>
          <div className='user'>
            <UserImg imgUrl='https://images.pexels.com/photos/2893685/pexels-photo-2893685.jpeg?cs=srgb&dl=pexels-oziel-g%C3%B3mez-2893685.jpg&fm=jpg' />
            <span>이리노순둥도리</span>
          </div>
          <ButtonSmall type='sec' text='팔로우' onClick={() => alert('팔로우')} />
        </UploaderInfoWrapper>
        <AdditionalInfoWrapper>
          <span>2023년 1월 1일에</span>
          <span>에서 착용하였고</span>
          {price >= 500000000 ? (
            <span>가격은 5억원대 이상이에요</span>
          ) : (
            <span>가격은 {formatPrice(price)}대에요</span>
          )}
          {additionalInfoText && <span>{additionalInfoText}</span>}
        </AdditionalInfoWrapper>
        {HashTagList && (
          <HashTags>
            {HashTagList.map((hashtag, index) => {
              return (
                <Badge key={hashtag.hashtagId} color={colors[index % colors.length]}>
                  #최애템
                </Badge>
              )
            })}
          </HashTags>
        )}
        {SourceInfo && (
          <SourceWrapper>
            <LinkIcon></LinkIcon>
            <span className='label'>출처</span>
            <span className='source'>{SourceInfo}</span>
          </SourceWrapper>
        )}
        <WrongInfo>
          <div className='info'>
            <Comment></Comment>
            <span>잘못된 정보는 스러버에게 제보해 주세요</span>
          </div>
          <ArrowLarge></ArrowLarge>
        </WrongInfo>
        <RecommendWrapper>
          <RecommendedItemList title='같은 셀럽의 아이템' list={itemList}></RecommendedItemList>
          <RecommendedItemList title='같은 브랜드의 아이템' list={itemList}></RecommendedItemList>
          <RecommendedItemList
            title='다른 스러버들이 함께 보관한 아이템'
            list={itemList}
          ></RecommendedItemList>
        </RecommendWrapper>
        <ShareItemWrapper>
          <ShareWrapper>
            <Kakao />
            <Twitter />
            <ShareAdd />
          </ShareWrapper>
          <span>셀럽의 아이템 정보를 공유해 보아요!</span>
        </ShareItemWrapper>
      </ItemWrapper>
    </ItemDetailContainer>
  )
}

export default ItemDetail
