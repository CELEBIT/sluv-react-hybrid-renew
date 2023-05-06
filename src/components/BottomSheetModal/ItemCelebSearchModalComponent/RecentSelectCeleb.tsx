import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../styles'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal/ItemBrandSelectModal'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import { CelebData, selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'

const RecentSelectCeleb = () => {
  const RecenCelebList = [
    {
      id: 61,
      celebNameKr: '있지 예지',
    },
    {
      id: 62,
      celebNameKr: '있지 리나',
    },
    {
      id: 63,
      celebNameKr: '르세라핌 민니',
    },
    {
      id: 64,
      celebNameKr: '소녀시대 태연',
    },
    {
      id: 65,
      celebNameKr: '아이유',
    },
    {
      id: 66,
      celebNameKr: '블랙핑크 로제',
    },
    {
      id: 67,
      celebNameKr: '안보현',
    },
  ]
  const setSelectedCelebState = useSetRecoilState(selectedCelebState)
  const setSelectedGroupState = useSetRecoilState(selectedGroupState)
  const onDeleteAllSearchLog = () => {
    alert('전체 검색어 삭제')
  }
  const onDeleteEachSearchLog = () => {
    alert('각각 검색어 삭제')
  }

  const { closeModal } = useModals()

  const onChipClick = (celeb: CelebData) => {
    setSelectedCelebState(celeb)
    setSelectedGroupState({ id: 0, celebNameKr: '' })
    closeModal(modals.ItemCelebSearchModal)
  }

  return (
    <RecentSearchWrapper>
      <SearchLogWrapper>
        <span>최근 선택한 셀럽</span>
        <DeleteAllText onClick={onDeleteAllSearchLog}>전체삭제</DeleteAllText>
      </SearchLogWrapper>
      <ChipWrapper>
        {RecenCelebList.map((celeb) => {
          return (
            <Chip
              key={celeb.id}
              text={celeb.celebNameKr}
              onClick={() => onChipClick(celeb)}
              canDelete={true}
              onDelete={onDeleteEachSearchLog}
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
