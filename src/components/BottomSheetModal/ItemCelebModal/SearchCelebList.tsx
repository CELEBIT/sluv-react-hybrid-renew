import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { Common, Pretendard } from '../../styles'
import HighlightedText from '../../HighlightedText/HighlightedText'
import { useDebounce } from 'use-debounce'
import useCelebSearchQuery from '../../../apis/celeb/hooks/useCelebSearchQuery'
import { useObserver } from '../../../hooks/useObserver'
import { ISearchCeleb } from '../../../apis/celeb/CelebService'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'
import { celebInfoInItemState, itemInfoState } from '../../../recoil/itemInfo'
import useRecentCelebQuery from '../../../apis/celeb/hooks/useRecentCelebQuery'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'

interface SearchCelebListProps {
  keyword: string
}

const SearchCelebList = ({ keyword }: SearchCelebListProps) => {
  const { closeModal } = useModals()
  const [debouncedKeyword] = useDebounce(keyword, 300)
  const { searchCeleb } = useCelebSearchQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } =
    searchCeleb(debouncedKeyword)

  const {
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  } = useRecentCelebQuery()

  const {
    postNewCeleb: { mutate: mutatByPostNewCeleb },
  } = useCelebSearchQuery()

  const bottom = useRef(null)
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && fetchNextPage()
  }
  useObserver({
    target: bottom,
    onIntersect,
  })
  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)
  const setCelebInfoInItem = useSetRecoilState(celebInfoInItemState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const onClickExistingCeleb = (celeb: ISearchCeleb) => {
    mutateByPostRecentCeleb(
      { celebId: celeb.id, newCelebId: null },
      {
        onSuccess: () => {
          closeModal(modals.ItemCelebSearchModal, () => {
            setSelectedCeleb({
              id: celeb.id,
              celebNameKr: celeb.celebChildNameKr,
            })
            setSelectedGroup({ id: 0, celebNameKr: '' })
            setCelebInfoInItem({
              soloId: celeb.id,
              soloName: celeb.celebChildNameKr,
              groupId: celeb.parentId,
              groupName: celeb.celebParentNameKr,
            })
            setItemInfo({
              ...itemInfo,
              celeb: {
                celebId: celeb.id,
                celebName: celeb.celebChildNameKr,
              },
            })
          })
        },
      },
    )
  }
  const onClickNewCeleb = (newCelebName: string) => {
    mutatByPostNewCeleb(
      { newCelebName: newCelebName },
      {
        onSuccess: () => {
          closeModal(modals.ItemCelebSearchModal)
        },
      },
    )
  }

  return (
    <SearchResult>
      {status === 'error' && <p>{JSON.stringify(error.response.data)}</p>}
      {status === 'success' &&
        data?.pages.map((item, index) =>
          item.content.length > 0 ? (
            item.content.map((celeb, idx) => {
              return (
                <ExistingCeleb key={idx} onClick={() => onClickExistingCeleb(celeb)}>
                  <HighlightedText searchText={debouncedKeyword} text={celeb.celebTotalNameKr} />
                  <SubText>
                    <span>{celeb.category} / &nbsp; </span>
                    <HighlightedText searchText={debouncedKeyword} text={celeb.celebTotalNameEn} />
                  </SubText>
                </ExistingCeleb>
              )
            })
          ) : (
            <NotExistingCeleb key={index} onClick={() => onClickNewCeleb(debouncedKeyword)}>
              <HighlightedText searchText={debouncedKeyword} text={debouncedKeyword} />
            </NotExistingCeleb>
          ),
        )}
      <div ref={bottom} />
      {isFetching && !isFetchingNextPage ? (
        <div className='spinner'>
          <div>Loading</div>
        </div>
      ) : null}
    </SearchResult>
  )
}

export default SearchCelebList

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
`

const ExistingCeleb = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.75rem 0.875rem 0.75rem;
  gap: 0.25rem;
  ${Pretendard({
    size: 18,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })}
`

const NotExistingCeleb = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.75rem 1.25rem 0.75rem;
  ${Pretendard({
    size: 18,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })}
`

const SubText = styled.div`
  display: flex;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR500,
  })}
`
