import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSwipeable } from 'react-swipeable'

import ColorChip from '../../components/Chip/ColorChip'
import {
  CategoryContentWrapper,
  CategoryTitle,
  CelebCategoryWrapper,
  CelebListWrapper,
  ContentWrapper,
  Dimmer,
  ListButtonWrapper,
  SearchWrapper,
  SelectCelebContainer,
  ShowMoreWrapper,
  SideBarWrapper,
  SidebarDot,
  SidebarRow,
  SmallSideBar,
  TitleSearchWrapper,
} from './styles'
import Header from '../../components/Header/Header'
import SearchTextfield from '../../components/TextField/SearchTextfield/SearchTextfield'
import { HeaderWrapper } from '../item/addInfo/styles'
import useSelectCelebQuery from '../../apis/celeb/hooks/useSelectCelebQuery'
import { ReactComponent as MoreDown } from '../../assets/more_down_20.svg'
import { ReactComponent as MoreUp } from '../../assets/more_up_20.svg'
import { ReactComponent as CelebrityListDefault } from '../../assets/celebrity_list_default_24.svg'
import { ReactComponent as CelebrityListActive } from '../../assets/celebrity_list_active_24.svg'

import { ReactComponent as Singer } from '../../assets/ico_singer_32.svg'
import { ReactComponent as Actor } from '../../assets/ico_actor_32.svg'
import { ReactComponent as BroadCaster } from '../../assets/ico_broadcaster_32.svg'
import { ReactComponent as Sports } from '../../assets/ico_sport_32.svg'
import { ReactComponent as Influencer } from '../../assets/ico_creator_32.svg'

import { BottomWrapper } from '../../components/SelectItemOrPhoto/styles'
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge'
import { atomKeys } from '../../config/atomKeys'
import { atom, useRecoilState } from 'recoil'
import { ISelectCelebResult } from '../../apis/celeb/CelebService'
import { Common } from '../../components/styles'
import Item from 'antd-mobile/es/components/dropdown/item'
import CelebCategoryTooltip from '../../components/ToolTip/CelebCategoryTooltip/CelebCategoryTooltip'

export const selectInterestCelebState = atom<Array<ISelectCelebResult>>({
  key: atomKeys.selectedInterestCeleb,
  default: [
    {
      categoryId: 1,
      categoryName: '가수',
      celebList: [],
    },
    {
      categoryId: 2,
      categoryName: '배우',
      celebList: [],
    },
    {
      categoryId: 4,
      categoryName: '스포츠인',
      celebList: [],
    },
    {
      categoryId: 5,
      categoryName: '방송인',
      celebList: [],
    },
    {
      categoryId: 6,
      categoryName: '인플루언서',
      celebList: [],
    },
  ],
})

const SelectCeleb = () => {
  const { getSelectCelebList } = useSelectCelebQuery()
  const { data } = getSelectCelebList
  console.log(data)

  const [searchValue, setSearchValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSearchField, setShowSearchField] = useState(false)
  const [openCategories, setOpenCategories] = useState<number[]>([])
  const [selectedInterestCeleb, setSelectedInterestCeleb] = useRecoilState(selectInterestCelebState)
  const [sidebarSize, setSidebarSize] = useState<string>('large')

  const colorList = ['pink', 'orange', 'yellow', 'green', 'blue']

  // 선택한 관심셀럽 확인 및 수정용 Category[{CelebId, CelebName}] List 필요
  const getSelectedCelebIds = (celebResults: Array<ISelectCelebResult>): Array<number> => {
    const celebIds: Array<number> = []
    for (const celebResult of celebResults) {
      for (const celeb of celebResult.celebList) {
        celebIds.push(celeb.celebId)
      }
    }

    return celebIds
  }
  // POST API 용 CelebId List 필요
  const celebIds = getSelectedCelebIds(selectedInterestCeleb)
  console.log('celebIds', celebIds)
  // 관심셀럽 선택
  const handleColorChipClick = (categoryId: number, celebId: number, isSelected: boolean) => {
    setSelectedInterestCeleb((prevInterestCelebs) => {
      const updatedInterestCelebs = prevInterestCelebs.map((category) => {
        if (category.categoryId === categoryId) {
          const updatedCelebList = isSelected
            ? category.celebList.filter((celeb) => celeb.celebId !== celebId)
            : [...category.celebList, { celebId, celebName: '' }] // You can provide the appropriate celebName here if available.

          return {
            ...category,
            celebList: updatedCelebList,
          }
        }
        return category
      })

      return updatedInterestCelebs
    })
  }

  const onFocus = () => {
    setIsFocused(true)
    setSidebarSize('small')
  }

  const handleBlur = () => {
    setIsFocused(false)
    setSidebarSize('large')
  }

  const onScroll = () => {
    setSidebarSize('medium')
    setIsFocused(false)
  }

  const handlers = useSwipeable({
    onSwiped: (eventData: any) => {
      const swipeDirection = eventData.dir
      if (swipeDirection === 'Left') {
        setSidebarSize('large')
      } else if (swipeDirection === 'Right') {
        setSidebarSize('medium')
      }
    },
  })

  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const sidebarItems = [
    {
      icon: <Singer style={{ flexShrink: 0 }} />,
      name: '가수',
    },
    {
      icon: <Actor style={{ flexShrink: 0 }} />,
      name: '배우',
    },
    {
      icon: <BroadCaster style={{ flexShrink: 0 }} />,
      name: '스포츠인',
    },
    {
      icon: <Sports style={{ flexShrink: 0 }} />,
      name: '방송인',
    },
    {
      icon: <Influencer style={{ flexShrink: 0 }} />,
      name: '인플루언서',
    },
  ]

  // Step 1: Create refs for each CelebCategoryWrapper and store the currently visible category ref
  const celebCategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}) // Add the type declaration here

  // Step 2: Attach the ref of each CelebCategoryWrapper to the corresponding SidebarRow element
  const setCategoryRef = useCallback((categoryName: string, ref: HTMLDivElement | null) => {
    celebCategoryRefs.current[categoryName] = ref
  }, [])

  // Step 3: Handle the click event on the SidebarRow elements to scroll to the selected category
  const handleSidebarRowClick = (categoryName: string) => {
    const categoryRef = celebCategoryRefs.current[categoryName]
    setCurrentViewedItem(categoryName)
    if (categoryRef) {
      // Scroll to the selected category with 'start' block
      categoryRef.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Manually adjust the scroll position to bring the category to the top of the view
      if (contentWrapperRef.current) {
        const contentWrapperRect = contentWrapperRef.current.getBoundingClientRect()
        const categoryRect = categoryRef.getBoundingClientRect()

        // Calculate the target scroll position
        const targetScrollPosition =
          contentWrapperRef.current.scrollTop + (categoryRect.top - contentWrapperRect.top)

        // Scroll to the target position immediately (without smooth behavior)
        contentWrapperRef.current.scrollTo({ top: targetScrollPosition, behavior: 'smooth' })
      }
    }
  }
  const [currentViewedItem, setCurrentViewedItem] = useState<string | null>(null)

  const contentWrapperRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSidebarSize('medium')
    setIsFocused(false)
    const categoryRef = celebCategoryRefs.current[categoryName]
    // Get the scroll position of the content
    const contentScrollPosition = contentWrapperRef.current?.scrollTop || 0
    const targetScrollPosition =
      contentWrapperRef.current?.scrollTop + (categoryRect.top - contentWrapperRect.top)
    // Find the CelebCategoryWrapper whose position is closest to the middle of the content
    let closestItem = null
    let closestDistance = Number.MAX_SAFE_INTEGER

    data?.forEach((Category) => {
      const categoryRef = celebCategoryRefs.current[Category.categoryName]
      if (categoryRef) {
        const rect = categoryRef.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.bottom / 2 - contentScrollPosition)
        if (distance < closestDistance) {
          closestItem = Category.categoryName
          closestDistance = distance
        }
      }
    })

    setCurrentViewedItem(closestItem)
  }

  useEffect(() => {
    setShowTooltip(true) // Show the tooltip

    setTimeout(() => {
      setShowTooltip(false)
    }, 2500)
  }, [currentViewedItem])

  return (
    <SelectCelebContainer>
      {!isFocused ? (
        <HeaderWrapper>
          <Header isModalHeader={false} hasArrow={true}></Header>
        </HeaderWrapper>
      ) : (
        <HeaderWrapper>
          <Header isModalHeader={false} hasArrow={true}></Header>
        </HeaderWrapper>
      )}
      <ContentWrapper onScroll={handleScroll} ref={contentWrapperRef}>
        <TitleSearchWrapper>
          <span>
            관심 있는 셀럽 태그를 <br />
            선택해 주세요
          </span>
          <SearchWrapper onFocus={onFocus} onBlur={handleBlur}>
            <SearchTextfield
              value={searchValue}
              setValue={setSearchValue}
              placeholder='셀럽을 검색해 주세요'
            ></SearchTextfield>
          </SearchWrapper>
        </TitleSearchWrapper>

        {sidebarSize !== 'small' ? (
          <SideBarWrapper size={sidebarSize} {...handlers}>
            {sidebarItems.map((item, index) => (
              <SidebarRow key={item.name} onClick={() => handleSidebarRowClick(item.name)}>
                {item.icon}

                {sidebarSize === 'large' && <span>{item.name}</span>}
                {sidebarSize === 'medium' && currentViewedItem === item.name && showTooltip && (
                  <div className='tooltip'>
                    <CelebCategoryTooltip>{item.name}</CelebCategoryTooltip>
                  </div>
                )}
              </SidebarRow>
            ))}
          </SideBarWrapper>
        ) : (
          <SmallSideBar>
            <SidebarDot color={Common.colors.PK}></SidebarDot>
            <SidebarDot color={Common.colors.ORG}></SidebarDot>
            <SidebarDot color='#D89B00'></SidebarDot>
            <SidebarDot color={Common.colors.GRN}></SidebarDot>
            <SidebarDot color={Common.colors.BL}></SidebarDot>
          </SmallSideBar>
        )}
        {data?.map((Category, index) => {
          const isCategoryOpen = openCategories.includes(Category.categoryId)
          return (
            <CelebCategoryWrapper
              key={Category.categoryId}
              id={Category.categoryName}
              ref={(ref) => setCategoryRef(Category.categoryName, ref)}
            >
              <CategoryContentWrapper>
                <CategoryTitle>{Category.categoryName}</CategoryTitle>

                <CelebListWrapper open={isCategoryOpen}>
                  {Category.celebList.map((celeb) => {
                    const isSelected = celebIds.includes(celeb.celebId)
                    return (
                      <ColorChip
                        key={celeb.celebId}
                        color={colorList[index]}
                        active={isSelected}
                        onClick={() =>
                          handleColorChipClick(Category.categoryId, celeb.celebId, isSelected)
                        }
                      >
                        {celeb.celebName}
                      </ColorChip>
                    )
                  })}
                </CelebListWrapper>
              </CategoryContentWrapper>
              <ShowMoreWrapper
                onClick={() =>
                  setOpenCategories((prev) =>
                    isCategoryOpen
                      ? prev.filter((id) => id !== Category.categoryId)
                      : [...prev, Category.categoryId],
                  )
                }
              >
                {isCategoryOpen ? <MoreUp></MoreUp> : <MoreDown></MoreDown>}
              </ShowMoreWrapper>
            </CelebCategoryWrapper>
          )
        })}
      </ContentWrapper>
      <Dimmer></Dimmer>
      <BottomWrapper>
        <ListButtonWrapper>
          {celebIds.length > 0 ? (
            <CelebrityListActive></CelebrityListActive>
          ) : (
            <CelebrityListDefault></CelebrityListDefault>
          )}
        </ListButtonWrapper>
        <ButtonLarge
          text={`${celebIds.length}명 선택`}
          active={celebIds.length > 0}
          color='BK'
          onClick={() => console.log('complete')}
        ></ButtonLarge>
      </BottomWrapper>
    </SelectCelebContainer>
  )
}

export default SelectCeleb
