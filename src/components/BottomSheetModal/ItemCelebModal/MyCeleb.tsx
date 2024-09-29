import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'
import { MemberWrapper } from './ItemCelebSelectModal'
import ButtonMedium from '../../ButtonMedium/ButtonMedium'
import { ICelebResult } from '../../../apis/user/userService'
import useInterestCelebQuery from '../../../apis/user/hooks/useInterestCelebQuery'
import { createItemCelebState } from '../../../recoil/itemInfo'

const MyCeleb = () => {
  const {
    getInterestCeleb: { data: interestCelebList },
  } = useInterestCelebQuery()

  const celebInfoInItem = useRecoilValue(createItemCelebState)
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState)

  useEffect(() => {
    if (
      celebInfoInItem?.groupId &&
      celebInfoInItem?.groupName &&
      celebInfoInItem?.soloId &&
      celebInfoInItem?.soloName
    ) {
      setSelectedGroup({ id: celebInfoInItem?.groupId, celebNameKr: celebInfoInItem?.groupName })
      setSelectedCeleb({ id: celebInfoInItem?.soloId, celebNameKr: celebInfoInItem?.soloName })
    } else if (celebInfoInItem?.soloId && celebInfoInItem?.soloName) {
      setSelectedCeleb({ id: celebInfoInItem?.soloId, celebNameKr: celebInfoInItem?.soloName })
    }
  }, [])

  const onClickCeleb = (celebResult: ICelebResult) => {
    if (celebResult.subCelebList) {
      // 그룹
      setSelectedGroup(celebResult)
      setSelectedCeleb({ id: 0, celebNameKr: '' })
    } else {
      // 솔로
      setSelectedCeleb(celebResult)
      setSelectedGroup({ id: 0, celebNameKr: '', subCelebList: [] })
    }
  }
  const onClickMember = (member: ICelebResult) => {
    setSelectedCeleb(member)
  }

  return (
    <MyCelebWrapper>
      <span className='label'>관심 셀럽</span>
      {(interestCelebList?.length ?? 0) > 0 &&
        interestCelebList?.map((celeb) => {
          return (
            <div key={celeb.id} className='flex'>
              {selectedCeleb.id === 0 && selectedGroup.id === 0 ? (
                <CelebName onClick={() => onClickCeleb(celeb)}>{celeb.celebNameKr}</CelebName>
              ) : (
                <CelebName
                  onClick={() => onClickCeleb(celeb)}
                  match={
                    celeb.subCelebList
                      ? celeb.id === selectedGroup.id
                      : celeb.id === selectedCeleb.id
                  }
                >
                  {celeb.celebNameKr}
                </CelebName>
              )}

              <>
                {selectedGroup && selectedGroup.id === celeb.id && (
                  <MemberWrapper>
                    {celeb.subCelebList &&
                      celeb.subCelebList.map((member) => {
                        return (
                          <ButtonMedium
                            key={member.id}
                            text={member.celebNameKr}
                            type='pri'
                            active={selectedCeleb.id === member.id}
                            onClick={() => onClickMember(member)}
                          ></ButtonMedium>
                        )
                      })}
                  </MemberWrapper>
                )}
              </>
            </div>
          )
        })}
    </MyCelebWrapper>
  )
}

export default MyCeleb

const MyCelebWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  .label {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
    margin: 0 0 0.5625rem 0;
  }
  .flex {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

const CelebName = styled.span<{ match?: boolean }>`
  ${(props) =>
    Pretendard({
      size: 18,
      weight: Common.bold.thin,
      color:
        props.match === undefined
          ? Common.colors.BK
          : props.match
          ? Common.colors.BK
          : Common.colors.GR500,
    })}

  margin: 0.875rem 0;
`
