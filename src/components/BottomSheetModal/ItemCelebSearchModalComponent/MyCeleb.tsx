import React from 'react'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import { useRecoilState } from 'recoil'
import { CelebData, selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'
import { MemberWrapper } from '../ItemCelebSelectModal'
import ButtonMedium from '../../ButtonMedium/ButtonMedium'

const MyCeleb = () => {
  const MyCelebList = [
    {
      id: 1,
      celebNameKr: '있지',
      subCelebList: [
        {
          id: 11,
          celebNameKr: '예지',
        },
        {
          id: 12,
          celebNameKr: '리아',
        },
        {
          id: 13,
          celebNameKr: '류진',
        },
        {
          id: 14,
          celebNameKr: '채령',
        },
        {
          id: 15,
          celebNameKr: '유나',
        },
        {
          id: 16,
          celebNameKr: '레미콘',
        },
        {
          id: 17,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 2,
      celebNameKr: '아이유',
    },
    {
      id: 3,
      celebNameKr: '르세라핌',
      subCelebList: [
        {
          id: 31,
          celebNameKr: '예지',
        },
        {
          id: 32,
          celebNameKr: '리아',
        },
        {
          id: 3,
          celebNameKr: '류진',
        },
        {
          id: 34,
          celebNameKr: '채령',
        },
        {
          id: 35,
          celebNameKr: '유나',
        },
        {
          id: 36,
          celebNameKr: '레미콘',
        },
        {
          id: 37,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 4,
      celebNameKr: '소녀시대',
      subCelebList: [
        {
          id: 41,
          celebNameKr: '예지',
        },
        {
          id: 42,
          celebNameKr: '리아',
        },
        {
          id: 43,
          celebNameKr: '류진',
        },
        {
          id: 44,
          celebNameKr: '채령',
        },
        {
          id: 45,
          celebNameKr: '유나',
        },
        {
          id: 46,
          celebNameKr: '레미콘',
        },
        {
          id: 47,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 5,
      celebNameKr: '핑클',
      subCelebList: [
        {
          id: 51,
          celebNameKr: '예지',
        },
        {
          id: 52,
          celebNameKr: '리아',
        },
        {
          id: 53,
          celebNameKr: '류진',
        },
        {
          id: 54,
          celebNameKr: '채령',
        },
        {
          id: 55,
          celebNameKr: '유나',
        },
        {
          id: 56,
          celebNameKr: '레미콘',
        },
        {
          id: 57,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 6,
      celebNameKr: 'SES',
      subCelebList: [
        {
          id: 61,
          celebNameKr: '예지',
        },
        {
          id: 62,
          celebNameKr: '리아',
        },
        {
          id: 63,
          celebNameKr: '류진',
        },
        {
          id: 64,
          celebNameKr: '채령',
        },
        {
          id: 65,
          celebNameKr: '유나',
        },
        {
          id: 66,
          celebNameKr: '레미콘',
        },
        {
          id: 67,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 7,
      celebNameKr: 'AOA',
      subCelebList: [
        {
          id: 71,
          celebNameKr: '예지',
        },
        {
          id: 72,
          celebNameKr: '리아',
        },
        {
          id: 73,
          celebNameKr: '류진',
        },
        {
          id: 74,
          celebNameKr: '채령',
        },
        {
          id: 75,
          celebNameKr: '유나',
        },
        {
          id: 76,
          celebNameKr: '레미콘',
        },
        {
          id: 77,
          celebNameKr: '유진',
        },
      ],
    },
    {
      id: 8,
      celebNameKr: '현아',
    },
  ]
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState)

  const onClickCeleb = (celeb: CelebData) => {
    if (celeb.subCelebList) {
      setSelectedGroup(celeb)
      setSelectedCeleb({ id: 0, celebNameKr: '' })
    } else {
      setSelectedCeleb(celeb)
      setSelectedGroup({ id: 0, celebNameKr: '', subCelebList: [] })
    }
    console.log(selectedCeleb)
    console.log(selectedGroup)
  }

  return (
    <MyCelebWrapper>
      <span className='label'>관심 셀럽</span>
      {MyCelebList.map((celeb) => {
        return (
          <div key={celeb.id} className='flex'>
            {selectedCeleb.id === 0 && selectedGroup.id === 0 ? (
              <CelebName onClick={() => onClickCeleb(celeb)}>{celeb.celebNameKr}</CelebName>
            ) : (
              <CelebName
                onClick={() => onClickCeleb(celeb)}
                match={
                  celeb.subCelebList ? celeb.id === selectedGroup.id : celeb.id === selectedCeleb.id
                }
              >
                {celeb.celebNameKr}
              </CelebName>
            )}

            <>
              {selectedGroup && selectedGroup.id === celeb.id && (
                <MemberWrapper>
                  {selectedGroup.subCelebList &&
                    selectedGroup.subCelebList.map((member) => {
                      return (
                        <ButtonMedium
                          key={member.id}
                          text={member.celebNameKr}
                          type='pri'
                          active={selectedCeleb === member}
                          onClick={() => setSelectedCeleb(member)}
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
