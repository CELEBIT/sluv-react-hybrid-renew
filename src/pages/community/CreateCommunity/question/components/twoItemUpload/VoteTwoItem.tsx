import React from 'react'
import {
  Description,
  ImageWrapper,
  ItemName,
  ItemNameWrapper,
  TwoItemUploadWrapper,
} from './styles'
import ExistingItem, {
  BrandName,
  CelebName,
  ImageField,
  ItemInfoWrapper,
} from './eachItemField/ExistingItem'
import ItemNameInput, { NameInputWrapper } from '../itemNameInput'
import { InputContainer } from '../../../../../../components/TextField/DefaultTextfield/styles'
import { BuyHomeResult, SearchQuestionResult } from '../../../../../../apis/search/searchService'
import { QuestionResult } from '../../../../../../apis/question/questionService.type'
import useQuestionDetailQuery from '../../../../../../apis/question/hooks/useQuestionDetailQuery'
import VotePercent from './VotePercent'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../../components/styles'

interface VoteTwoItemProps {
  item: BuyHomeResult
  selectedTab: string
}

interface VoteButtonProps {
  hasMine: boolean
  questionId: number
  voteSortOrder: number
}

const VoteTwoItem = ({ item, selectedTab }: VoteTwoItemProps) => {
  const getLeftRightImages = () => {
    let left
    let right

    if (item.imgList && item.imgList.length === 2) {
      ;[left, right] = item.imgList.sort((a, b) => a.sortOrder - b.sortOrder)
    } else if (item.itemImgList && item.itemImgList.length === 2) {
      ;[left, right] = item.itemImgList.sort((a, b) => a.sortOrder - b.sortOrder).map((obj) => obj)
    } else if (
      item.imgList &&
      item.imgList.length === 1 &&
      item.itemImgList &&
      item.itemImgList.length === 1
    ) {
      left =
        item.imgList[0].sortOrder < item.itemImgList[0].sortOrder
          ? item.imgList[0]
          : item.itemImgList[0]
      right =
        item.imgList[0].sortOrder >= item.itemImgList[0].sortOrder
          ? item.imgList[0]
          : item.itemImgList[0]
    }

    return { left, right }
  }
  const { left, right } = getLeftRightImages()
  return (
    <TwoItemUploadWrapper>
      <ImageWrapper>
        {item.imgList &&
          item.imgList.length === 1 &&
          item.itemImgList &&
          item.itemImgList.length === 1 && (
            <React.Fragment>
              {item.imgList[0].sortOrder < item.itemImgList[0].sortOrder ? (
                <ImageField imgUrl={item.imgList[0].imgUrl} className={'left'} dim={true}>
                  <ItemCardDim></ItemCardDim>
                  <ItemInfoWrapper>
                    <Description>{item.imgList[0].description}</Description>
                  </ItemInfoWrapper>
                </ImageField>
              ) : (
                <ImageField imgUrl={item.itemImgList[0].item.imgUrl} className={'left'} dim={true}>
                  <ItemCardDim></ItemCardDim>
                  <ItemInfoWrapper>
                    <Description>{item.itemImgList[0].description}</Description>
                  </ItemInfoWrapper>
                </ImageField>
              )}
              {item.imgList[0].sortOrder >= item.itemImgList[0].sortOrder ? (
                <ImageField imgUrl={item.imgList[0].imgUrl} className={'right'} dim={true}>
                  <ItemCardDim></ItemCardDim>
                  <ItemInfoWrapper>
                    <Description>{item.imgList[0].description}</Description>
                  </ItemInfoWrapper>
                </ImageField>
              ) : (
                <ImageField imgUrl={item.itemImgList[0].item.imgUrl} className={'right'} dim={true}>
                  <ItemCardDim></ItemCardDim>
                  <ItemInfoWrapper>
                    <Description>{item.itemImgList[0].description}</Description>
                  </ItemInfoWrapper>
                </ImageField>
              )}
            </React.Fragment>
          )}

        {item.imgList && item.imgList.length >= 2 && (
          <React.Fragment>
            <ImageField imgUrl={item.imgList[0].imgUrl} className={'left'} dim={true}>
              <ItemCardDim></ItemCardDim>
              <ItemInfoWrapper>
                <Description>{item.imgList[0].description}</Description>
              </ItemInfoWrapper>
            </ImageField>
            <ImageField imgUrl={item.imgList[1].imgUrl} className={'right'} dim={true}>
              <ItemCardDim></ItemCardDim>
              <ItemInfoWrapper>
                <Description>{item.imgList[1].description}</Description>
              </ItemInfoWrapper>
            </ImageField>
          </React.Fragment>
        )}

        {item.itemImgList && item.itemImgList.length >= 2 && (
          <React.Fragment>
            <ImageField imgUrl={item.itemImgList[0].item.imgUrl} className={'left'} dim={true}>
              <ItemCardDim></ItemCardDim>
              <ItemInfoWrapper>
                <Description>{item.itemImgList[0].description}</Description>
              </ItemInfoWrapper>
            </ImageField>
            <ImageField imgUrl={item.itemImgList[1].item.imgUrl} className={'right'} dim={true}>
              <ItemCardDim></ItemCardDim>
              <ItemInfoWrapper>
                <Description>{item.itemImgList[1].description}</Description>
              </ItemInfoWrapper>
            </ImageField>
          </React.Fragment>
        )}
      </ImageWrapper>
      <ItemNameWrapper>
        <ItemName className='left'>
          <InputContainer>
            <NameInputWrapper>
              {item.voteStatus === false &&
              item.hasMine === false &&
              new Date(item.voteEndTime) > new Date() ? (
                <VoteButton
                  hasMine={item.hasMine}
                  questionId={item.id}
                  voteSortOrder={0}
                ></VoteButton>
              ) : (
                <>
                  {left && (
                    <VotePercent data={left} voted={item.selectedVoteNum === 0}></VotePercent>
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
              {item.voteStatus === false &&
              item.hasMine === false &&
              new Date(item.voteEndTime) > new Date() ? (
                <VoteButton
                  hasMine={item.hasMine}
                  questionId={item.id}
                  voteSortOrder={1}
                ></VoteButton>
              ) : (
                <>
                  {right && (
                    <VotePercent data={right} voted={item.selectedVoteNum === 1}></VotePercent>
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
  const onClickVote = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    questionId: number,
    voteSortOrder: number,
  ) => {
    event.stopPropagation() // Stop propagation here
    if (hasMine) alert('자신의 게시글은 투표할 수 없어요.')
    else {
      mutateByVote({ questionId, voteSortOrder })
      alert('투표되었습니다')
    }
  }
  return (
    <Container onClick={(event) => onClickVote(event, questionId, voteSortOrder)}>
      투표하기
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  justify-content: center;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.PRI })}
`
const ItemCardDim = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4000000059604645;
  background: linear-gradient(360deg, #212529 0%, rgba(33, 37, 41, 0) 100%);
`

export default VoteTwoItem
