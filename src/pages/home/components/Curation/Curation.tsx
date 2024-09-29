import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import ItemCard from './components/ItemCard'
import styled from '@emotion/styled'
import { ReactComponent as HeartArrow } from '../../../../assets/heart_arrow.svg'
import { useNavigate } from 'react-router-dom'
import useCurationItemQuery from '../../../../apis/item/hooks/useCurationItemQuery'

const Curation = () => {
  const getCelebNameWithoutSpace = (celebName: string) => {
    const spaceIndex = celebName.indexOf(' ')
    return spaceIndex !== -1 ? celebName.substring(spaceIndex + 1) : celebName
  }
  const { getCurationItem } = useCurationItemQuery()
  const { data } = getCurationItem()
  return (
    <ScrollComponentWrapper>
      <HomeTitle className='title'>한눈에 보는 취향 큐레이션</HomeTitle>
      {data && (
        <ItemListWrapper>
          <ItemListCol>
            <ItemCard
              imgUrl={data[0].imgUrl}
              celebName={getCelebNameWithoutSpace(data[0].celebName)}
              itemId={data[0].itemId}
            ></ItemCard>
            <ItemCard
              imgUrl={data[1].imgUrl}
              celebName={getCelebNameWithoutSpace(getCelebNameWithoutSpace(data[1].celebName))}
              itemId={data[1].itemId}
            ></ItemCard>
          </ItemListCol>
          <ItemListCol>
            <ItemCard
              imgUrl={data[2].imgUrl}
              celebName={getCelebNameWithoutSpace(data[2].celebName)}
              itemId={data[2].itemId}
            ></ItemCard>
            <HeartCard>
              <HeartArrow></HeartArrow>
            </HeartCard>
          </ItemListCol>
          <ItemListCol>
            <ItemCard></ItemCard>
            <ItemCard
              imgUrl={data[3].imgUrl}
              celebName={getCelebNameWithoutSpace(data[3].celebName)}
              itemId={data[3].itemId}
            ></ItemCard>
          </ItemListCol>
          <ItemListCol>
            <ItemCard
              imgUrl={data[4].imgUrl}
              celebName={getCelebNameWithoutSpace(data[4].celebName)}
              itemId={data[4].itemId}
            ></ItemCard>
            <ItemCard
              imgUrl={data[5].imgUrl}
              celebName={getCelebNameWithoutSpace(data[5].celebName)}
              itemId={data[5].itemId}
            ></ItemCard>
          </ItemListCol>
          <ItemListCol>
            <HeartCard>
              <HeartArrow></HeartArrow>
            </HeartCard>
            <ItemCard
              imgUrl={data[6].imgUrl}
              celebName={getCelebNameWithoutSpace(data[6].celebName)}
              itemId={data[6].itemId}
            ></ItemCard>
          </ItemListCol>
          <ItemListCol>
            <ItemCard
              imgUrl={data[7].imgUrl}
              celebName={getCelebNameWithoutSpace(data[7].celebName)}
              itemId={data[7].itemId}
            ></ItemCard>
            <ItemCard
              imgUrl={data[8].imgUrl}
              celebName={getCelebNameWithoutSpace(data[8].celebName)}
              itemId={data[8].itemId}
            ></ItemCard>
          </ItemListCol>
          <ItemListCol>
            <ItemCard
              imgUrl={data[9].imgUrl}
              celebName={getCelebNameWithoutSpace(data[9].celebName)}
              itemId={data[9].itemId}
            ></ItemCard>
            <ItemCard></ItemCard>
          </ItemListCol>
        </ItemListWrapper>
      )}
    </ScrollComponentWrapper>
  )
}

export default Curation

export const ItemListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding: 0 1.25rem;
  gap: 0.5625rem;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ItemListCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5625rem;
`
export const HeartCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  width: 6.25rem;
  height: 6.25rem;
  background: linear-gradient(180deg, rgba(255, 242, 242, 0) 35.42%, #fff2f2 100%);
`
