import React, { useEffect, useState } from 'react'
import { Img, Item, ItemImg } from '../../../../apis/question/questionService.type'
import {
  BrandName,
  CelebName,
  ItemInfoWrapper,
  ItemName,
} from '../../CreateCommunity/question/components/twoItemUpload/eachItemField/ExistingItem'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'
import FullPageImageModal, {
  currentPictureIndexState,
} from '../../../../components/FullPageImageModal/FullPageImageModal'

interface DisplayPhotoItemsProps {
  imgList: Array<Img> | null | undefined
  itemList: Array<Item> | null | undefined
}

const DisplayPhotoItems = ({ imgList, itemList }: DisplayPhotoItemsProps) => {
  const combinedList = [...(imgList || []), ...(itemList || [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  )

  const [isImgModalOpen, setIsImgModalOpen] = useState(false)
  const [fullPageImgList, setfullPageImgList] = useState<ItemImg[]>([])
  const [currentPictureIndex, setCurrentPictureIndex] = useRecoilState(currentPictureIndexState)
  const closeImageModal = () => setIsImgModalOpen(false)
  const onClickImg = (index: number) => {
    setCurrentPictureIndex(index)
    setIsImgModalOpen(true)
  }

  useEffect(() => {
    const fullPageImgList: ItemImg[] = [
      ...(imgList || []).map((img) => ({
        imgUrl: img.imgUrl,
        sortOrder: img.sortOrder,
      })),
      ...(itemList || []).map((item) => ({
        imgUrl: item.item.imgUrl,
        sortOrder: item.sortOrder,
      })),
    ].sort((a, b) => a.sortOrder - b.sortOrder)
    setfullPageImgList(fullPageImgList)
  }, [])

  const isImg = (item: Img | Item): item is Img => {
    return (item as Img).imgUrl !== undefined
  }
  if (combinedList.length === 0) {
    return null
  } else if (combinedList.length === 1) {
    return (
      <DisplayPhotoItemWrapper>
        {isImgModalOpen && fullPageImgList.length > 0 && (
          <FullPageImageModal onClose={closeImageModal} imgList={fullPageImgList} />
        )}
        {combinedList.map((each, index) => (
          <div className='full' key={index}>
            {isImg(each) ? (
              <ImageField
                imgUrl={each.imgUrl}
                dim={true}
                onClick={() => onClickImg(index)}
              ></ImageField>
            ) : (
              <ImageField imgUrl={each.item.imgUrl} dim={true} onClick={() => onClickImg(index)}>
                <ItemInfoWrapper>
                  <CelebName>{each.item.celebName}</CelebName>
                  <BrandName>{each.item.brandName}</BrandName>
                  <ItemName>{each.item.itemName}</ItemName>
                </ItemInfoWrapper>
              </ImageField>
            )}
          </div>
        ))}
      </DisplayPhotoItemWrapper>
    )
  } else if (combinedList.length === 2) {
    return (
      <DisplayPhotoItemWrapper>
        {isImgModalOpen && (
          <FullPageImageModal onClose={closeImageModal} imgList={fullPageImgList} />
        )}
        {isImg(combinedList[0]) ? (
          <ImageField
            imgUrl={combinedList[0].imgUrl}
            dim={true}
            onClick={() => onClickImg(0)}
          ></ImageField>
        ) : (
          <ImageField imgUrl={combinedList[0].item.imgUrl} dim={true} onClick={() => onClickImg(0)}>
            <ItemInfoWrapper>
              <CelebName>{combinedList[0].item.celebName}</CelebName>
              <BrandName>{combinedList[0].item.brandName}</BrandName>
              <ItemName>{combinedList[0].item.itemName}</ItemName>
            </ItemInfoWrapper>
          </ImageField>
        )}
        {isImg(combinedList[1]) ? (
          <ImageField
            imgUrl={combinedList[1].imgUrl}
            dim={true}
            onClick={() => onClickImg(1)}
          ></ImageField>
        ) : (
          <ImageField imgUrl={combinedList[1].item.imgUrl} dim={true} onClick={() => onClickImg(1)}>
            <ItemInfoWrapper>
              <CelebName>{combinedList[1].item.celebName}</CelebName>
              <BrandName>{combinedList[1].item.brandName}</BrandName>
              <ItemName>{combinedList[1].item.itemName}</ItemName>
            </ItemInfoWrapper>
          </ImageField>
        )}
      </DisplayPhotoItemWrapper>
    )
  } else if (combinedList.length === 3) {
    return (
      <DisplayPhotoItemWrapper>
        {isImgModalOpen && (
          <FullPageImageModal onClose={closeImageModal} imgList={fullPageImgList} />
        )}
        <ColumnWrapper>
          {isImg(combinedList[0]) ? (
            <ImageField
              imgUrl={combinedList[0].imgUrl}
              dim={true}
              onClick={() => onClickImg(0)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[0].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(0)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[0].item.celebName}</CelebName>
                <BrandName>{combinedList[0].item.brandName}</BrandName>
                <ItemName>{combinedList[0].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
        </ColumnWrapper>
        <ColumnWrapper>
          {isImg(combinedList[1]) ? (
            <ImageField
              imgUrl={combinedList[1].imgUrl}
              dim={true}
              onClick={() => onClickImg(1)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[1].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(1)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[1].item.celebName}</CelebName>
                <BrandName>{combinedList[1].item.brandName}</BrandName>
                <ItemName>{combinedList[1].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
          {isImg(combinedList[2]) ? (
            <ImageField
              imgUrl={combinedList[2].imgUrl}
              dim={true}
              onClick={() => onClickImg(2)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[2].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(3)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[2].item.celebName}</CelebName>
                <BrandName>{combinedList[2].item.brandName}</BrandName>
                <ItemName>{combinedList[2].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
        </ColumnWrapper>
      </DisplayPhotoItemWrapper>
    )
  } else if (combinedList.length === 4) {
    return (
      <DisplayPhotoItemWrapper>
        {isImgModalOpen && fullPageImgList.length > 0 && (
          <FullPageImageModal onClose={closeImageModal} imgList={fullPageImgList} />
        )}
        <ColumnWrapper>
          {isImg(combinedList[0]) ? (
            <ImageField
              imgUrl={combinedList[0].imgUrl}
              dim={true}
              onClick={() => onClickImg(0)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[0].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(0)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[0].item.celebName}</CelebName>
                <BrandName>{combinedList[0].item.brandName}</BrandName>
                <ItemName>{combinedList[0].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
          {isImg(combinedList[1]) ? (
            <ImageField
              imgUrl={combinedList[1].imgUrl}
              dim={true}
              onClick={() => onClickImg(1)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[1].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(1)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[1].item.celebName}</CelebName>
                <BrandName>{combinedList[1].item.brandName}</BrandName>
                <ItemName>{combinedList[1].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
        </ColumnWrapper>
        <ColumnWrapper>
          {isImg(combinedList[2]) ? (
            <ImageField
              imgUrl={combinedList[2].imgUrl}
              dim={true}
              onClick={() => onClickImg(2)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[2].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(2)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[2].item.celebName}</CelebName>
                <BrandName>{combinedList[2].item.brandName}</BrandName>
                <ItemName>{combinedList[2].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
          {isImg(combinedList[3]) ? (
            <ImageField
              imgUrl={combinedList[3].imgUrl}
              dim={true}
              onClick={() => onClickImg(3)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[3].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(3)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[3].item.celebName}</CelebName>
                <BrandName>{combinedList[3].item.brandName}</BrandName>
                <ItemName>{combinedList[3].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
        </ColumnWrapper>
      </DisplayPhotoItemWrapper>
    )
  } else {
    return (
      <FivePhotoItemWrapper>
        {isImgModalOpen && (
          <FullPageImageModal onClose={closeImageModal} imgList={fullPageImgList} />
        )}
        <ColumnWrapper>
          {isImg(combinedList[0]) ? (
            <ImageField
              imgUrl={combinedList[0].imgUrl}
              className='first'
              dim={true}
              onClick={() => onClickImg(0)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[0].item.imgUrl}
              className='first'
              dim={true}
              onClick={() => onClickImg(0)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[0].item.celebName}</CelebName>
                <BrandName>{combinedList[0].item.brandName}</BrandName>
                <ItemName>{combinedList[0].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
          {isImg(combinedList[3]) ? (
            <ImageField
              imgUrl={combinedList[3].imgUrl}
              dim={true}
              onClick={() => onClickImg(3)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[3].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(3)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[3].item.celebName}</CelebName>
                <BrandName>{combinedList[3].item.brandName}</BrandName>
                <ItemName>{combinedList[3].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
        </ColumnWrapper>
        <ColumnWrapper>
          {isImg(combinedList[1]) ? (
            <ImageField
              imgUrl={combinedList[1].imgUrl}
              dim={true}
              onClick={() => onClickImg(1)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[1].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(1)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[1].item.celebName}</CelebName>
                <BrandName>{combinedList[1].item.brandName}</BrandName>
                <ItemName>{combinedList[1].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
          {isImg(combinedList[2]) ? (
            <ImageField
              imgUrl={combinedList[2].imgUrl}
              dim={true}
              onClick={() => onClickImg(2)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[2].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(2)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[2].item.celebName}</CelebName>
                <BrandName>{combinedList[2].item.brandName}</BrandName>
                <ItemName>{combinedList[2].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
          {isImg(combinedList[4]) ? (
            <ImageField
              imgUrl={combinedList[4].imgUrl}
              dim={true}
              onClick={() => onClickImg(4)}
            ></ImageField>
          ) : (
            <ImageField
              imgUrl={combinedList[4].item.imgUrl}
              dim={true}
              onClick={() => onClickImg(4)}
            >
              <ItemInfoWrapper>
                <CelebName>{combinedList[4].item.celebName}</CelebName>
                <BrandName>{combinedList[4].item.brandName}</BrandName>
                <ItemName>{combinedList[4].item.itemName}</ItemName>
              </ItemInfoWrapper>
            </ImageField>
          )}
        </ColumnWrapper>
      </FivePhotoItemWrapper>
    )
  }
}

const DisplayPhotoItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1875rem;
  width: 100%;
  min-height: 15.1875rem;
  border-radius: 0.5rem;
  overflow: hidden;

  .full {
    width: 100%;
  }
`

const FivePhotoItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1875rem;
  width: 100%;
  height: 22.875rem;
  border-radius: 0.5rem;
  overflow: hidden;
  .first {
    width: 100%;
    min-height: 15.125rem;
  }
`

export const ImageField = styled.div<{ imgUrl: string | null | undefined; dim?: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background-color: grey;
  background-image: ${(props) =>
      props.dim
        ? 'linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0.45%, rgba(0, 0, 0, 0) 76.51%),'
        : ''}
    url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  padding: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.1875rem;
`

export default DisplayPhotoItems
