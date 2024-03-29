import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { commentState } from '../../../pages/community/detail/CommunityDetail'
import { maxItemPhotoCountState } from '..'
import { IselectedItem, imgItemListState } from '../../../recoil/communityInfo'
import SearchResult, { itemNameSearchState } from '../SearchResult'
import {
  BottomWrapper,
  ComponentContainer,
  ComponentWrapper,
  Dimmer,
  GalleryButton,
  SelectItemOrPhotoContainer,
} from '../styles'
import { HeaderWrapper } from '../../../pages/item/addInfo/styles'
import Header from '../../Header/Header'
import SearchTextfield from '../../TextField/SearchTextfield/SearchTextfield'
import Tabs from '../../Tabs'
import RecentViewItem from '../RecentViewItem'
import RecentSearchItem from '../RecentSearchItem'
import HotSearchItem from '../HotSearchItem'
import { ReactComponent as Gallery } from '../../../assets/gallery_24.svg'
import ButtonLarge from '../../ButtonLarge/ButtonLarge'
import useRecentCelebQuery from '../../../apis/celeb/hooks/useRecentCelebQuery'
import { useLocation, useNavigate } from 'react-router-dom'
import ScrapItem from '../ScrapItem'
import UserUploadItem from '../UserUploadItem'

const CommentItemPhoto = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const [maxItemPhotoCount, setMaxItemPhotoCount] = useRecoilState(maxItemPhotoCountState)
  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)
  const [searchValue, setSearchValue] = useRecoilState<string>(itemNameSearchState)
  const [selectedTab, setSelectedTab] = useState('recent')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const imgInput = useRef<HTMLInputElement>(null)
  // api file upload용
  const [selectedFileList, setSelectedFileList] = useState<File[]>([])

  // API나오면 recent search로 수정
  const {
    getRecentCeleb: { data },
  } = useRecentCelebQuery()

  const tabList = [
    { id: 'recent', tabName: '최근 본 아이템' },
    { id: 'myUpload', tabName: '내 게시글' },
  ]

  const handleBlur = () => {
    setIsFocused(false)
  }

  const onComplete = () => {
    // 대표사진 설정
    if (imgItemList.length > 0) {
      setImageItemList((prevList) => {
        const updatedList = [...prevList]
        updatedList[0] = {
          ...updatedList[0],
          representFlag: true,
        }
        return updatedList
      })
      // 댓글 아이템 설정
      setCommentObject((prevInfo) => {
        const { itemList, imgList } = prevInfo
        const updatedItemList = itemList ? [...itemList] : []
        const updatedImgList = imgList ? [...imgList] : []

        imgItemList.forEach((item, index) => {
          if (
            item.itemId &&
            !updatedItemList.some((existingItem) => existingItem.itemId === item.itemId)
          ) {
            // 아이템 추가
            updatedItemList.push({
              itemId: item.itemId,
              sortOrder: index,
            })
          } else if (
            !item.itemId &&
            item.imgUrl &&
            !updatedImgList.some((existingItem) => existingItem.imgUrl === item.imgUrl)
          ) {
            // 사진 추가
            updatedImgList.push({
              imgUrl: item.imgUrl,
              sortOrder: index,
            })
          }
        })

        return {
          ...prevInfo,
          itemList: updatedItemList.length > 0 ? updatedItemList : null,
          imgList: updatedImgList.length > 0 ? updatedImgList : null,
        }
      })
    }
    if (location.state === 'edit') {
      navigate(-1)
    } else {
      navigate('/community/comment/upload')
    }
  }

  // imgItemList에 IselectedItem 형태로 추가해줘야함
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files
    if (fileArr) {
      setSelectedFileList((pre) => [...pre, ...Array.from(fileArr)])
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i]
        const reader = new FileReader()
        if (imgItemList.length + i + 1 <= maxItemPhotoCount) {
          reader.onloadend = () => {
            const fileSelected: IselectedItem = {
              imgFile: file,
              imgUrl: reader.result as string,
              description: null,
              vote: null,
              representFlag: !imgItemList && i === 0,
            }
            setImageItemList((prevList) => [...prevList, fileSelected])
          }
          reader.readAsDataURL(file)
        } else {
          alert(`아이템/사진은 ${maxItemPhotoCount}개까지 선택할 수 있어요. `)
          break
        }
      }
    }
  }

  useEffect(() => {
    setMaxItemPhotoCount(5)
  }, [])

  return (
    <SelectItemOrPhotoContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='아이템 선택'></Header>
      </HeaderWrapper>
      <ComponentContainer>
        <ComponentWrapper
          className='padding top'
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        >
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            placeholder='셀럽/아이템을 검색해주세요'
            onEnter={() => console.log('entered')}
          ></SearchTextfield>
        </ComponentWrapper>

        {searchValue !== '' ? (
          <SearchResult></SearchResult>
        ) : (
          <>
            {isFocused === false ? (
              <>
                <Tabs
                  tabList={tabList}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                ></Tabs>
                {selectedTab === 'recent' && <RecentViewItem></RecentViewItem>}
                {selectedTab === 'myUpload' && <UserUploadItem></UserUploadItem>}
              </>
            ) : (
              <>{data ? <RecentSearchItem></RecentSearchItem> : <HotSearchItem></HotSearchItem>}</>
            )}
          </>
        )}
      </ComponentContainer>
      <Dimmer></Dimmer>
      <BottomWrapper>
        <GalleryButton onClick={() => imgInput.current?.click()}>
          <input
            type='file'
            accept='image/*'
            ref={imgInput}
            style={{ display: 'none' }}
            onChange={onChangeImg}
            multiple
          />
          <Gallery></Gallery>
        </GalleryButton>
        <ButtonLarge
          text={`선택완료(${imgItemList?.length}/${maxItemPhotoCount}) `}
          active={imgItemList?.length > 0}
          color='BK'
          onClick={imgItemList?.length > 0 ? () => onComplete() : ''}
        ></ButtonLarge>
      </BottomWrapper>
    </SelectItemOrPhotoContainer>
  )
}

export default CommentItemPhoto
