import React, { useCallback, useEffect, useRef, memo } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as Add } from '../../../../../assets/add_18.svg'
import { ReactComponent as Error } from '../../../../../assets/error_20.svg'
import { Pretendard, Common } from '../../../../../components/styles'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Image, imgListState } from '../../../../../components/AddPhotos/AddPhotos'
import { convertToImageList, openGallery } from '../../../../../utils/utility'

interface ImageFieldProps {
  error: boolean
}

const DefaultImageField = ({ error }: ImageFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imgList, setImgList] = useRecoilState(imgListState)

  const changeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const imgFileList = target.files as FileList

    const temp: Array<Image> = []
    for (let i = 0; i < imgFileList.length; i++) {
      temp.push({
        representFlag: imgList.length === 0 && i == 0 ? true : false,
        imgFile: imgFileList[i],
        imgFileUrl: URL.createObjectURL(imgFileList[i]),
        // 이미지 url변경 안되도록
      })
    }
    setImgList([...temp])

    if (fileInputRef.current?.value) fileInputRef.current.value = ''
  }

  const onClickOpenGallery = () => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      openGallery(5, 5 - imgList.length)
    } else if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = (event: any) => {
      const images = convertToImageList(event.detail, imgList)
      setImgList([...imgList, ...images])
    }

    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
    }
  }, [])

  return (
    <DefaultImageFieldWrapper error={error} onClick={onClickOpenGallery}>
      {error ? <Error></Error> : <Add></Add>}
      <span>착용 사진을 올려주세요 (0/5)</span>
      <input
        id='inputFile'
        type='file'
        accept='image/*'
        onChange={(e) => changeImg(e)}
        // onClick={onClickOpenGallery}
        style={{ display: 'none' }}
        multiple
        max={5}
        ref={fileInputRef}
      ></input>
    </DefaultImageFieldWrapper>
  )
}

export default memo(DefaultImageField)

const DefaultImageFieldWrapper = styled.div<{ error: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  margin: 1rem 1.25rem 0 1.25rem;
  height: 4.625rem;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR500,
  })}
  color: ${(props) => props.error && Common.colors.ERROR};
`
