import React from 'react'
import { atomKeys } from '../../config/atomKeys'
import { atom, useRecoilValue } from 'recoil'
import { AddPhotosWrapper } from './styles'
import AddButton from './AddButton'
import Photo from './Photo'

interface Image {
  imgUrl: string
  representFlag: boolean
}

export const imgListState = atom<Image[]>({
  key: atomKeys.imgListState,
  default: [
    {
      imgUrl:
        'https://as1.ftcdn.net/v2/jpg/03/24/14/46/1000_F_324144671_M7MHvhiUyIbLLyiaSHIAjhRpijdHK9eW.jpg',
      representFlag: true,
    },
    {
      imgUrl:
        'https://as1.ftcdn.net/v2/jpg/03/24/14/46/1000_F_324144671_M7MHvhiUyIbLLyiaSHIAjhRpijdHK9eW.jpg',
      representFlag: false,
    },
    {
      imgUrl:
        'https://as1.ftcdn.net/v2/jpg/03/24/14/46/1000_F_324144671_M7MHvhiUyIbLLyiaSHIAjhRpijdHK9eW.jpg',
      representFlag: false,
    },
    {
      imgUrl:
        'https://as1.ftcdn.net/v2/jpg/03/24/14/46/1000_F_324144671_M7MHvhiUyIbLLyiaSHIAjhRpijdHK9eW.jpg',
      representFlag: false,
    },
    {
      imgUrl:
        'https://as1.ftcdn.net/v2/jpg/03/24/14/46/1000_F_324144671_M7MHvhiUyIbLLyiaSHIAjhRpijdHK9eW.jpg',
      representFlag: false,
    },
  ],
})

const AddPhotos = () => {
  const imgList = useRecoilValue(imgListState)
  return (
    <AddPhotosWrapper>
      <AddButton itemCnt={imgList.length}></AddButton>
      {imgList.map((img, index) => {
        return (
          <Photo
            key={index}
            size={74}
            borderRadius={8}
            imgUrl={img.imgUrl}
            representFlag={img.representFlag}
            candelete={true}
          ></Photo>
        )
      })}
    </AddPhotosWrapper>
  )
}

export default AddPhotos
