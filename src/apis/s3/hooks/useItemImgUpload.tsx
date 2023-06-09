import React from 'react'
import S3Service from '../S3Service'
import { useMutation } from '@tanstack/react-query'
import { Image } from '../../../components/AddPhotos/AddPhotos'

const useItemImgUpload = () => {
  const s3 = new S3Service()

  const postItemImg = useMutation((fileList: Array<Image>) => s3.postItemImg(fileList), {
    onSuccess: (res) => {
      console.log(res)
    },
    onError: (err) => {
      console.error(err)
    },
  })
  return { postItemImg }
}

export default useItemImgUpload
