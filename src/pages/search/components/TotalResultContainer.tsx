import React from 'react'
import useTotalSearchQuery from '../../../apis/search/hooks/useTotalSearchQuery'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'
import Item from '../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'

interface TotalResultContainerProps {
  keyword: string
}

const TotalResultContainer = ({ keyword }: TotalResultContainerProps) => {
  const navigate = useNavigate()
  const { searchTotal } = useTotalSearchQuery()
  const { data } = searchTotal(keyword)
  console.log(data)

  return (
    <>
      {(data?.itemList.length ?? 0) > 0 && (
        <>
          <TitleBar>
            <span>아이템</span>
          </TitleBar>
          <GridListWrap>
            {data?.itemList.map((item) => (
              <Item
                key={item.itemId}
                itemId={item.itemId}
                itemName={item.itemName}
                imgUrl={item.imgUrl}
                brandName={item.brandName}
                celebName={item.celebName}
                borderRadius={8}
                onClick={() => navigate(`/item/detail/${item.itemId}`)}
              />
            ))}
          </GridListWrap>
          <Divider />
        </>
      )}
      {(data?.itemList.length ?? 0) > 0 && (
        <>
          <TitleBar>
            <span>커뮤니티</span>
          </TitleBar>
          <Divider />
        </>
      )}
      {(data?.userList.length ?? 0) > 0 && (
        <>
          <TitleBar>
            <span>사용자</span>
          </TitleBar>
          <Divider />
        </>
      )}
    </>
  )
}

export default TotalResultContainer

const TitleBar = styled.div`
  display: flex;
  padding: 0.5rem 0;
  margin-bottom: 1rem;

  span {
    ${Pretendard({
      size: 18,
      weight: Common.bold.semiBold,
      color: Common.colors.BK,
    })};
  }
`

const GridListWrap = styled.div`
  display: grid;
  justify-items: center;
  flex-grow: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(0, auto);
  row-gap: 1.5rem;
  column-gap: 0.625rem;

  > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${Common.colors.GR100};
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
`
