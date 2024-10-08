import React, { useEffect, useRef, memo } from 'react'
import { atomKeys } from '../../config/atomKeys'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { AddPhotosWrapper } from './styles'
import AddButton from './AddButton'
import Photo from './Photo'
import { useLocation } from 'react-router-dom'
import { convertToImageList, openGallery } from '../../utils/utility'

export interface Image {
  imgFile?: File // 이미지 업로드 용 파일
  imgFileUrl?: string // 이미지 사진 display용 URL.createObjectURL
  representFlag: boolean
  imgUrl?: string
}

export const imgListState = atom<Image[]>({
  key: atomKeys.imgListState,
  default: [],
})

const AddPhotos = () => {
  const [imgList, setImgList] = useRecoilState(imgListState)
  const location = useLocation()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const changeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const imgFileList = target.files as FileList

    const temp: Image[] = []
    for (let i = 0; i < imgFileList.length; i++) {
      temp.push({
        representFlag: imgList.length === 0 && i == 0 ? true : false,
        imgFile: imgFileList[i],
        imgFileUrl: URL.createObjectURL(imgFileList[i]),
      })
    }
    setImgList([...imgList, ...temp])

    if (fileInputRef.current?.value) fileInputRef.current.value = ''
  }

  const onClickOpenGallery = () => {
    openGallery(5, 5 - imgList.length, fileInputRef)
  }

  useEffect(() => {
    const handlePhotosMessage = (event: any) => {
      const data = event.detail
      const images = convertToImageList(data, imgList)
      setImgList([...imgList, ...images])
    }

    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
    }
  }, [imgList, setImgList])

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = (event: any) => {
      const parsedData = JSON.parse(event.data)
      const images = convertToImageList(parsedData.detail, imgList)
      setImgList([...imgList, ...images])
    }

    document.addEventListener('message', handlePhotosMessage)
    return () => {
      document.removeEventListener('message', handlePhotosMessage)
    }
  }, [])

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const reorderedList = Array.from(imgList)
    const [removed] = reorderedList.splice(startIndex, 1)
    reorderedList.splice(endIndex, 0, removed)

    // representFlag 수정 -> 최종 업로드때는 imgItemList 통해 확인
    const updatedList = reorderedList.map((img, index) => ({
      ...img,
      representFlag: index === 0,
    }))
    setImgList(updatedList)
  }
  const handleRemovePhoto = (index: number) => {
    const updatedList = [...imgList]
    updatedList.splice(index, 1)
    const finalList = updatedList.map((img, index) => ({
      ...img,
      representFlag: index === 0,
    }))
    setImgList(finalList)
  }

  return (
    <AddPhotosWrapper>
      {imgList.length < 5 && !location.pathname.includes('edit') && (
        <AddButton onClick={() => onClickOpenGallery()} itemCnt={imgList.length}>
          <input
            id='inputFile'
            type='file'
            accept='image/*'
            onChange={(e) => changeImg(e)}
            style={{ display: 'none' }}
            multiple
            max={5}
            ref={fileInputRef}
          ></input>
        </AddButton>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided) => (
            <div className='row' ref={provided.innerRef}>
              {imgList.map((img, index) => (
                <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Photo
                        key='image'
                        size={74}
                        borderRadius={8}
                        imgUrl={img.imgUrl || img.imgFileUrl}
                        representFlag={index === 0}
                        candelete={
                          location.pathname.includes('edit') && imgList.length === 1 ? false : true
                        }
                        onDelete={() => handleRemovePhoto(index)}
                      ></Photo>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </AddPhotosWrapper>
  )
}

export default memo(AddPhotos)
