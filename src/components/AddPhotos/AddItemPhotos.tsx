import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { AddPhotosWrapper } from './styles'
import AddButton from './AddButton'
import Photo from './Photo'
import { communityItemState, imgListState } from '../../recoil/communityInfo'

interface IAddPhotosProps {
  onClick?: any
}

const AddItemPhotos = ({ onClick }: IAddPhotosProps) => {
  const [imgItemList, setImgItemList] = useRecoilState(imgListState)
  const setCommunityUploadInfo = useSetRecoilState(communityItemState)

  // drag and drop 완료시
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const reorderedList = Array.from(imgItemList)
    const [removed] = reorderedList.splice(startIndex, 1)
    reorderedList.splice(endIndex, 0, removed)

    // representFlag 수정 -> 최종 업로드때는 imgItemList 통해 확인
    const updatedList = reorderedList.map((img, index) => ({
      ...img,
      representFlag: index === 0,
    }))
    setImgItemList(updatedList)
  }

  const handleRemovePhoto = (index: number) => {
    const updatedList = [...imgItemList]
    const removedItem = updatedList.splice(index, 1)[0]
    // display(imgItemList)에서 삭제
    const finalList = updatedList.map((img, index) => ({
      ...img,
      representFlag: index === 0,
    }))
    setImgItemList(finalList)
    // 최종 업로드 data에서 삭제
    if (removedItem.itemId) {
      // itemList에서 아이템 삭제
      setCommunityUploadInfo((prevInfo) => ({
        ...prevInfo,
        itemList: prevInfo.itemList?.filter((item) => item.itemId !== removedItem.itemId) || null,
      }))
    } else {
      // imgList에서 사진 삭제
      setCommunityUploadInfo((prevInfo) => ({
        ...prevInfo,
        imgList: prevInfo.imgList?.filter((item) => item.imgUrl !== removedItem.imgUrl) || null,
      }))
    }
  }

  return (
    <AddPhotosWrapper>
      {imgItemList.length < 5 && (
        <AddButton itemCnt={imgItemList.length} onClick={() => onClick()}></AddButton>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided) => (
            <div className='row' ref={provided.innerRef}>
              {imgItemList.map((img, index) => (
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
                        imgUrl={img.imgUrl || ''}
                        representFlag={img.representFlag || false}
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

export default AddItemPhotos
