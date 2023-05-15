import React from 'react'
import { ConfirmButtonWrapper, ConfirmContainer, ItemWrapper, PhotosWrapper } from './styles'
import { HeaderWrapper } from '../addInfo/styles'
import Header from '../../../components/Header/Header'
import Photo from '../../../components/AddPhotos/Photo'
import { ComponentWrapper, Label, LabelContainer } from '../create/styles'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'

import { useRecoilValue } from 'recoil'
import ButtonHalf from '../../../components/ButtonHalf/ButtonHalf'
import { formatDate } from '../create/components/DatePlaceField/date.util'
import { formatPrice } from '../create/components/PriceField/price.util'
import { itemInfoState, celebInfoInItemState } from '../../../recoil/itemInfo'

const ItemConfirm = () => {
  const itemInfo = useRecoilValue(itemInfoState)
  console.log(itemInfo)
  const celebInfo = useRecoilValue(celebInfoInItemState)
  //   const itemInfo = {
  //     imgList: [
  //       {
  //         imgUrl: 'string',
  //         representFlag: true,
  //       },
  //     ],
  //     celeb: {
  //       id: 0,
  //       parentId: 0,
  //       category: 'string',
  //       celebParentNameKr: 'string',
  //       celebChildNameKr: 'string',
  //       celebTotalNameKr: 'string',
  //       celebTotalNameEn: 'string',
  //     },
  //     newCelebName: 'string',
  //     category: {
  //       id: 0,
  //       parentId: 0,
  //       name: 'string',
  //       parentName: 'string',
  //     },
  //     itemName: 'string',
  //     brand: {
  //       id: 0,
  //       brandKr: 'string',
  //       brandEn: 'string',
  //       brandImgUrl: 'string',
  //     },
  //     newBrandName: 'string',
  //     likeNum: 0,
  //     likeStatus: true,
  //     scrapNum: 0,
  //     scrapStatus: true,
  //     viewNum: 0,
  //     linkList: [
  //       {
  //         itemLinkUrl: 'string',
  //         linkName: 'string',
  //       },
  //     ],
  //     writer: {
  //       id: 0,
  //       nickName: 'string',
  //       profileImgUrl: 'string',
  //     },
  //     whenDiscovery: '2023-05-15T05:36:35.318Z',
  //     whereDiscovery: 'string',
  //     price: 0,
  //     additionalInfo: 'string',
  //     hashTagList: [
  //       {
  //         hashtagId: 0,
  //         hashtagContent: 'string',
  //         count: 0,
  //       },
  //     ],
  //     infoSource: 'string',
  //     sameCelebItemList: [
  //       {
  //         itemId: 0,
  //         imgUrl: 'string',
  //         brandName: 'string',
  //         itemName: 'string',
  //         celebName: 'string',
  //         scrapStatus: true,
  //       },
  //     ],
  //     sameBrandItemList: [
  //       {
  //         itemId: 0,
  //         imgUrl: 'string',
  //         brandName: 'string',
  //         itemName: 'string',
  //         celebName: 'string',
  //         scrapStatus: true,
  //       },
  //     ],
  //     color: 'string',
  //     followStatus: true,
  //   }

  return (
    <ConfirmContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='정보확인'></Header>
      </HeaderWrapper>
      <ItemWrapper>
        <PhotosWrapper>
          {itemInfo.imgList?.map((img, index) => {
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

        <ComponentWrapper>
          <LabelContainer>
            <Label>누가 착용했나요?</Label>
          </LabelContainer>
          <div className='padding'>
            <DisplayField disabled={true}>
              <span>{celebInfo.groupName + ' ' + celebInfo.soloName}</span>
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
                  <span>{formatDate(itemInfo?.whenDiscovery as Date)}</span>
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
                {itemInfo.itemCategory?.parentName + '>' + itemInfo.itemCategory?.childName}
              </span>
              <span>{itemInfo.brand?.brandName}</span>
              <span>{itemInfo?.itemName}</span>
              {itemInfo.price !== null && <span>{formatPrice(itemInfo?.price)}</span>}
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
                    {itemInfo?.hashTagList?.map((hashtag, index: number) => {
                      return <text key={index}>#{hashtag}</text>
                    })}
                  </span>
                )}
                {itemInfo?.infoSource && <span>{itemInfo?.infoSource}</span>}
              </DisplayField>
            </div>
          </ComponentWrapper>
        )}

        {itemInfo.linkList?.length && (
          <ComponentWrapper>
            <LabelContainer>
              <Label>구매링크</Label>
            </LabelContainer>
            <div className='padding'>
              <DisplayField disabled={true}>
                {itemInfo.linkList.map((link, index) => {
                  return <span key={index}>{link.linkName}</span>
                })}
              </DisplayField>
            </div>
          </ComponentWrapper>
        )}
      </ItemWrapper>
      <ConfirmButtonWrapper>
        <ButtonHalf
          text='다시 할게요'
          type='cancel'
          isbottom={true}
          onClick={() => alert('다시할게요')}
        ></ButtonHalf>
        <ButtonHalf
          text='네! 맞아요'
          type='confirm'
          isbottom={true}
          onClick={() => alert('다시할게요')}
        ></ButtonHalf>
      </ConfirmButtonWrapper>
    </ConfirmContainer>
  )
}

export default ItemConfirm
