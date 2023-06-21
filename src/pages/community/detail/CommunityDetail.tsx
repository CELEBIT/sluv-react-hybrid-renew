import React, { useState } from 'react'
import {
  CommentWrapper,
  CommunityContent,
  DetailContainer,
  InfoChip,
  InfoTextWrapper,
  InfoWrapper,
  InteractionWrapper,
  Line,
  ProfileImg,
  Recommend,
  RecommendInfo,
  RecommendListWrapper,
  RecommendPhoto,
  UserTextWrapper,
  UserWrapper,
} from './styles'
import Header from '../../../components/Header/Header'

import { ReactComponent as Home } from '../../../assets/home_24.svg'
import { ReactComponent as Share } from '../../../assets/share_24.svg'
import { ReactComponent as More } from '../../../assets/add_24.svg'
import { ReactComponent as Comment } from '../../../assets/comment_18.svg'
import { ReactComponent as View } from '../../../assets/page view_18.svg'
import { ReactComponent as Like } from '../../../assets/like_off_24.svg'
import { ReactComponent as SubmitOff } from '../../../assets/submit_off_32.svg'
import { ReactComponent as SubmitOn } from '../../../assets/submit_on_32.svg'

import Badge from '../../../components/Badge/Badge'
import { Divider, Reaction } from '../../item/detail/styles'
import { HeaderWrapper } from '../../item/addInfo/styles'
import EmptyState from '../../../components/EmptyState'
import CommentField from '../../../components/TextField/CommentField/CommentField'
import { useParams } from 'react-router-dom'
import useQuestionDetailQuery from '../../../apis/question/hooks/useQuestionDetailQuery'
import CountDown from './components/CountDown'
import DisplayPhotoItems from './components/DisplayPhotoItems'

const CommunityDetail = () => {
  const [comment, setComment] = useState<string>('')
  const submitComment = () => {
    console.log('댓글 입력됨', comment)
    setComment('')
  }

  const { id: questionId } = useParams()
  console.log('questionId', questionId)
  const { getQuestionDetail } = useQuestionDetailQuery()
  const { data } = getQuestionDetail(Number(questionId))
  console.log(data)

  return (
    <DetailContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true}>
          <Home />
          <Share />
          <More />
        </Header>
      </HeaderWrapper>

      <InfoWrapper>
        <InfoChip>
          {data?.qtype === 'Recommend' && <Badge color='blue'>추천해 줘</Badge>}
          {data?.qtype === 'How' && <Badge color='yellow'>이거 어때</Badge>}
          {data?.qtype === 'Buy' && <Badge color='green'>이 중에 뭐 살까</Badge>}
          {data?.qtype === 'Find' && <Badge color='pink'>찾아주세요</Badge>}

          {data?.qtype === 'Recommend' && <Badge color='gray'>애착템 추천템</Badge>}
          {data?.qtype === 'Find' && <Badge color='gray'>{data.celeb.celebName}</Badge>}
        </InfoChip>
        <UserWrapper>
          <ProfileImg url={data?.user.profileImgUrl}></ProfileImg>
          <UserTextWrapper>
            <span className='username'>{data?.user.nickName}</span>
            <span className='time'>5분 전</span>
          </UserTextWrapper>
        </UserWrapper>
        <span className='title'>{data?.title}</span>
        <span className='content'>{data?.content}</span>
        <CommunityContent>
          {data?.qtype === 'Buy' && new Date(data?.voteEndTime) > new Date() && (
            <CountDown voteEndTime={new Date(data?.voteEndTime)}></CountDown>
          )}
          {data?.qtype === 'Buy' ? (
            <></>
          ) : (
            <DisplayPhotoItems
              imgList={data?.imgList}
              itemList={data?.itemList}
            ></DisplayPhotoItems>
          )}
        </CommunityContent>
        <InteractionWrapper>
          <div className='left'>
            <Reaction>
              <Comment></Comment>
              <span>{data?.commentNum}</span>
            </Reaction>
            <Reaction>
              <View></View>
              <span>{data?.searchNum}</span>
            </Reaction>
          </div>
          <Reaction>
            <span>{data?.likeNum}</span>
            <Like></Like>
          </Reaction>
        </InteractionWrapper>
      </InfoWrapper>
      <Divider></Divider>
      <EmptyState
        icon='comment'
        title='아직 댓글이 없어요'
        subtitle='스러버를위해 첫 댓글을 남겨보세요'
      ></EmptyState>
      <Divider></Divider>
      <RecommendListWrapper>
        <span className='title'>미미 님의 추천을 기다리고 있어요</span>
        <Recommend>
          <RecommendInfo>
            <span className='category'>이거 어때</span>
            <span className='questionTitle'>
              엔시티 드림 팬이면 이건 꼭 봐야한다고 하는데 어때? 너무 길어서 고민이야... 재밌어?
            </span>
          </RecommendInfo>
        </Recommend>
        <Line></Line>
        <Recommend>
          <RecommendInfo>
            <span className='category'>이거 어때</span>
            <span className='questionTitle'>
              엔시티 드림 팬이면 이건 꼭 봐야한다고 하는데 어때? 너무 길어서 고민이야... 재밌어?
            </span>
          </RecommendInfo>
        </Recommend>
        <Line></Line>
        <Recommend>
          <RecommendInfo>
            <span className='category'>이거 어때</span>
            <span className='questionTitle'>
              스테이들아! 이리노 손민수템 중에 가성비 좋은 거 뭐 없을 까? 내가 아직 학생이라 너무
              비싼건 부담돼
            </span>
          </RecommendInfo>
          <RecommendPhoto></RecommendPhoto>
        </Recommend>
        <Line></Line>
        <Recommend>
          <RecommendInfo>
            <span className='category'>이거 어때</span>
            <span className='questionTitle'>
              엔시티 드림 팬이면 이건 꼭 봐야한다고 하는데 어때? 너무 길어서 고민이야... 재밌어?
            </span>
          </RecommendInfo>
        </Recommend>
      </RecommendListWrapper>
      <CommentWrapper>
        <CommentField
          value={comment}
          setValue={setComment}
          placeholder='댓글을 남겨주세요'
          onEnter={submitComment}
        ></CommentField>
        {comment ? <SubmitOn></SubmitOn> : <SubmitOff></SubmitOff>}
      </CommentWrapper>
    </DetailContainer>
  )
}

export default CommunityDetail
