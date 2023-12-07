import React, { useRef } from 'react'
import { atomKeys } from '../../config/atomKeys'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { AddPhotosWrapper } from './styles'
import AddButton from './AddButton'
import Photo from './Photo'

export interface Image {
  imgFile?: File
  representFlag: boolean
  imgUrl?: string
}

export const imgListState = atom<Image[]>({
  key: atomKeys.imgListState,
  default: [],
})

const AddPhotos = () => {
  const [imgList, setImageList] = useRecoilState(imgListState)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const changeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const imgFileList = target.files as FileList

    const temp: Image[] = []
    for (let i = 0; i < imgFileList.length; i++) {
      temp.push({
        representFlag: i == 0 ? true : false,
        imgFile: imgFileList[i],
      })
    }
    setImageList([...imgList, ...temp])

    if (fileInputRef.current?.value) fileInputRef.current.value = ''
  }
  const onClickOpenGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const reorderedList = Array.from(imgList)
    const [removed] = reorderedList.splice(startIndex, 1)
    reorderedList.splice(endIndex, 0, removed)

    // Update the representFlag based on the new order
    const updatedList = reorderedList.map((img, index) => ({
      ...img,
      representFlag: index === 0,
    }))
    // Update the state with the reordered and updated list
    setImageList(updatedList)
  }
  const handleRemovePhoto = (index: number) => {
    const updatedList = [...imgList]
    updatedList.splice(index, 1)
    const finalList = updatedList.map((img, index) => ({
      ...img,
      representFlag: index === 0,
    }))
    setImageList(finalList)
  }

  return (
    <AddPhotosWrapper>
      {imgList.length < 5 && (
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
                        imgUrl={img.imgUrl}
                        imgFile={img.imgFile}
                        representFlag={index === 0}
                        candelete={true}
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

export default AddPhotos
