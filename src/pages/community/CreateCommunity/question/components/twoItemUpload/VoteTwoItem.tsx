import React from 'react'
import { ImageWrapper, ItemName, ItemNameWrapper, TwoItemUploadWrapper } from './styles'
import ExistingItem, { ImageField } from './eachItemField/ExistingItem'
import ItemNameInput, { NameInputWrapper } from '../itemNameInput'
import { InputContainer } from '../../../../../../components/TextField/DefaultTextfield/styles'
import { SearchQuestionResult } from '../../../../../../apis/search/searchService'
import { QuestionResult } from '../../../../../../apis/question/questionService.type'
import useQuestionDetailQuery from '../../../../../../apis/question/hooks/useQuestionDetailQuery'
import VotePercent from './VotePercent'

interface VoteTwoItemProps {
  item: SearchQuestionResult
  data: QuestionResult
}

const VoteTwoItem = ({ item, data }: VoteTwoItemProps) => {
  const {
    voteItem: { mutate: mutateByVote },
  } = useQuestionDetailQuery()
  const onClickVote = (questionId: number, voteSortOrder: number) => {
    if (data.hasMine) alert('자신의 게시글은 투표할 수 없어요.')
    else mutateByVote({ questionId, voteSortOrder })
  }
  console.log(data)
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
        <ItemName className='left' onClick={() => onClickVote(item.id, 0)}>
          <InputContainer>
            <NameInputWrapper>
              {data.voteStatus === null ? (
                '투표하기'
              ) : (
                <>
                  {data.imgList && data.imgList[0] && (
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
        <ItemName className='right' onClick={() => onClickVote(item.id, 1)}>
          <InputContainer>
            <NameInputWrapper>
              {data.voteStatus === null ? (
                '투표하기'
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

export default VoteTwoItem
