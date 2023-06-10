import React from 'react'
import { atomKeys } from '../../config/atomKeys'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { AddPhotosWrapper } from './styles'
import AddButton from './AddButton'
import Photo from './Photo'

interface IAddPhotosProps {
  canAddItem?: boolean
  onClick?: any
}

interface Image {
  imgUrl: string
  representFlag: boolean
}

export const imgListState = atom<Image[]>({
  key: atomKeys.imgListState,
  default: [],
})

const AddPhotos = ({ canAddItem, onClick }: IAddPhotosProps) => {
  const [imgList, setImageList] = useRecoilState(imgListState)

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
    console.log(finalList)
    setImageList(finalList)
  }

  return (
    <AddPhotosWrapper onClick={() => onClick()}>
      {imgList.length < 5 && <AddButton itemCnt={imgList.length}></AddButton>}
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
                        representFlag={img.representFlag}
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
