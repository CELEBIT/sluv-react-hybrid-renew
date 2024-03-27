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

import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as Singer } from '../../assets/ico_singer_32.svg'
import { ReactComponent as Actor } from '../../assets/ico_actor_32.svg'
import { ReactComponent as BroadCaster } from '../../assets/ico_broadcaster_32.svg'
import { ReactComponent as Sports } from '../../assets/ico_sport_32.svg'
import { ReactComponent as Influencer } from '../../assets/ico_creator_32.svg'

import { BottomWrapper } from '../../components/SelectItemOrPhoto/styles'
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge'
import { atomKeys } from '../../config/atomKeys'
import { atom, useRecoilState } from 'recoil'
import { ISelectCeleb, ISelectCelebResult } from '../../apis/celeb/CelebService'
import { Common } from '../../components/styles'
import CelebCategoryTooltip from '../../components/ToolTip/CelebCategoryTooltip/CelebCategoryTooltip'
import useModals from '../../components/Modals/hooks/useModals'
import { modals } from '../../components/Modals'
import CelebSearchResult from './CelebSearchResult/CelebSearchResult'
import useInterestCelebQuery from '../../apis/user/hooks/useInterestCelebQuery'
import { colorList } from '../../config/constant'
import { useLocation } from 'react-router-dom'

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
      categoryId: 5,
      categoryName: '방송인',
      celebList: [],
    },
    {
      categoryId: 4,
      categoryName: '스포츠인',
      celebList: [],
    },
    {
      categoryId: 6,
      categoryName: '인플루언서',
      celebList: [],
    },
  ],
})

const SelectInterestCeleb = ({
  onNext,
  backBtnClick,
}: {
  onNext?: () => void
  backBtnClick?: () => void
}) => {
  const { pathname } = useLocation()

  const {
    postInterestCeleb: { mutate: mutateByPostInterestCeleb },
  } = useInterestCelebQuery()

  // 관심셀럽 카테고리별 조회
  const {
    getSelectCelebList: { data },
  } = useSelectCelebQuery()
  // 현재 유저가 선택한 관심셀럽 리스트
  const {
    getInterestCeleb: { data: interestCelebList },
  } = useInterestCelebQuery()

  const { openModal } = useModals()
  const [searchValue, setSearchValue] = useState<string>('')
  const [openCategories, setOpenCategories] = useState<number[]>([])
  // 선택한 관심셀럽 확인 및 수정용 Category[{CelebId, CelebName}] List
  const [selectedInterestCeleb, setSelectedInterestCeleb] = useRecoilState(selectInterestCelebState)
  const [sidebarSize, setSidebarSize] = useState<string>('large')
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
      name: '방송인',
    },
    {
      icon: <Sports style={{ flexShrink: 0 }} />,
      name: '스포츠인',
    },
    {
      icon: <Influencer style={{ flexShrink: 0 }} />,
      name: '인플루언서',
    },
  ]

  const onComplete = () => {
    const updatedIdList = getSelectedCelebIds(selectedInterestCeleb)
    mutateByPostInterestCeleb(updatedIdList)
    console.log('관심셀럽 등록', updatedIdList)

    if (onNext !== undefined) {
      if (pathname == '/') {
        console.log('true')
        onNext()
      }
    }
  }
  // POST API 용 CelebId List
  const getSelectedCelebIds = (selectedCelebList: Array<ISelectCelebResult>): Array<number> => {
    const idList = []
    for (const category of selectedCelebList) {
      for (const celeb of category.celebList) {
        idList.push(celeb.celebId)
      }
    }

    return idList
  }

  // 관심셀럽 선택
  const handleColorChipClick = (
    categoryId: number,
    celebId: number,
    celebName: string,
    isSelected: boolean,
  ) => {
    setSelectedInterestCeleb((prevInterestCelebs) => {
      const updatedInterestCelebs = prevInterestCelebs.map((category) => {
        if (category.categoryId === categoryId) {
          const updatedCelebList = isSelected
            ? category.celebList.filter((celeb) => celeb.celebId !== celebId)
            : [...category.celebList, { celebId, celebName }]

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
    setSidebarSize('small')
  }

  const handleBlur = () => {
    setSidebarSize('large')
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

  const celebRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const [tooltipContent, setTooltipContent] = useState('')
  const handleSidebarRowClick = (categoryName: string) => {
    const categoryRef = celebRefs.current[categoryName]
    if (categoryRef) {
      categoryRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      // setIsFocused(false)
      setTooltipContent(categoryName)
      setTimeout(() => setTooltipContent(''), 3000)
    }
  }

  const tooltipTimeoutRef = useRef<number | null>(null)
  const handleScroll = () => {
    setSidebarSize('medium')
    // setIsFocused(false)
    setShowSearch(false)
    let visibleCategory = ''
    for (const [categoryName, ref] of Object.entries(celebRefs.current)) {
      const rect = ref?.getBoundingClientRect()
      if (rect && rect.top >= 0 && rect.bottom <= window.innerHeight) {
        visibleCategory = categoryName
        break
      }
    }
    setTooltipContent(visibleCategory)
    if (tooltipTimeoutRef.current !== null) {
      clearTimeout(tooltipTimeoutRef.current)
    }
    tooltipTimeoutRef.current = window.setTimeout(() => {
      setTooltipContent('')
      tooltipTimeoutRef.current = null
    }, 3000)
  }

  const onClickSelectedCelebList = () => {
    openModal(modals.SelectedInterestCelebModal)
  }

  const [isTitleSearchWrapperVisible, setIsTitleSearchWrapperVisible] = useState(true)
  const titleSearchWrapperRef = useRef(null)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsTitleSearchWrapperVisible(entry.isIntersecting)
        })
      },
      {
        root: null, // Viewport
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold value based on your needs
      },
    )

    if (titleSearchWrapperRef.current) {
      observer.observe(titleSearchWrapperRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  // 유저의 기존 관심셀럽 리스트 가져와서 카테고리별로 분류
  useEffect(() => {
    if (pathname === '/settings/select-celeb') {
      setSelectedInterestCeleb((prevInterestCelebs) => {
        const updatedInterestCelebs = prevInterestCelebs.map((category) => {
          if (interestCelebList) {
            const updatedCelebList = interestCelebList
              .filter((celeb) => category.categoryName === celeb.celebCategory)
              .map((celeb) => ({
                celebId: celeb.id,
                celebName: celeb.celebNameKr,
              }))

            return {
              ...category,
              celebList: updatedCelebList,
            }
          } else {
            return category
          }
        })
        return updatedInterestCelebs
      })
    }
  }, [pathname, interestCelebList])

  return (
    <SelectCelebContainer>
      {isTitleSearchWrapperVisible ? (
        <HeaderWrapper>
          <Header
            isModalHeader={false}
            hasArrow={true}
            backBtnClick={backBtnClick ? backBtnClick : undefined}
          ></Header>
        </HeaderWrapper>
      ) : (
        <HeaderWrapper>
          {!showSearch ? (
            <Header
              isModalHeader={false}
              hasArrow={true}
              backBtnClick={backBtnClick ? backBtnClick : undefined}
              title='관심 있는 셀럽 태그를 선택해 주세요'
            >
              <Search
                fill={Common.colors.GR600}
                style={{ flexGrow: 0 }}
                onClick={() => setShowSearch(true)}
              ></Search>
            </Header>
          ) : (
            <SearchWrapper
              onFocus={onFocus}
              onBlur={handleBlur}
              ref={titleSearchWrapperRef}
              style={{ marginTop: '0.625rem' }}
            >
              <SearchTextfield
                value={searchValue}
                setValue={setSearchValue}
                placeholder='셀럽을 검색해 주세요'
              ></SearchTextfield>
            </SearchWrapper>
          )}
        </HeaderWrapper>
      )}
      <ContentWrapper onScroll={handleScroll}>
        <TitleSearchWrapper>
          <span>
            관심 있는 셀럽 태그를 <br />
            선택해 주세요
          </span>
          <SearchWrapper onFocus={onFocus} onBlur={handleBlur} ref={titleSearchWrapperRef}>
            <SearchTextfield
              value={searchValue}
              setValue={setSearchValue}
              placeholder='셀럽을 검색해 주세요'
            ></SearchTextfield>
          </SearchWrapper>
        </TitleSearchWrapper>

        {sidebarSize !== 'small' ? (
          <SideBarWrapper size={sidebarSize} {...handlers}>
            {sidebarItems.map((item) => (
              <SidebarRow key={item.name} onClick={() => handleSidebarRowClick(item.name)}>
                {item.icon}

                {sidebarSize === 'large' && <span>{item.name}</span>}
                {sidebarSize === 'medium' && item.name === tooltipContent && (
                  <div className='tooltip'>
                    <CelebCategoryTooltip>{tooltipContent}</CelebCategoryTooltip>
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
        {searchValue ? (
          <CelebSearchResult celebName={searchValue}></CelebSearchResult>
        ) : (
          <>
            {data?.map((Category, index) => {
              const isCategoryOpen = openCategories.includes(Category.categoryId)
              return (
                <CelebCategoryWrapper
                  key={Category.categoryId}
                  id={Category.categoryName}
                  ref={(ref) => (celebRefs.current[Category.categoryName] = ref)}
                >
                  <CategoryContentWrapper>
                    <CategoryTitle>{Category.categoryName}</CategoryTitle>

                    <CelebListWrapper open={isCategoryOpen}>
                      {Category.celebList.map((celeb) => {
                        const isSelected = selectedInterestCeleb.some((category) =>
                          category.celebList.some(
                            (selectedCeleb) => selectedCeleb.celebId === celeb.celebId,
                          ),
                        )
                        return (
                          <ColorChip
                            key={celeb.celebId}
                            color={colorList[index]}
                            active={isSelected}
                            onClick={() =>
                              handleColorChipClick(
                                Category.categoryId,
                                celeb.celebId,
                                celeb.celebName,
                                isSelected,
                              )
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
          </>
        )}
      </ContentWrapper>
      <Dimmer></Dimmer>
      <BottomWrapper>
        <ListButtonWrapper>
          {selectedInterestCeleb.reduce((total, category) => total + category.celebList.length, 0) >
          0 ? (
            <CelebrityListActive onClick={() => onClickSelectedCelebList()}></CelebrityListActive>
          ) : (
            <CelebrityListDefault></CelebrityListDefault>
          )}
        </ListButtonWrapper>
        <ButtonLarge
          text={`${selectedInterestCeleb.reduce(
            (total, category) => total + category.celebList.length,
            0,
          )}명 선택`}
          active={
            selectedInterestCeleb.reduce(
              (total, category) => total + category.celebList.length,
              0,
            ) > 0
          }
          color='BK'
          onClick={onComplete}
        ></ButtonLarge>
      </BottomWrapper>
    </SelectCelebContainer>
  )
}

export default SelectInterestCeleb
