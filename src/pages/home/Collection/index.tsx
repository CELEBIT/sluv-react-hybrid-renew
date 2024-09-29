import Flex from '../../../components/Flex'
import Header from '../../../components/Header/Header'
import { HeaderWrapper } from '../../user/styles'
import { Common, Pretendard } from '../../../components/styles'
import styled from '@emotion/styled'
import ItemListGrid from '../../../components/ItemListGrid/ItemListGrid'
import useCurationItemQuery from '../../../apis/item/hooks/useCurationItemQuery'
import { GridListWrap } from '../../search/components/TotalResult'
import Item from '../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'

const Collection = () => {
  const navigate = useNavigate()
  const { getTrendItem } = useCurationItemQuery()
  const { data } = getTrendItem()

  return (
    <Flex direction='column' style={{ height: '100vh' }}>
      <HeaderWrapper style={{ backgroundColor: 'white' }}>
        <Header isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <Flex direction='column' style={{ overflowY: 'scroll', paddingBottom: '1.25rem' }}>
        <Flex
          direction='column'
          style={{ width: '100%', height: '100%', padding: '0.75rem 1.25rem' }}
        >
          <Title>
            요즘 핫한 셀럽,
            <br />
            에스파 & 변우석 스타일
          </Title>
          <SubTitle>스럽에서 핫한 관심을 받고 있는 셀럽 패션 컬렉션</SubTitle>
        </Flex>
        <GridListWrap>
          {data?.map((item) => (
            <Item
              key={item.itemId}
              itemId={item.itemId}
              itemName={item.itemName}
              imgUrl={item.imgUrl}
              brandName={item.brandName}
              celebName={item.celebName}
              size={162}
              borderRadius={8}
              scrapStatus={item.scrapStatus}
              onClick={() => navigate(`/item/detail/${item.itemId}`)}
            />
          ))}
        </GridListWrap>
      </Flex>
      {/* <ItemListGrid data={data} canChangeView={false}></ItemListGrid> */}
    </Flex>
  )
}

export default Collection

const Title = styled.span`
  ${Pretendard({ size: 24, weight: Common.bold.semiBold, color: Common.colors.BK })}
  margin-bottom: 0.625rem;
`
const SubTitle = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.thin, color: Common.colors.GR600 })}
`
