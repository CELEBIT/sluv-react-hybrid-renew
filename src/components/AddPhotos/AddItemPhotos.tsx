import React, { useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { AddPhotosWrapper } from './styles'
import AddButton from './AddButton'
import Photo from './Photo'
import { communityItemState, imgItemListState } from '../../recoil/communityInfo'
import { commentState } from '../../pages/community/detail/CommunityDetail'
import { useLocation } from 'react-router-dom'
interface IAddPhotosProps {
  onClick?: any
  size?: number
}

const AddItemPhotos = ({ onClick, size }: IAddPhotosProps) => {
  const location = useLocation()
  const currentRoute = location.pathname
  const [imgItemList, setImgItemList] = useRecoilState(imgItemListState)
  const setCommunityUploadInfo = useSetRecoilState(communityItemState)
  const setCommentObject = useSetRecoilState(commentState)

  console.log('imgItemList in AddItemPhotos', imgItemList)

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) {
        return
      }

      const startIndex = result.source.index
      const endIndex = result.destination.index

      const reorderedList = Array.from(imgItemList)
      const [removed] = reorderedList.splice(startIndex, 1)
      reorderedList.splice(endIndex, 0, removed)

      const updatedList = reorderedList.map((img, index) => ({
        ...img,
        representFlag: index === 0,
      }))

      setImgItemList(updatedList) // Update state with the reordered list
    },
    [imgItemList, setImgItemList],
  )

  const handleRemovePhoto = useCallback(
    (index: number) => {
      const updatedList = [...imgItemList]
      const removedItem = updatedList.splice(index, 1)[0]
      // display(imgItemList)에서 삭제
      const finalList = updatedList.map((img, index) => ({
        ...img,
        representFlag: index === 0,
      }))
      setImgItemList(finalList)

      if (
        currentRoute === '/community/comment/upload' ||
        currentRoute === '/community/comment/edit'
      ) {
        if (removedItem.itemId) {
          // Comment itemList에서 아이템 삭제
          setCommentObject((prevObject) => ({
            ...prevObject,
            itemList:
              prevObject.itemList?.filter((item) => item.itemId !== removedItem.itemId) || null,
          }))
        } else {
          // Comment imgList에서 사진 삭제
          setCommentObject((prevObject) => ({
            ...prevObject,
            imgList:
              prevObject.imgList?.filter((item) => item.imgUrl !== removedItem.imgUrl) || null,
          }))
        }
      } else {
        // 최종 업로드 data에서 삭제
        if (removedItem.itemId) {
          // itemList에서 아이템 삭제
          setCommunityUploadInfo((prevInfo) => ({
            ...prevInfo,
            itemList:
              prevInfo.itemList?.filter((item) => item.itemId !== removedItem.itemId) || null,
          }))
        } else {
          // imgList에서 사진 삭제
          setCommunityUploadInfo((prevInfo) => ({
            ...prevInfo,
            imgList: prevInfo.imgList?.filter((item) => item.imgUrl !== removedItem.imgUrl) || null,
          }))
        }
      }
    },
    [currentRoute, imgItemList, setCommentObject, setCommunityUploadInfo],
  )

  return (
    <AddPhotosWrapper>
      {imgItemList.length < 5 && (
        <AddButton size={size} itemCnt={imgItemList.length} onClick={() => onClick()}></AddButton>
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
                        size={size ? size : 74}
                        borderRadius={8}
                        imgUrl={img.imgUrl ? img.imgUrl : undefined}
                        imgFile={img.imgFile ? img.imgFile : undefined}
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
