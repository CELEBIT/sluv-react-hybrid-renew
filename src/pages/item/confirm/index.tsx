import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmButtonWrapper, ConfirmContainer, ItemWrapper, PhotosWrapper } from './styles'
import { HeaderWrapper } from '../addInfo/styles'
import Header from '../../../components/Header/Header'
import Photo from '../../../components/AddPhotos/Photo'
import { ComponentWrapper, Label, LabelContainer } from '../create/styles'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'

// import { useRecoilValue } from 'recoil'
import ButtonHalf from '../../../components/ButtonHalf/ButtonHalf'
import { formatDate } from '../create/components/DatePlaceField/date.util'
import { formatPrice } from '../create/components/PriceField/price.util'
// import { itemInfoState, celebInfoInItemState } from '../../../recoil/itemInfo'
import ToolTip from '../../../components/ToolTip/ToolTip'
import { ILink } from '../../../recoil/itemInfo'

interface IHashTag {
  hashtagId: number
  hashtagContent: string
  count: number | null
}

const ItemConfirm = () => {
  const navigate = useNavigate()
  // const itemInfo = useRecoilValue(itemInfoState)
  // const celebInfo = useRecoilValue(celebInfoInItemState)
  const celebInfo = { groupId: 1, groupName: '르세라핌', soloId: 12, soloName: '채원' }
  // const itemInfo = {
  //   id: 1,
  //   imgList: [
  //     {
  //       imgUrl:
  //         'https://images.pexels.com/photos/2893685/pexels-photo-2893685.jpeg?cs=srgb&dl=pexels-oziel-g%C3%B3mez-2893685.jpg&fm=jpg',
  //       representFlag: true,
  //     },
  //     {
  //       imgUrl:
  //         'https://iso.500px.com/wp-content/uploads/2016/02/stock-photo-114337435-1500x1000.jpg',
  //       representFlag: false,
  //     },
  //     {
  //       imgUrl:
  //         'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg',
  //       representFlag: false,
  //     },
  //     {
  //       imgUrl:
  //         'https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
  //       representFlag: false,
  //     },
  //     {
  //       imgUrl:
  //         'https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg',
  //       representFlag: false,
  //     },
  //   ],
  //   whenDiscovery: '2021-11-20T09:10:20',
  //   whereDiscovery: '우리집',
  //   itemCategory: {
  //     categoryId: 12,
  //     childName: '농구화',
  //     parentCategoryId: 1,
  //     parentName: '신발',
  //   },
  //   brand: { brandId: 1, brandName: '나이키', brandImgUrl: '' },
  //   itemName: 'BROCOLLI FAMILY HOODIE',
  //   price: 89490,
  //   color: null,
  //   additionalInfo: '공홈보다 무신사가 20% 더 저렴해요😎',
  //   hashTagList: [
  //     {
  //       hashtagId: 1,
  //       hashtagContent: '애착템',
  //       count: null,
  //     },
  //     {
  //       hashtagId: 2,
  //       hashtagContent: '농구화',
  //       count: null,
  //     },
  //   ],
  //   linkList: [
  //     { itemLinkUrl: 'https://www.musinsa.com', linkName: '무신사' },
  //     { itemLinkUrl: 'https://www.musinsa.com', linkName: '네이버 스마트스토어' },
  //     { itemLinkUrl: 'https://www.musinsa.com', linkName: '나이키 공식홈페이지' },
  //   ],
  //   infoSource: '인스타그램',
  //   newBrand: null,
  // }
  const itemInfo = {
    id: 1,
    imgList: [
      {
        imgUrl:
          'https://images.pexels.com/photos/2893685/pexels-photo-2893685.jpeg?cs=srgb&dl=pexels-oziel-g%C3%B3mez-2893685.jpg&fm=jpg',
        representFlag: true,
      },
      {
        imgUrl:
          'https://iso.500px.com/wp-content/uploads/2016/02/stock-photo-114337435-1500x1000.jpg',
        representFlag: false,
      },
      {
        imgUrl:
          'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg',
        representFlag: false,
      },
      {
        imgUrl:
          'https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
        representFlag: false,
      },
      {
        imgUrl:
          'https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg',
        representFlag: false,
      },
    ],
    whenDiscovery: null,
    whereDiscovery: null,
    itemCategory: {
      categoryId: null,
      childName: null,
      parentCategoryId: 9,
      parentName: '기타',
    },
    brand: { brandId: 1, brandName: '나이키', brandImgUrl: '' },
    itemName: 'BROCOLLI FAMILY HOODIE',
    price: -1,
    color: null,
    additionalInfo: null,
    hashTagList: null,
    linkList: null,
    infoSource: null,
    newBrand: null,
  }
  return (
    <ConfirmContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='정보확인'></Header>
      </HeaderWrapper>
      <ItemWrapper>
        <ComponentWrapper>
          <PhotosWrapper>
            {itemInfo.imgList.map((img, index) => {
              return (
                <Photo
                  key={index}
                  representFlag={img.representFlag}
                  size={74}
                  borderRadius={8}
                  imgUrl={img.imgUrl}
                ></Photo>
              )
            })}
          </PhotosWrapper>
        </ComponentWrapper>

        <ComponentWrapper>
          <LabelContainer>
            <Label>누가 착용했나요?</Label>
          </LabelContainer>
          <div className='padding'>
            <DisplayField disabled={true}>
              {celebInfo.groupName ? (
                <span>{celebInfo.groupName + ' ' + celebInfo.soloName}</span>
              ) : (
                <span>{celebInfo.soloName}</span>
              )}
            </DisplayField>
          </div>
        </ComponentWrapper>
        {(itemInfo?.whenDiscovery || itemInfo?.whereDiscovery) && (
          <ComponentWrapper>
            <LabelContainer>
              <Label>언제 어디서 착용했나요?</Label>
            </LabelContainer>
            <div className='padding'>
              <DisplayField disabled={true}>
                {itemInfo.whenDiscovery !== null && (
                  <span>{formatDate(new Date(itemInfo?.whenDiscovery as string))}</span>
                )}
                <span>{itemInfo.whereDiscovery}</span>
              </DisplayField>
            </div>
          </ComponentWrapper>
        )}
        <ComponentWrapper>
          <LabelContainer>
            <Label>어떤 아이템인가요?</Label>
          </LabelContainer>
          <div className='padding'>
            <DisplayField disabled={true}>
              <span>
                {itemInfo.itemCategory?.parentName !== '기타'
                  ? itemInfo.itemCategory?.parentName + '>' + itemInfo.itemCategory?.childName
                  : itemInfo.itemCategory?.parentName}
              </span>
              <span>{itemInfo.brand?.brandName}</span>
              <span>{itemInfo?.itemName}</span>
              {itemInfo.price !== null && (
                <>
                  {itemInfo.price !== -1 ? (
                    <span>{formatPrice(itemInfo?.price)}</span>
                  ) : (
                    <span>가격은 모르겠어요</span>
                  )}
                </>
              )}
            </DisplayField>
          </div>
        </ComponentWrapper>
        {(itemInfo.additionalInfo || itemInfo.hashTagList || itemInfo.infoSource) && (
          <ComponentWrapper>
            <LabelContainer>
              <Label>추가정보</Label>
            </LabelContainer>
            <div className='padding'>
              <DisplayField disabled={true}>
                {itemInfo?.additionalInfo && <span>{itemInfo?.additionalInfo}</span>}
                {itemInfo?.hashTagList && (
                  <span>
                    {(itemInfo.hashTagList as Array<IHashTag> | null)?.map(
                      (hashtag, index: number) => {
                        return <span key={index}>#{hashtag?.hashtagContent}&nbsp;</span>
                      },
                    )}
                  </span>
                )}
                {itemInfo?.infoSource && <span>{itemInfo?.infoSource}</span>}
              </DisplayField>
            </div>
          </ComponentWrapper>
        )}
        {itemInfo.linkList !== null && (
          <ComponentWrapper>
            <LabelContainer>
              <Label>구매링크</Label>
            </LabelContainer>
            <div className='padding'>
              <DisplayField disabled={true}>
                {(itemInfo.linkList as Array<ILink> | null)?.map((link, index) => (
                  <span key={index}>{link.linkName}</span>
                ))}
              </DisplayField>
            </div>
          </ComponentWrapper>
        )}
      </ItemWrapper>
      <ToolTip right='0' top='-3.125rem' arrowPosition='bottom-right' isVisible={true}>
        이렇게 입력하신게 맞을까요?
      </ToolTip>
      <ConfirmButtonWrapper>
        <ButtonHalf
          text='다시 할게요'
          type='cancel'
          isbottom={true}
          onClick={() => navigate(-1)}
        ></ButtonHalf>
        <ButtonHalf
          text='네! 맞아요'
          type='confirm'
          isbottom={true}
          onClick={() => alert('네 맞아요')}
        ></ButtonHalf>
      </ConfirmButtonWrapper>
    </ConfirmContainer>
  )
}

export default ItemConfirm
