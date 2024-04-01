import React, { useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as Add } from '../../../../../assets/add_18.svg'
import { ReactComponent as Error } from '../../../../../assets/error_20.svg'
import { Pretendard, Common } from '../../../../../components/styles'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Image, imgListState } from '../../../../../components/AddPhotos/AddPhotos'

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
        representFlag: i == 0 ? true : false,
        imgFile: imgFileList[i],
      })
    }
    setImgList([...temp])

    if (fileInputRef.current?.value) fileInputRef.current.value = ''
  }

  const sendMessageToiOS = (totalPhotos: number, selectPhotos: number) => {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.IOSBridge) {
      window.webkit.messageHandlers.IOSBridge.postMessage({ totalPhotos, selectPhotos })
    } else {
      console.error('The webkit messageHandlers interface is not available.')
    }
  }

  const openGallery = (totalPhotos: number, photosToSelect: number) => {
    if (typeof window !== 'undefined' && window.webkit) {
      window.webkit.messageHandlers.IOSBridge.postMessage(
        JSON.stringify({
          type: 'openGallery',
          totalPhotos,
          photosToSelect,
        }),
      )
      alert('message Sent')
    } else {
      console.error('The app is not running in a WebView or server-side rendering is in process.')
    }
  }

  const onClickOpenGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      console.log('clicked')
      openGallery(5, 5 - imgList.length)
    }
  }

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = (event: any) => {
      // 여기서는 event.data가 사진 데이터 배열이라고 가정
      // 실제로는 event.origin 등을 체크하여 보안을 강화하는 것이 좋음
      console.log('event', event)
      console.log('event.data', event.data)
      const target = event.data
      const imgFileList = target.files as FileList

      const temp: Array<Image> = []
      for (let i = 0; i < imgFileList.length; i++) {
        temp.push({
          representFlag: i == 0 ? true : false,
          imgFile: imgFileList[i],
        })
      }
      setImgList([...temp])
      alert(event.data)
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
        onClick={onClickOpenGallery}
        style={{ display: 'none' }}
        multiple
        max={5}
        ref={fileInputRef}
      ></input>
    </DefaultImageFieldWrapper>
  )
}

export default DefaultImageField

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
