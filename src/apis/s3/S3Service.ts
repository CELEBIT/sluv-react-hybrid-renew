import axios from 'axios'
import request from '../core'
import { ResponseType } from '../core/type'
import { Image } from '../../components/AddPhotos/AddPhotos'
import { CommunityItem, IimgList, IselectedItem } from '../../recoil/communityInfo'
import { SetterOrUpdater } from 'recoil'

export interface S3Result {
  preSignedUrl: string
  key: string
}

export default class S3Service {
  presignedUrl: string

  constructor() {
    this.presignedUrl = '/app/s3/pre-signed-url'
  }

  async uploadImg(s3Url: string, file: File) {
    const data: any = await axios({
      headers: {
        'Content-Type': `image/${file.type.split('/')[1]}`,
      },
      data: file,
      method: 'PUT',
      url: s3Url,
    })
    return data
  }

  // 아이템 이미지 업로드
  async postItemImg(fileList: Array<Image>) {
    const resultList: Array<Image> = []
    const data = await Promise.allSettled(
      fileList.map(async (item) => {
        const response: ResponseType<S3Result> = await request.post(
          `${this.presignedUrl}/item`,
          {},
          {
            params: {
              imgExtension: String(item.imgFile?.type.split('/')[1]).toUpperCase(),
            },
          },
        )

        if (response.isSuccess && response.result?.preSignedUrl && item.imgFile) {
          try {
            const data = await this.uploadImg(response.result.preSignedUrl, item.imgFile)
            if (data.status === 200) {
              const { preSignedUrl } = response.result
              resultList.push({
                representFlag: item.representFlag,
                imgUrl: preSignedUrl.split('?')[0],
              })
            }
          } catch (err: any) {
            console.error(err)
            return err
          }
        }
      }),
    )
    return await resultList
  }

  // 커뮤니티 이미지 업로드
  async postCommunityImg(
    fileList: Array<IselectedItem>,
    setCommunityItem: SetterOrUpdater<CommunityItem>,
  ) {
    const resultList: Array<IimgList> = []
    for (const item of fileList) {
      const response: ResponseType<S3Result> = await request.post(
        `${this.presignedUrl}/question`,
        {},
        {
          params: {
            imgExtension: String(item.imgFile?.type.split('/')[1]).toUpperCase(),
          },
        },
      )

      if (response.isSuccess && response.result?.preSignedUrl && item.imgFile) {
        try {
          const data = await this.uploadImg(response.result.preSignedUrl, item.imgFile)
          if (data.status === 200) {
            const { preSignedUrl } = response.result
            resultList.push({
              imgUrl: preSignedUrl.split('?')[0],
              description: item.description,
              representFlag: item.representFlag,
              sortOrder: item.sortOrder,
            })
          }
        } catch (err: any) {
          console.error(err)
          return err
        }
      }
    }
    console.log('resultList', resultList)
    setCommunityItem((prevCommunityItem) => ({
      ...prevCommunityItem,
      imgList: resultList,
    }))
    return resultList
  }

  async postClosetImg(img: File) {
    const data: ResponseType<S3Result> = await request.post(
      `${this.presignedUrl}/closet`,
      {},
      { params: { imgExtension: String(img.type.split('/')[1]).toUpperCase() } },
    )
    const res = await this.uploadImg(data.result?.preSignedUrl ?? '', img)

    return data.result?.preSignedUrl ?? ''
  }
}
