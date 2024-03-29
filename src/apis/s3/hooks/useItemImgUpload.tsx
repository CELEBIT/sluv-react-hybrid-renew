import React from 'react'
import S3Service from '../S3Service'
import { useMutation } from '@tanstack/react-query'
import { Image } from '../../../components/AddPhotos/AddPhotos'
import { useRecoilState } from 'recoil'
import { itemInfoState } from '../../../recoil/itemInfo'
import { ImgResult } from '../../item/itemService.type'
import { communityItemState } from '../../../recoil/communityInfo'

const useItemImgUpload = () => {
  const s3 = new S3Service()
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const postItemImg = useMutation((fileList: Array<Image>) => s3.postItemImg(fileList), {
    onSuccess: (res) => {
      console.log(res)

      const temp: Array<ImgResult> = []

      res.map((item, idx) => {
        if (!item.imgUrl) return
        temp.push({
          imgUrl: item.imgUrl,
          representFlag: item.representFlag,
          sortOrder: idx,
        })
      })
      setItemInfo({
        ...itemInfo,
        imgList: temp,
      })
    },
    onError: (err) => {
      console.error(err)
    },
  })
  return { postItemImg }
}

export default useItemImgUpload
