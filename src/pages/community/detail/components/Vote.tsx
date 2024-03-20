import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../../components/styles'
import { Img, Item } from '../../../../apis/question/questionService.type'
import { ReactComponent as Voted } from '../../../../assets/check_on_24.svg'
import useQuestionDetailQuery, {
  IVote,
} from '../../../../apis/question/hooks/useQuestionDetailQuery'
import { getRemainingTime } from '../../../../utils/utility'

interface VoteProps {
  questionId: number
  voteList: Array<Img | Item>
  voteStatus: number
  voteEndTime: Date
}
const isImg = (item: Img | Item): item is Img => {
  return 'imgUrl' in item
}
const Vote = ({ voteList, voteStatus, questionId, voteEndTime }: VoteProps) => {
  const {
    voteItem: { mutate: mutateByVote },
  } = useQuestionDetailQuery()
  const onClickVote = (questionId: number, voteSortOrder: number) => {
    if (new Date(voteEndTime) < new Date()) alert('투표가 종료되었어요.')
    else mutateByVote({ questionId, voteSortOrder })
  }

  return (
    <VoteContainer>
      {voteList.map((each, index) => {
        const isWin = each.votePercent > voteList[1 - index].votePercent
        const isDraw = each.votePercent === voteList[1 - index].votePercent
        return (
          <VoteCard key={each.sortOrder}>
            {isImg(each) ? (
              <>
                <VotePhoto imgUrl={each.imgUrl} />
                {voteStatus !== null ||
                getRemainingTime(voteEndTime.toDateString()) === '투표 종료' ? (
                  <VoteInfo onClick={() => onClickVote(questionId, each.sortOrder)}>
                    <PercentageIndicator
                      percent={each.votePercent}
                      win={isWin}
                      draw={isDraw}
                    ></PercentageIndicator>
                    {voteStatus !== null && voteStatus === index && (
                      <Voted style={{ zIndex: '100' }}></Voted>
                    )}
                    <VoteItemName>{each.description}</VoteItemName>
                    <VotePercentage win={isWin}>
                      {each.voteNum}명 {each.votePercent}%
                    </VotePercentage>
                  </VoteInfo>
                ) : (
                  <VoteInfo onClick={() => onClickVote(questionId, each.sortOrder)}>
                    <VoteItemName>{each.description}</VoteItemName>
                    <VoteButtonText>투표하기</VoteButtonText>
                  </VoteInfo>
                )}
              </>
            ) : (
              <>
                <VotePhoto imgUrl={each.item.imgUrl}>
                  <div className='infoText'>
                    <CelebName>{each.item.celebName}</CelebName>
                    <div className='itemInfoText'>
                      <Name>{each.item.brandName}</Name>
                      <Name>{each.item.itemName}</Name>
                    </div>
                  </div>
                </VotePhoto>

                {voteStatus !== null ||
                getRemainingTime(voteEndTime.toDateString()) === '투표 종료' ? (
                  <VoteInfo onClick={() => onClickVote(questionId, each.sortOrder)}>
                    <PercentageIndicator
                      percent={each.votePercent}
                      win={isWin}
                      draw={isDraw}
                    ></PercentageIndicator>
                    {voteStatus !== null && voteStatus === index && (
                      <Voted style={{ zIndex: '10' }}></Voted>
                    )}
                    <VoteItemName>{each.description}</VoteItemName>
                    <VotePercentage win={isWin}>
                      {each.voteNum}명 {each.votePercent}%
                    </VotePercentage>
                  </VoteInfo>
                ) : (
                  <VoteInfo onClick={() => onClickVote(questionId, each.sortOrder)}>
                    <VoteItemName>{each.description}</VoteItemName>
                    <VoteButtonText>투표하기</VoteButtonText>
                  </VoteInfo>
                )}
              </>
            )}
          </VoteCard>
        )
      })}
    </VoteContainer>
  )
}

export default Vote

export const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`
export const VoteCard = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 11.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${Common.colors.GR200};
  overflow: hidden;
`

export const VotePhoto = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
  width: 50%;
  height: 100%;
  padding: 0.75rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-color: ${Common.colors.GR300};

  .infoText {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .itemInfoText {
      display: flex;
      flex-direction: column;
    }
  }
`

const CelebName = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.regular, color: Common.colors.WH })}
`
const Name = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${Pretendard({ size: 12, weight: Common.bold.thin, color: Common.colors.WH })}
`
export const VoteInfo = styled.div`
  display: flex;
  position: relative;
  width: 50%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const VoteItemName = styled.span`
  z-index: 10;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const VoteButtonText = styled.span`
  z-index: 10;
  margin-top: 0.75rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.SEC })}
`

export const VotePercentage = styled.span<{ win: boolean }>`
  z-index: 10;
  margin-top: 0.75rem;
  ${(props) =>
    Pretendard({
      size: 17,
      weight: Common.bold.regular,
      color: props.win ? Common.colors.BK : Common.colors.GR600,
    })}
`

export const PercentageIndicator = styled.div<{
  percent: number
  win: boolean
  draw?: boolean
}>`
  left: 0;
  height: 100%;
  position: absolute;
  width: ${(props) => props.percent}%;
  background-color: ${(props) =>
    props.win ? Common.colors.BG : props.draw ? Common.colors.GR100 : Common.colors.GR100};
`
