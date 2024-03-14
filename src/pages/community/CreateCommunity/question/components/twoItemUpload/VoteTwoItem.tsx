import React from 'react'
import { ImageWrapper, ItemName, ItemNameWrapper, TwoItemUploadWrapper } from './styles'
import ExistingItem, { ImageField } from './eachItemField/ExistingItem'
import ItemNameInput, { NameInputWrapper } from '../itemNameInput'
import { InputContainer } from '../../../../../../components/TextField/DefaultTextfield/styles'
import { SearchQuestionResult } from '../../../../../../apis/search/searchService'
import { QuestionResult } from '../../../../../../apis/question/questionService.type'
import useQuestionDetailQuery from '../../../../../../apis/question/hooks/useQuestionDetailQuery'
import VotePercent from './VotePercent'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../../components/styles'

interface VoteTwoItemProps {
  item: SearchQuestionResult
  data: QuestionResult
  selectedTab: string
}

interface VoteButtonProps {
  hasMine: boolean
  questionId: number
  voteSortOrder: number
}

const VoteTwoItem = ({ item, data, selectedTab }: VoteTwoItemProps) => {
  console.log(data)
  console.log(new Date(data.voteEndTime) < new Date())
  return (
    <TwoItemUploadWrapper>
      <ImageWrapper>
        <ImageField
          imgUrl={item.imgList && item.imgList[0].imgUrl}
          className={'left'}
          dim={true}
        ></ImageField>
        <ImageField
          imgUrl={item.imgList && item.imgList[1].imgUrl}
          className={'right'}
          dim={true}
        ></ImageField>
      </ImageWrapper>
      <ItemNameWrapper>
        <ItemName className='left'>
          <InputContainer>
            <NameInputWrapper>
              {(data.voteStatus === null || !data.hasMine) &&
              new Date(data.voteEndTime) > new Date() ? (
                <VoteButton
                  hasMine={data.hasMine}
                  questionId={item.id}
                  voteSortOrder={0}
                ></VoteButton>
              ) : (
                <>
                  {data.imgList && data.imgList.length > 0 && data.imgList[0] && (
                    <VotePercent data={data?.imgList[0]}></VotePercent>
                  )}
                  {data.itemList && data.itemList[0] && (
                    <VotePercent data={data?.itemList[0]}></VotePercent>
                  )}
                </>
              )}
            </NameInputWrapper>
          </InputContainer>
        </ItemName>
        <div className='divider' />
        <ItemName className='right'>
          <InputContainer>
            <NameInputWrapper>
              {(data.voteStatus === null || !data.hasMine) &&
              new Date(data.voteEndTime) > new Date() ? (
                <VoteButton
                  hasMine={data.hasMine}
                  questionId={item.id}
                  voteSortOrder={1}
                ></VoteButton>
              ) : (
                <>
                  {data.imgList && data.imgList[1] && (
                    <VotePercent data={data?.imgList[1]}></VotePercent>
                  )}
                  {data.itemList && data.itemList[1] && (
                    <VotePercent data={data?.itemList[1]}></VotePercent>
                  )}
                </>
              )}
            </NameInputWrapper>
          </InputContainer>
        </ItemName>
      </ItemNameWrapper>
    </TwoItemUploadWrapper>
  )
}

function VoteButton({ hasMine, questionId, voteSortOrder }: VoteButtonProps) {
  const {
    voteItem: { mutate: mutateByVote },
  } = useQuestionDetailQuery()
  const onClickVote = (questionId: number, voteSortOrder: number) => {
    if (hasMine) alert('자신의 게시글은 투표할 수 없어요.')
    else {
      mutateByVote({ questionId, voteSortOrder })
      alert('투표되었습니다')
    }
  }
  return <Container onClick={() => onClickVote(questionId, voteSortOrder)}>투표하기</Container>
}

const Container = styled.div`
  align-items: center;
  justify-content: center;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.PRI })}
`

export default VoteTwoItem
