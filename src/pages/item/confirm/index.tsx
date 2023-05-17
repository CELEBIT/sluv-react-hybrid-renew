import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmButtonWrapper, ConfirmContainer, ItemWrapper, PhotosWrapper } from './styles'
import { HeaderWrapper } from '../addInfo/styles'
import Header from '../../../components/Header/Header'
import Photo from '../../../components/AddPhotos/Photo'
import { ComponentWrapper, Label, LabelContainer } from '../create/styles'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'

import { useRecoilValue } from 'recoil'
import { itemInfoState, celebInfoInItemState } from '../../../recoil/itemInfo'
import ButtonHalf from '../../../components/ButtonHalf/ButtonHalf'
import { formatDate } from '../create/components/DatePlaceField/date.util'
import { formatPrice } from '../create/components/PriceField/price.util'
import ToolTip from '../../../components/ToolTip/ToolTip'
// import { IItemInfo } from '../../../recoil/itemInfo'

const ItemConfirm = () => {
  const navigate = useNavigate()
  const itemInfo = useRecoilValue(itemInfoState)
  const celebInfo = useRecoilValue(celebInfoInItemState)

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
  //   whenDiscovery: null,
  //   whereDiscovery: null,
  //   itemCategory: {
  //     categoryId: null,
  //     childName: null,
  //     parentCategoryId: 9,
  //     parentName: '기타',
  //   },
  //   brand: { brandId: 1, brandName: '나이키', brandImgUrl: '' },
  //   itemName: 'BROCOLLI FAMILY HOODIE',
  //   price: -1,
  //   color: null,
  //   additionalInfo: null,
  //   hashTagList: null,
  //   linkList: null,
  //   infoSource: null,
  //   newBrand: null,
  // }
  return (
    <ConfirmContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='정보확인'></Header>
      </HeaderWrapper>
      <ItemWrapper>
        <ComponentWrapper>
          <PhotosWrapper>
            {itemInfo?.imgList &&
              itemInfo?.imgList.map((img, index) => {
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
                {itemInfo.whenDiscovery && (
                  <span>{formatDate(new Date(itemInfo?.whenDiscovery as string))}</span>
                )}
                {itemInfo.whereDiscovery && <span>{itemInfo.whereDiscovery}</span>}
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
              {itemInfo.price && itemInfo.price !== -1 && (
                <>
                  {itemInfo?.price > 500000000 ? (
                    <span>5억원대 이상</span>
                  ) : (
                    <span>{formatPrice(itemInfo?.price)}대</span>
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
                    {itemInfo.hashTagList?.map((hashtag, index: number) => {
                      return <span key={index}>#{hashtag?.hashtagContent}&nbsp;</span>
                    })}
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
                {itemInfo.linkList?.map((link, index) => (
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
