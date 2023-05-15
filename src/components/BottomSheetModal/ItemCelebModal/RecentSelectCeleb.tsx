import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../styles'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal/ItemBrandSelectModal'
import useRecentCelebQuery from '../../../apis/celeb/hooks/useRecentCelebQuery'
import { IRecentCeleb } from '../../../apis/celeb/CelebService'
import { useRecoilState } from 'recoil'
import { celebInfoInItemState } from '../../../recoil/itemInfo'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'

const RecentSelectCeleb = () => {
  const { closeModal } = useModals()
  const {
    getRecentCeleb: { data },
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
    deleteRecentCeleb: { mutate: mutateByDeleteRecentCeleb },
    deleteAllRecentCeleb: { mutate: mutateByDeleteAllRecentCeleb },
  } = useRecentCelebQuery()
  const [celebInfoInItem, setCelebInfoInItem] = useRecoilState(celebInfoInItemState)

  const onDeleteAllSearchLog = () => {
    mutateByDeleteAllRecentCeleb()
  }
  const onDeleteEachSearchLog = (recentCeleb: IRecentCeleb) => {
    mutateByDeleteRecentCeleb({ celebId: recentCeleb.id, flag: recentCeleb.flag })
  }

  const onChipClick = (recentCeleb: IRecentCeleb) => {
    if (recentCeleb.flag == 'Y') {
      setCelebInfoInItem({
        ...celebInfoInItem,
        groupId: recentCeleb.parentId,
        groupName: recentCeleb.parentCelebName,
        soloId: recentCeleb.id,
        soloName: recentCeleb.childCelebName,
      })
      mutateByPostRecentCeleb(
        { celebId: recentCeleb.id, newCelebId: null },
        {
          onSuccess: () => {
            closeModal(modals.ItemCelebSearchModal)
          },
        },
      )
    } else {
      alert('NewCeleb에 대한 처리 필요!!')
    }
  }

  return (
    <RecentSearchWrapper>
      <SearchLogWrapper>
        <span>최근 선택한 셀럽</span>
        <DeleteAllText onClick={onDeleteAllSearchLog}>전체삭제</DeleteAllText>
      </SearchLogWrapper>
      <ChipWrapper>
        {(data?.length ?? 0) > 0 &&
          data?.map((celeb) => {
            return (
              <Chip
                key={celeb.id}
                text={
                  celeb.parentCelebName
                    ? celeb.parentCelebName + ' ' + celeb.childCelebName
                    : celeb.childCelebName
                }
                onClick={() => onChipClick(celeb)}
                canDelete={true}
                onDelete={() => onDeleteEachSearchLog(celeb)}
              ></Chip>
            )
          })}
      </ChipWrapper>
    </RecentSearchWrapper>
  )
}

export default RecentSelectCeleb

const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 1.5rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
`
const SearchLogWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5625rem 1.25rem 0.5625rem 1.25rem;
  width: 100%;
  span {
    ${Pretendard({
      size: 15,
      weight: Common.bold.regular,
      color: Common.colors.GR600,
    })}
  }
`
const DeleteAllText = styled.span`
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${Common.colors.GR500} !important;
`
