import React from 'react'
import S3Service from '../S3Service'
import { useMutation } from '@tanstack/react-query'
import { Image } from '../../../components/AddPhotos/AddPhotos'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { itemInfoState } from '../../../recoil/itemInfo'
import { ImgResult } from '../../item/itemService.type'
import {
  IimgList,
  IselectedItem,
  communityItemState,
  imgListUpdatedState,
} from '../../../recoil/communityInfo'
import useUploadQuestionQuery from '../../question/hooks/useUploadQuestionQuery'
import { communityMenuState } from '../../../components/Header/CommunityHeader/CommunityHeader'
import { convertToSeoulTimeISOString } from '../../../utils/utility'

const useCommunityImgUpload = () => {
  const s3 = new S3Service()
  const {
    postFindRequest: { mutate: mutatebyFind },
    postHowAboutRequest: { mutate: mutatebyHow },
    postBuyRequest: { mutate: mutatebyBuy },
    postRecommendRequest: { mutate: mutatebyRecommend },
  } = useUploadQuestionQuery()

  const [communityItem, setCommunityItem] = useRecoilState(communityItemState)
  const communityMenu = useRecoilValue(communityMenuState)

  const postCommunityImg = useMutation(
    (fileList: Array<IselectedItem>) =>
      s3.postCommunityImg(fileList, communityItem, setCommunityItem),
    {
      onSuccess: (res) => {
        console.log(communityItem)
        if (communityMenu === '찾아주세요') mutatebyFind({ ...communityItem, imgList: res })
        if (communityMenu === '이거 어때') mutatebyHow({ ...communityItem, imgList: res })
        if (communityMenu === '이 중에 뭐 살까')
          mutatebyBuy({
            ...communityItem,
            imgList: res,
            voteEndTime: convertToSeoulTimeISOString(
              communityItem.voteEndTime ? communityItem.voteEndTime : new Date(),
            ),
          })
        if (communityMenu === '추천해 줘') mutatebyRecommend({ ...communityItem, imgList: res })
      },
    },
  )
  return { postCommunityImg }
}

export default useCommunityImgUpload
