import React, { useEffect, useRef, useState } from 'react'
import {
  CommentContainer,
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
  RecommendChipWrapper,
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
import { ReactComponent as CommentIcon } from '../../../assets/comment_18.svg'
import { ReactComponent as View } from '../../../assets/page view_18.svg'
import { ReactComponent as Like } from '../../../assets/like_off_24.svg'
import { ReactComponent as SubmitOff } from '../../../assets/submit_off_32.svg'
import { ReactComponent as SubmitOn } from '../../../assets/submit_on_32.svg'

import Badge from '../../../components/Badge/Badge'
import { Divider, Reaction } from '../../item/detail/styles'
import { HeaderWrapper } from '../../item/addInfo/styles'
import EmptyState from '../../../components/EmptyState'
import CommentField from '../../../components/TextField/CommentField/CommentField'
import { useNavigate, useParams } from 'react-router-dom'
import useQuestionDetailQuery from '../../../apis/question/hooks/useQuestionDetailQuery'
import CountDown from './components/CountDown'
import DisplayPhotoItems from './components/DisplayPhotoItems'
import Vote from './components/Vote'
import useSearchCommentQuery, {
  IAddComment,
} from '../../../apis/comment/hooks/useSearchCommentQuery'
import { NewComment } from '../../../apis/comment/commentService.type'
import { atomKeys } from '../../../config/atomKeys'
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import Comment from './components/Comment/Comment'
import Chip from '../../../components/Chip/Chip'

export const commentState = atom<NewComment>({
  key: atomKeys.commentState,
  default: { content: null, imgList: null, itemList: null },
})

export const commentQuestionIdState = atom<number>({
  key: atomKeys.commentQuestionId,
  default: 0,
})

const CommunityDetail = () => {
  const navigate = useNavigate()
  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const resetCommentObject = useResetRecoilState(commentState)

  const [commentString, setCommentString] = useState<string>(commentObject.content ?? '')
  const [isFocused, setIsFocused] = useState(false)
  const commentWrapperRef = useRef<HTMLDivElement>(null)

  const { id: questionId } = useParams()
  const setCommentQuestionId = useSetRecoilState(commentQuestionIdState)
  if (questionId) {
    setCommentQuestionId(Number(questionId))
  }

  const { getQuestionDetail } = useQuestionDetailQuery()
  const { data } = getQuestionDetail(Number(questionId))

  const [isChipClicked, setIsChipClicked] = useState(false)
  const onBlurHandler = () => {
    setTimeout(() => {
      if (!isChipClicked) {
        setIsFocused(false)
      }
    }, 100)
  }

  const {
    addComment: { mutate: mutateByAddComment },
  } = useSearchCommentQuery()
  const onAddComment = () => {
    const newComment: IAddComment = {
      questionId: Number(questionId),
      content: commentObject.content,
      imgList: commentObject.imgList,
      itemList: commentObject.itemList,
    }
    mutateByAddComment(newComment)
  }
  const submitComment = () => {
    onAddComment()
    resetCommentObject()
  }
  useEffect(() => {
    setCommentObject({ ...commentObject, content: commentString })
  }, [commentString])

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
            <Vote></Vote>
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
              <CommentIcon></CommentIcon>
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
      <Comment questionId={Number(questionId)}></Comment>
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
      <CommentContainer>
        {isFocused && (
          <RecommendChipWrapper>
            <Chip
              text='아이템 찾아주기'
              onClick={() => navigate('/community/comment/comment-item-photo')}
            ></Chip>
          </RecommendChipWrapper>
        )}
        <CommentWrapper onFocus={() => setIsFocused(true)} onBlur={onBlurHandler}>
          <CommentField
            value={commentString}
            setValue={setCommentString}
            placeholder='댓글을 남겨주세요'
            onEnter={() => submitComment()}
          ></CommentField>
          {commentString ? (
            <SubmitOn onClick={() => submitComment()}></SubmitOn>
          ) : (
            <SubmitOff></SubmitOff>
          )}
        </CommentWrapper>
      </CommentContainer>
    </DetailContainer>
  )
}

export default CommunityDetail
