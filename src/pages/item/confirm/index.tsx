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

const ItemConfirm = () => {
  const navigate = useNavigate()
  const itemInfo = useRecoilValue(itemInfoState)
  const celebInfo = useRecoilValue(celebInfoInItemState)

  return (
    <ConfirmContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='정보확인'></Header>
      </HeaderWrapper>
      <ItemWrapper>
        {/* 업로드 사진 */}
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
        {/* 선택 셀럽 */}
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
        {/* 착용 날짜 & 장소 */}
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
        {/* 아이템 정보 (브랜드,제품명, 가격) */}
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
        {/* 추가정보 (내용, 해시태그, 출처) */}
        {(itemInfo.additionalInfo || itemInfo.hashTagList || itemInfo.infoSource) && (
          <ComponentWrapper>
            <LabelContainer>
              <Label>추가정보</Label>
            </LabelContainer>
            <div className='padding'>
              <DisplayField disabled={true}>
                {itemInfo?.additionalInfo && itemInfo.additionalInfo !== '' && (
                  <span>{itemInfo?.additionalInfo}</span>
                )}
                {itemInfo?.hashTagList && itemInfo.hashTagList.length > 0 && (
                  <span>
                    {itemInfo?.hashTagList?.map((hashtag) => {
                      return `#${hashtag?.hashtagContent} `
                    })}
                  </span>
                )}
                {itemInfo?.infoSource && <span>{itemInfo?.infoSource}</span>}
              </DisplayField>
            </div>
          </ComponentWrapper>
        )}
        {/* 구매링크 */}
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
