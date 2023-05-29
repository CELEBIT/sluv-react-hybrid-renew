import React, { useRef, useState } from 'react'
import Header from '../../../components/Header/Header'
import { HeaderWrap, ListWrap, SelectedCtnDiv, TStoragePageStyle } from './styles'
import useTempItemQuery from '../../../apis/item/hooks/useTempItemQuery'
import { useObserver } from '../../../hooks/useObserver'
import TempItem from './components/TempItem'

const TemporaryStorage = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const bottom = useRef(null)

  const { getTempItem } = useTempItemQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } = getTempItem()

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && fetchNextPage()
  }
  useObserver({
    target: bottom,
    onIntersect,
  })

  return (
    <TStoragePageStyle>
      <HeaderWrap>
        <Header isModalHeader={false} title={'임시 보관함'} hasArrow={true}>
          {isEditMode ? (
            <span className='complete-btn'>완료</span>
          ) : (
            <span className='edit-btn' onClick={() => setIsEditMode(true)}>
              편집
            </span>
          )}
        </Header>
        {isEditMode ? (
          <SelectedCtnDiv>
            총<span> 0</span>개 선택됨
          </SelectedCtnDiv>
        ) : (
          <SelectedCtnDiv>
            총<span> {data?.pages[0].content.length ?? 0}</span>개 보관 중
          </SelectedCtnDiv>
        )}
      </HeaderWrap>
      <ListWrap>
        {status === 'error' && <p>{JSON.stringify(error.response.data)}</p>}
        {status === 'success' &&
          data?.pages.map(
            (item, index) =>
              item.content.length > 0 &&
              item.content.map((temp, idx) => {
                return (
                  <TempItem key={temp.id} data={temp} isFirst={idx === 0} isEditMode={isEditMode} />
                )
              }),
          )}
        <div ref={bottom} />
        {isFetching && !isFetchingNextPage ? (
          <div className='spinner'>
            <div>Loading</div>
          </div>
        ) : null}
      </ListWrap>
    </TStoragePageStyle>
  )
}

export default TemporaryStorage
