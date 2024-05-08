import React from 'react'
import { IUserMypageInfo } from '../../../../apis/user/userService'
import {
  BottomInfo,
  CardWrapper,
  CommunityCard,
  ContentTitle,
  Count,
  EachContentWrapper,
  ItemCard,
  ItemPreviewImg,
  PreviewWrapper,
} from '../../styles'
import { useNavigate } from 'react-router-dom'

interface UserUploadProps {
  data: IUserMypageInfo | undefined
}

const UserUpload = ({ data }: UserUploadProps) => {
  const navigate = useNavigate()
  return (
    <EachContentWrapper>
      <ContentTitle>나의 게시글</ContentTitle>
      <CardWrapper>
        <ItemCard onClick={() => navigate('./item')}>
          아이템
          <BottomInfo>
            <PreviewWrapper>
              <ItemPreviewImg
                imgUrl={data && data?.imgList.length > 0 ? data?.imgList[0] : undefined}
              ></ItemPreviewImg>
              <ItemPreviewImg
                className='second'
                imgUrl={data && data?.imgList.length > 0 ? data?.imgList[1] : undefined}
              ></ItemPreviewImg>
            </PreviewWrapper>
            <Count>{data?.itemCount}</Count>
          </BottomInfo>
        </ItemCard>
        <CommunityCard onClick={() => navigate('./community')}>
          커뮤니티
          <BottomInfo>
            <Count className='right'>{data?.communityCount}</Count>
          </BottomInfo>
        </CommunityCard>
      </CardWrapper>
    </EachContentWrapper>
  )
}

export default UserUpload
