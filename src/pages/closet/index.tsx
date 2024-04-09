import React from 'react'
import Header from '../../components/Header/Header'

import { ReactComponent as BellOnIcon } from '../../assets/bell_on_24.svg'
import { ReactComponent as SearchIcon } from '../../assets/closet_search_24.svg'

import * as S from './styles'
import { closetQueryConfig } from '../../apis/closet/hooks'
import { useQuery } from '@tanstack/react-query'
import DefaultCreateBox from './components/ClosetCreateBox/DefaultCreateBox'
import SubHeader from './components/SubHeader'
import { ClosetMainSubHeaderEditText } from './components/SubHeader/SubHeaderText'
import ClosetList from './components/ClosetList'
import { useNavigate } from 'react-router-dom'

const Closet = () => {
  const { data, status } = useQuery({ ...closetQueryConfig.getClosetList() })
  const navigate = useNavigate()
  if (status === 'error' || !data?.result?.closetList) {
    return <div>error</div>
  }

  return (
    <S.Root>
      <S.HeaderContainer>
        <Header isModalHeader={false} title={'옷장'} hasArrow>
          <SearchIcon onClick={() => navigate('/search')} />
        </Header>
        <SubHeader
          leftPaneChildren={
            <S.SubHeaderTitleWrapper>
              나의 옷장 {data?.result?.closetCount || 0}
            </S.SubHeaderTitleWrapper>
          }
          rightPaneChildren={<ClosetMainSubHeaderEditText />}
        />
      </S.HeaderContainer>
      <S.BodyContainer>
        <ClosetList data={data.result.closetList} />
        <DefaultCreateBox />
      </S.BodyContainer>
    </S.Root>
  )
}

export default Closet
