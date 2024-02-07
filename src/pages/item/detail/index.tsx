import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'

import Header from '../../../components/Header/Header'
import { ReactComponent as Home } from '../../../assets/home_24.svg'
import { ReactComponent as Search } from '../../../assets/search_24.svg'
import { ReactComponent as ShowMore } from '../../../assets/add_24.svg'
import { ReactComponent as StorageOn } from '../../../assets/storage_on_24.svg'
import { ReactComponent as StorageOff } from '../../../assets/storage_off_24.svg'
import { ReactComponent as LikeOn } from '../../../assets/like_on_24.svg'
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

import {
  AdditionalInfoWrapper,
  BasicInfoWrapper,
  Category,
  ColorCircle,
  Divider,
  HashTags,
  Interactions,
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
  Top,
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
import Carousel from './components/Carousel/Carousel'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'

import { convertToKoDate } from '../../../utils/utility'
import useFollowQuery from '../../../apis/user/hooks/useFollowQuery'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { RequestEditItemState } from '../editRequest'
import { useSetRecoilState } from 'recoil'
import { Common } from '../../../components/styles'
import { ItemClosetListModal } from '../../closet/detail'

const ItemDetail = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal } = useModals()
  const { id: itemId } = useParams()

  const { getItemDetail } = useItemDetailQuery()
  const { data } = getItemDetail(Number(itemId))
  console.log(data)
  const setEditReportItemState = useSetRecoilState(RequestEditItemState)
  const colors = ['gray', 'pink', 'orange', 'yellow', 'green', 'blue']
  const price = 120235

  useEffect(() => {
    queryClient.refetchQueries(queryKeys.itemDetail(Number(itemId)))
    console.log('refetch')
  }, [itemId])

  const onClickShowMore = () => {
    if (data?.hasMine) {
      openModal(modals.ItemEditModal, { itemId: Number(itemId) })
    }
    if (!data?.hasMine) {
      openModal(modals.ItemEditRequestModal)
      setEditReportItemState({
        itemId: Number(itemId),
        itemWriterId: data?.writer.id,
        itemWriterName: data?.writer.nickName,
      })
    }
  }

  const {
    followUser: { mutate: mutateByFollow },
  } = useFollowQuery()
  const onClickFollow = () => {
    if (data) mutateByFollow({ userId: data?.writer.id, itemId: Number(itemId) })
  }

  const {
    likeItem: { mutate: mutateByLike },
  } = useItemDetailQuery()
  const onClickLike = () => {
    if (data) mutateByLike(Number(itemId))
  }

  const handleScrapItem = () => {
    openModal(ItemClosetListModal, { itemId: itemId ?? '' })
  }

  return (
    <ItemDetailContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true}>
          <div className='headerRight'>
            <Home onClick={() => navigate('/')} />
            <Search fill={Common.colors.BK} onClick={() => navigate('/search')}></Search>
            <ShowMore onClick={() => onClickShowMore()}></ShowMore>
          </div>
        </Header>
      </HeaderWrapper>
      <ItemWrapper>
        {data?.imgList && <Carousel imgList={data?.imgList}></Carousel>}

        <BasicInfoWrapper>
          <Top>
            <Badge color='gray'>{data?.celeb.celebTotalNameKr}</Badge>

            <Interactions>
              {data?.scrapStatus ? (
                <StorageOn></StorageOn>
              ) : (
                <StorageOff onClick={handleScrapItem}></StorageOff>
              )}
              {data?.likeStatus ? (
                <LikeOn onClick={onClickLike}></LikeOn>
              ) : (
                <LikeOff onClick={onClickLike}></LikeOff>
              )}

              <Share stroke={Common.colors.GR600}></Share>
            </Interactions>
          </Top>
          <ItemInfo>
            <Category>
              {data?.category.parentName && (
                <>
                  <span>{data?.category.parentName}</span>
                  <Arrow></Arrow>
                </>
              )}
              <span>{data?.category.name}</span>
              {data?.color && <ColorCircle color={data.color}></ColorCircle>}
            </Category>
            <ItemName>{data?.itemName}</ItemName>
            <Brand>
              <BrandLogo size={32} url={data?.brand.brandImgUrl} />
              <span>{data?.brand.brandEn}</span>
              <Arrow></Arrow>
            </Brand>
          </ItemInfo>
          <ItemReaction>
            <Reaction>
              <LikeSmall></LikeSmall>
              <span>{data?.likeNum}</span>
            </Reaction>
            <Reaction>
              <ShareSmall></ShareSmall>
              <span>{data?.scrapNum}</span>
            </Reaction>
            <Reaction>
              <View></View>
              <span>{data?.viewNum}</span>
            </Reaction>
          </ItemReaction>
        </BasicInfoWrapper>
        <Divider />
        {(data?.linkList.length ?? 0) > 0 && (
          <LinkInfoWrapper>
            <Label>여기서 구매할 수 있어요!</Label>
            <DisplayField>
              {(data?.linkList.length ?? 0) > 0 &&
                data?.linkList.map((link, index) => {
                  return (
                    <Link key={index}>
                      <LinkIcon></LinkIcon>
                      <div className='linkinfo'>
                        <span>{link.linkName}</span>
                        <ArrowLarge></ArrowLarge>
                      </div>
                    </Link>
                  )
                })}
            </DisplayField>
          </LinkInfoWrapper>
        )}
        <UploaderInfoWrapper>
          <div className='user'>
            <UserImg imgUrl={data?.writer.profileImgUrl} />
            <span>{data?.writer.nickName}</span>
          </div>
          {data?.hasMine === false ? (
            data?.followStatus ? (
              <ButtonSmall type='sec' text='팔로잉' icon={true} onClick={onClickFollow} />
            ) : (
              <ButtonSmall type='sec' text='팔로우' onClick={onClickFollow} />
            )
          ) : null}
        </UploaderInfoWrapper>
        <AdditionalInfoWrapper>
          {data?.whenDiscovery && <span>{convertToKoDate(new Date(data?.whenDiscovery))}</span>}
          {data?.whereDiscovery && <span>{data?.whereDiscovery}에서 착용하였고</span>}
          {data?.price && (
            <>
              {price >= 500000000 ? (
                <span>가격은 5억원대 이상이에요</span>
              ) : (
                <span>가격은 {formatPrice(price)}대에요</span>
              )}
            </>
          )}

          {data?.additionalInfo && <span>{data?.additionalInfo}</span>}
        </AdditionalInfoWrapper>
        {data?.hashTagList && (
          <HashTags>
            {data?.hashTagList.map((hashtag, index) => {
              return (
                <Badge key={hashtag.id} color={colors[index % colors.length]}>
                  #{hashtag.hashtagContent}
                </Badge>
              )
            })}
          </HashTags>
        )}
        {data?.infoSource && (
          <SourceWrapper>
            <LinkIcon></LinkIcon>
            <span className='label'>출처</span>
            <span className='source'>{data?.infoSource}</span>
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
          {(data?.sameCelebItemList?.length ?? 0) > 0 && (
            <RecommendedItemList
              title='같은 셀럽의 아이템'
              list={data?.sameCelebItemList}
            ></RecommendedItemList>
          )}
          {(data?.sameBrandItemList?.length ?? 0) > 0 && (
            <RecommendedItemList
              title='같은 브랜드의 아이템'
              list={data?.sameBrandItemList}
            ></RecommendedItemList>
          )}
          {(data?.otherSluverItemList?.length ?? 0) > 0 && (
            <RecommendedItemList
              title='다른 스러버들이 함께 보관한 아이템'
              list={data?.otherSluverItemList}
            ></RecommendedItemList>
          )}
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
