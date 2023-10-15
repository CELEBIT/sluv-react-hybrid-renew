import React from 'react'
import Header from '../../components/Header/Header'

import { ReactComponent as BellOnIcon } from '../../assets/bell_on_24.svg'
import { ReactComponent as SearchIcon } from '../../assets/closet_search_24.svg'

import * as S from './styles'
import ClosetCoverBox from './components/ClosetCoverBox'
import { closetQueryConfig } from '../../apis/closet/hooks'
import { useQuery } from '@tanstack/react-query'
import DefaultCreateBox from './components/ClosetCreateBox/DefaultCreateBox'
import SubHeader from '../../components/SubHeader'
import { ClosetBoxModel, ClosetStatus } from '../../apis/closet/model'

const Closet = () => {
  const { data, status } = useQuery({ ...closetQueryConfig.getClosetList() })

  if (status === 'error' || !data?.result?.closetList) {
    return <div>error</div>
  }

  return (
    <S.Root>
      <S.HeaderContainer>
        <Header isModalHeader={false} title={'옷장'} hasArrow>
          <SearchIcon />
          <BellOnIcon />
        </Header>
        <SubHeader
          leftPaneChildren={
            <S.SubHeaderTitleWrapper>
              나의 옷장 {data?.result?.closetCount || 0}
            </S.SubHeaderTitleWrapper>
          }
          rightPaneChildren={<S.SubHeaderEditText>편집</S.SubHeaderEditText>}
        />
      </S.HeaderContainer>
      <S.BodyContainer>
        <ClosetList data={data?.result?.closetList} />
        <DefaultCreateBox />
      </S.BodyContainer>
    </S.Root>
  )
}

type ClosetListContainerProps = {
  status?: ClosetStatus
  data: ClosetBoxModel[]
  statusUpdater?(viewStatus: ClosetStatus): void
}

export const ClosetList = ({ status = 'PUBLIC', data }: ClosetListContainerProps) => {
  const filteredClosetBoxList =
    status === 'PRIVATE' ? data.filter((closet) => closet.closetStatus === 'PRIVATE') : data

  return (
    <>
      {filteredClosetBoxList.map((closet) => {
        return <ClosetCoverBox service={closet} key={closet.id} />
      })}
    </>
  )
}

export default Closet
