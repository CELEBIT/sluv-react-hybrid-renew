import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import Header from '../../../components/Header/Header'
import { Helmet } from 'react-helmet-async'
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
import { ReactComponent as Storage } from '../../../assets/storage_18.svg'
import { ReactComponent as View } from '../../../assets/page view_18.svg'
import { ReactComponent as LinkIcon } from '../../../assets/link_add_20.svg'
import { ReactComponent as ArrowLarge } from '../../../assets/arrow_20.svg'
import { ReactComponent as Comment } from '../../../assets/comment_18.svg'
import { ReactComponent as Kakao } from '../../../assets/share_kakao_40.svg'
import { ReactComponent as Twitter } from '../../../assets/share_twitter_40.svg'
import { ReactComponent as ShareAdd } from '../../../assets/share_add_40.svg'
import { ReactComponent as DefaultProfile } from '../../../assets/defaultProfile_40.svg'

import {
  AdditionalInfoWrapper,
  BasicInfoWrapper,
  Brand,
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
import { Label } from '../create/styles'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'
import ButtonSmall from '../../../components/ButtonSmall/ButtonSmall'
import { formatPrice } from '../create/components/PriceField/price.util'
import { HeaderWrapper } from '../addInfo/styles'
import Carousel from './components/Carousel/Carousel'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'

import { convertToKoDate, openLink } from '../../../utils/utility'
import useFollowQuery from '../../../apis/user/hooks/useFollowQuery'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { RequestEditItemState } from '../editRequest'
import { useSetRecoilState } from 'recoil'
import { Common } from '../../../components/styles'
import { ItemClosetListModal } from '../../closet/detail'
import SameCeleb from './components/Carousel/SameCeleb'
import SameScrap from './components/Carousel/SameScrap'
import SameBrand from './components/Carousel/SameBrand'
import { deleteScrap } from '../../../apis/closet'
import share from '../../../utils/Share/share'
import ShowLink from './components/ShowLink'
import storage from '../../../utils/storage'
import { toast } from 'react-toastify'
import MetaTag from '../../../utils/Share/MetaTag'

const ItemDetail = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { openModal } = useModals()
  const { id: itemId } = useParams()

  const [isPreview, setIsPreview] = useState<boolean>(false)
  const searchOnPreview = () => {
    openModal(modals.LoginToContinueModal)
  }

  useEffect(() => {
    if (!storage.get('accessToken')) {
      setIsPreview(true)
    }
  })

  const { getItemDetail } = useItemDetailQuery()
  const { data } = getItemDetail(Number(itemId))
  // const { data } = testItemDetail(Number(itemId))
  // console.log(data)

  const setEditReportItemState = useSetRecoilState(RequestEditItemState)
  const colors = ['gray', 'pink', 'orange', 'yellow', 'green', 'blue']

  const handleShare = async () => {
    const result = await share(`셀럽 : ${
      data?.celeb ? data?.celeb.celebTotalNameKr : data?.newCeleb.newCelebName
    }
종류 : ${data?.category.parentName} > ${data?.category.name}
브랜드 : ${data?.brand.id ? data?.brand.brandKr : data?.newBrand.newBrandName}
상품명 : ${data?.itemName}
`)
    if (result === 'copiedToClipboard') {
      toast('링크를 클립보드에 복사했습니다.')
    }
  }

  const [link, setLink] = useState<string>('')
  const [showLink, setShowLink] = useState<boolean>(false)

  useEffect(() => {
    queryClient.refetchQueries(queryKeys.itemDetail(Number(itemId)))
  }, [itemId])

  const onClickShowMore = () => {
    if (data?.hasMine) {
      openModal(modals.ItemEditModal, { itemId: Number(itemId) })
    }
    if (!data?.hasMine) {
      setEditReportItemState({
        itemId: Number(itemId),
        itemWriterId: data?.writer.id,
        itemWriterName: data?.writer.nickName,
      })
      openModal(modals.ItemEditRequestModal)
    }
  }

  const {
    followUser: { mutate: mutateByFollow },
  } = useFollowQuery()
  const onClickFollow = () => {
    if (isPreview) {
      openModal(modals.LoginToContinueModal)
    } else {
      if (data) mutateByFollow({ userId: data?.writer.id, itemId: Number(itemId) })
    }
  }

  const {
    likeItem: { mutate: mutateByLike },
  } = useItemDetailQuery()
  const onClickLike = () => {
    if (isPreview) {
      openModal(modals.LoginToContinueModal)
    } else {
      if (data) {
        mutateByLike(Number(itemId))
      }
    }
  }

  const handleScrapItem = async () => {
    if (isPreview) {
      openModal(modals.LoginToContinueModal)
    } else {
      if (data?.scrapStatus) {
        const res = await deleteScrap(Number(itemId))

        if (res.isSuccess) {
          toast('아이템 저장이 취소되었어요')
          queryClient.invalidateQueries(queryKeys.itemDetail(Number(itemId)))
        }
      } else {
        openModal(ItemClosetListModal, { itemId: itemId ?? '' })
      }
    }
  }

  const onClickUser = () => {
    if (isPreview) {
      openModal(modals.LoginToContinueModal)
    } else {
      if (data?.hasMine) {
        navigate('/user')
      } else {
        navigate(`/user/${data?.writer.id}`)
      }
    }
  }

  const onBackClick = () => {
    if (showLink) {
      setShowLink(!showLink)
    } else {
      navigate(-1)
    }
  }

  const onClickOpenLink = (link: string) => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      if (link.includes('http://') || link.includes('https://')) {
        openLink(link)
      } else {
        openLink('http://' + link)
      }
    } else {
      if (link.includes('http://') || link.includes('https://')) {
        setLink(link)
      } else {
        setLink('http://' + link)
      }
      window.open(link, '_blank')
      // setShowLink(!showLink)
    }
  }

  const onRequestEdit = () => {
    if (isPreview) {
      openModal(modals.LoginToContinueModal)
    } else {
      setEditReportItemState({
        itemId: Number(itemId),
        itemWriterId: data?.writer.id,
        itemWriterName: data?.writer.nickName,
      })
      navigate('/item/detail/request-edit')
    }
  }

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // 히스토리에서 뒤로가기가 발생하면 showLink 상태를 토글
      if (event.state && event.state.showLink === true) {
        setShowLink(!showLink)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <ItemDetailContainer>
      {data && (
        <Helmet>
          <title>스럽</title>
          <meta name='description' content={'연예인의 아이템 정보를 공유하는 커뮤니티'} />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={'스럽'} />
          <meta property='og:site_name' content='스럽' />
          <meta property='og:description' content={'연예인의 아이템 정보를 공유하는 커뮤니티'} />
          <meta property='og:image' content={data?.imgList[0].imgUrl || '/public/ogImage.png'} />
          <meta property='og:url' content={`https://sluv.co.kr${window.location.pathname}`} />
        </Helmet>
      )}

      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} backBtnClick={onBackClick}>
          <div className='headerRight'>
            <Home onClick={() => navigate('/home')} />
            <Search
              fill={Common.colors.BK}
              onClick={isPreview ? () => searchOnPreview() : () => navigate('/search')}
            ></Search>
            <ShowMore
              onClick={isPreview ? () => searchOnPreview() : () => onClickShowMore()}
            ></ShowMore>
          </div>
        </Header>
      </HeaderWrapper>
      {showLink ? (
        <ShowLink linkUrl={link} showLink={showLink} setShowLink={setShowLink}></ShowLink>
      ) : (
        <ItemWrapper>
          {data?.imgList ? <Carousel imgList={data?.imgList}></Carousel> : null}

          <BasicInfoWrapper>
            <Top>
              <Badge color='gray'>
                {data?.celeb ? data?.celeb.celebTotalNameKr : data?.newCeleb.newCelebName}
              </Badge>

              <Interactions>
                {data?.scrapStatus ? (
                  <StorageOn onClick={handleScrapItem}></StorageOn>
                ) : (
                  <StorageOff onClick={handleScrapItem}></StorageOff>
                )}
                {data?.likeStatus ? (
                  <LikeOn onClick={onClickLike}></LikeOn>
                ) : (
                  <LikeOff onClick={onClickLike}></LikeOff>
                )}

                <Share stroke={Common.colors.GR600} onClick={handleShare}></Share>
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
                <BrandLogo size={32} url={data?.brand ? data.brand.brandImgUrl : ''} />
                <span>{data?.brand ? data?.brand.brandKr : data?.newBrand.newBrandName}</span>
                {/* <Arrow></Arrow> */}
              </Brand>
            </ItemInfo>
            <ItemReaction>
              <Reaction>
                <LikeSmall></LikeSmall>
                <span>{data?.likeNum}</span>
              </Reaction>
              <Reaction>
                <Storage></Storage>
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
                      <Link key={index} onClick={() => onClickOpenLink(link.itemLinkUrl)}>
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
            <div className='user' onClick={data?.writer.id !== null ? onClickUser : undefined}>
              {data?.writer.profileImgUrl !== null ? (
                <UserImg imgUrl={data?.writer.profileImgUrl} />
              ) : (
                <DefaultProfile></DefaultProfile>
              )}
              <span>{data?.writer.id !== null ? data?.writer.nickName : '탈퇴한 유저'}</span>
            </div>
            {data?.hasMine === false && data.writer.id !== null ? (
              <ButtonSmall
                type='pri'
                text={data.followStatus ? '팔로잉' : '팔로우'}
                active={data.followStatus ? false : true}
                icon={data.followStatus ? true : false}
                onClick={onClickFollow}
              />
            ) : null}
          </UploaderInfoWrapper>
          <AdditionalInfoWrapper>
            {data?.whenDiscovery && <span>{convertToKoDate(new Date(data?.whenDiscovery))}</span>}
            {data?.whereDiscovery && <span>{data?.whereDiscovery}에서 착용하였고</span>}
            {data?.price && (
              <>
                {data.price >= 500000000 ? (
                  <span>가격은 5억원대 이상이에요</span>
                ) : (
                  <span>
                    {data.price > 0
                      ? `가격은 ${formatPrice(data.price)}대에요`
                      : '가격은 모르겠어요'}
                  </span>
                )}
              </>
            )}

            {data?.additionalInfo && (
              <span>
                {data?.additionalInfo.split('\n\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            )}
          </AdditionalInfoWrapper>
          {data?.hashTagList && (
            <HashTags>
              {data?.hashTagList.map((hashtag, index) => {
                return (
                  <Badge key={hashtag.hashtagId} color={colors[index % colors.length]}>
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
            <div className='info' onClick={onRequestEdit}>
              <Comment></Comment>
              <span>잘못된 정보는 스러버에게 제보해 주세요</span>
            </div>
            <ArrowLarge></ArrowLarge>
          </WrongInfo>
          <RecommendWrapper>
            <SameCeleb itemId={Number(itemId)} isPreview={isPreview} />
            <SameBrand itemId={Number(itemId)} isPreview={isPreview} />
            <SameScrap itemId={Number(itemId)} isPreview={isPreview} />
          </RecommendWrapper>
          {/* <ShareItemWrapper>
          <ShareWrapper>
            <Kakao />
            <Twitter />
            <ShareAdd />
          </ShareWrapper>
          <span>셀럽의 아이템 정보를 공유해 보아요!</span>
        </ShareItemWrapper> */}
        </ItemWrapper>
      )}
    </ItemDetailContainer>
  )
}

export default ItemDetail
