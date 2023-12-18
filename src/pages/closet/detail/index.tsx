import React, { useRef } from 'react'
import * as S from './styles'
import Header from '../../../components/Header/Header'
import { useInfiniteQuery } from '@tanstack/react-query'
import { closetQueryConfig } from '../../../apis/closet/hooks'
import { getCloset, PageParams } from '../../../apis/closet'
import { useObserver } from '../../../hooks/useObserver'
import { queryToObject } from '../../../utils/utility'
import { ReactComponent as SaveIcon } from '../../../assets/save_36.svg'
import ColorChip from '../../../components/Chip/ColorChip'
import NameTagChip from '../components/NameTag/NameTagChip'

const DEFAULT_PAGE_PARAMS: PageParams = {
  page: 1,
  size: 12,
}

const ClosetDetailPage = () => {
  const { id } = queryToObject(window.location.search.split('?')[1])
  const observerRef = useRef(null)

  if (!id) return <div>Error Occurred</div>

  const { data, status, fetchNextPage, fetchPreviousPage, hasNextPage } = useInfiniteQuery({
    ...closetQueryConfig.getCloset(id),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNext) {
        return lastPage.page + 1
      }
      return undefined
    },
  })

  useObserver({
    target: observerRef,
    onIntersect: () => {
      if (hasNextPage && status !== 'loading') fetchNextPage()
    },
  })

  if (status !== 'success') return <div>...is loading...</div>

  console.log('id', data)
  console.log(id)

  return (
    <S.Root>
      <S.HeaderContainer>
        <Header isModalHeader={false} hasArrow title={data?.pages[0].name} />
      </S.HeaderContainer>
      {/* {!data?.pages[0].hasNext && ( */}
      {/*   <S.EmptyPageRoot> */}
      {/*     <S.EmptyBoxContainer> */}
      {/*       <SaveIcon /> */}
      {/*       <h3>저장한 아이템이 없어요</h3> */}
      {/*       <p> */}
      {/*         좋아하는 셀럽의 아이템을 */}
      {/*         <br /> */}
      {/*         저장하여 나만의 옷장을 만들어봐요 */}
      {/*       </p> */}
      {/*       <button>인기 아이템 보러가기</button> */}
      {/*     </S.EmptyBoxContainer> */}
      {/*   </S.EmptyPageRoot> */}
      {/* )} */}
      <S.Body>
        <S.BackgroundContainer
          colorScheme={data?.pages[0].colorScheme}
          imgUrl={data?.pages[0].coverImgUrl}
        >
          <NameTagChip colorScheme={data?.pages[0].colorScheme} count={data?.pages[0].itemNum} />
        </S.BackgroundContainer>
        <S.ContentContainer>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores corporis
          dignissimos eveniet impedit ipsum, minus odio perspiciatis provident quisquam ratione
          repudiandae sed soluta sunt suscipit, tempora totam ullam, voluptatibus. Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. At, consequuntur culpa, dolor doloribus ea et
          fugiat ipsa laborum nisi numquam porro quas qui quia rem rerum sed sint tenetur
          voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, consequuntur
          culpa, dolor doloribus ea et fugiat ipsa laborum nisi numquam porro quas qui quia rem
          rerum sed sint tenetur voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. At, consequuntur culpa, dolor doloribus ea et fugiat ipsa laborum nisi numquam porro
          quas qui quia rem rerum sed sint tenetur voluptatibus.
        </S.ContentContainer>
      </S.Body>
    </S.Root>
  )
}

export default ClosetDetailPage
