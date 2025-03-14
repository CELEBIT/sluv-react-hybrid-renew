import React, { useEffect, useRef, useState } from 'react'
import {
  CommentContainer,
  CommentWrapper,
  CommunityContent,
  CommunityWrapper,
  DetailContainer,
  FindItemButton,
  InfoChip,
  InfoWrapper,
  InteractionWrapper,
  ProfileImg,
  RecommendChipWrapper,
  UserTextWrapper,
  UserWrapper,
} from './styles'
import Header from '../../../components/Header/Header'

import { ReactComponent as Home } from '../../../assets/home_24.svg'
import { ReactComponent as ShareIcon } from '../../../assets/share_24.svg'
import { ReactComponent as More } from '../../../assets/add_24.svg'
import { ReactComponent as CommentIcon } from '../../../assets/comment_18.svg'
import { ReactComponent as View } from '../../../assets/page view_18.svg'
import { ReactComponent as LikeOn } from '../../../assets/like_on_24.svg'
import { ReactComponent as LikeOff } from '../../../assets/like_off_24.svg'
import { ReactComponent as SubmitOff } from '../../../assets/submit_off_32.svg'
import { ReactComponent as SubmitOn } from '../../../assets/submit_on_32.svg'
import { ReactComponent as DefaultProfile } from '../../../assets/profile_medium_74.svg'

import Badge from '../../../components/Badge/Badge'
import { Divider, Reaction } from '../../item/detail/styles'
import { HeaderWrapper } from '../../item/addInfo/styles'
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
import { atom, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import Chip from '../../../components/Chip/Chip'
import { formatUpdatedAt, getRemainingTime } from '../../../utils/utility'
import RecommendList from './components/RecommendList'
import { Common } from '../../../components/styles'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import { RequestEditItemState } from '../../item/editRequest'
import { IselectedItem, communityItemState, imgItemListState } from '../../../recoil/communityInfo'
import { questionTypeState } from '../../../components/BottomSheetModal/QuestionEditDeleteModal'
import CommentList from './components/Comment/CommentList'
import { ReactComponent as Spinner } from '../../../assets/Spinner.svg'
import Flex from '../../../components/Flex'
import Share from '../../../utils/Share/share'
import useUserMypageQuery from '../../../apis/user/hooks/useUserMypageQuery'
import { toast } from 'react-toastify'
import storage from '../../../utils/storage'

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
  const { openModal } = useModals()
  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const [commentString, setCommentString] = useState<string>(commentObject.content ?? '')
  const [isFocused, setIsFocused] = useState(false)

  const setEditReportItemState = useSetRecoilState(RequestEditItemState)
  const resetCommentObject = useResetRecoilState(commentState)
  const setQuestionInfo = useSetRecoilState(communityItemState)
  const setQuestionType = useSetRecoilState(questionTypeState)
  const setImgItemList = useSetRecoilState(imgItemListState)

  const { id: questionId } = useParams()
  const setCommentQuestionId = useSetRecoilState(commentQuestionIdState)
  useEffect(() => {
    if (questionId) {
      setCommentQuestionId(Number(questionId))
    }
  }, [])

  const { getQuestionDetail, getTestQuestionDetail } = useQuestionDetailQuery()
  const { data } = getQuestionDetail(Number(questionId))
  // const { data } = getTestQuestionDetail(Number(questionId))
  console.log(data)

  const [isPreview, setIsPreview] = useState<boolean>(false)
  const searchOnPreview = () => {
    openModal(modals.LoginToContinueModal)
  }

  useEffect(() => {
    if (!storage.get('accessToken')) {
      setIsPreview(true)
    }
  })

  const combinedList = [...(data?.imgList ?? []), ...(data?.itemList ?? [])]
  const sortedList = combinedList.sort((a, b) => a.sortOrder - b.sortOrder)

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
    setCommentString('')
  }

  const onClickShowMore = () => {
    setEditReportItemState({
      itemId: Number(questionId),
      itemWriterId: data?.user.id,
      itemWriterName: data?.user.nickName,
    })
    // 내 게시글인 경우(수정,삭제)
    if (data?.hasMine) {
      setQuestionInfo({
        id: Number(questionId),
        celebId: data?.celeb?.celebId ?? null,
        newCelebId: data?.newCeleb?.celebId ?? null,
        title: data.title,
        content: data.content,
        imgList: data.imgList,
        itemList:
          data.itemList?.map((item) => ({
            itemId: item.item.itemId,
            description: item.description ?? null,
            representFlag: item.representFlag ?? null,
            sortOrder: item.sortOrder,
          })) ?? null,
        categoryNameList: data.recommendCategoryList,
      })
      setQuestionType(data.qtype)
      const convertedList: IselectedItem[] = sortedList.map((item) => {
        if ('item' in item) {
          const { item: selectedItem, ...rest } = item
          return { ...selectedItem, ...rest, vote: null }
        } else {
          const { imgUrl, ...rest } = item
          return { imgFile: null, itemId: null, imgUrl, ...rest, vote: null }
        }
      })
      setImgItemList(convertedList)
      openModal(modals.QuestionEditDeleteModal)
    }
    // 다른 유저의 게시글(신고)
    else {
      openModal(modals.QuestionReportModal)
    }
  }

  const {
    likeQuestion: { mutate: mutateByLike },
  } = useQuestionDetailQuery()
  const onClickLike = () => {
    if (data) mutateByLike(Number(questionId))
  }

  const { getMypageInfo } = useUserMypageQuery()
  const { data: currentUser } = getMypageInfo()
  useEffect(() => {
    setCommentObject({ ...commentObject, content: commentString })
  }, [commentString])

  // 공유하기
  const handleShare = async () => {
    const result = await Share(data?.title)
    if (result === 'shared') {
      toast('공유되었습니다.')
    } else if (result === 'copiedToClipboard') {
      toast('링크를 클립보드에 복사했습니다.')
    } else if (result === 'failed') {
      toast('공유하기가 실패했습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <DetailContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true}>
          <Home onClick={() => navigate('/home')} />
          <ShareIcon stroke={Common.colors.BK} onClick={handleShare} />
          <More onClick={isPreview ? () => searchOnPreview() : () => onClickShowMore()} />
        </Header>
      </HeaderWrapper>
      {data ? (
        <CommunityWrapper>
          <InfoWrapper>
            <InfoChip>
              {data?.qtype === 'Recommend' && <Badge color='blue'>추천해 줘</Badge>}
              {data?.qtype === 'How' && <Badge color='yellow'>이거 어때</Badge>}
              {data?.qtype === 'Buy' && <Badge color='green'>이 중에 뭐 살까</Badge>}
              {data?.qtype === 'Find' && <Badge color='pink'>찾아주세요</Badge>}

              {data?.qtype === 'Recommend' && (
                <Badge color='gray'>
                  {data.recommendCategoryList.map((category, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && '  '}
                      {category}
                    </React.Fragment>
                  ))}
                </Badge>
              )}
              {data?.qtype === 'Find' && (
                <Badge color='gray'>
                  {data.celeb ? data.celeb.celebName : data.newCeleb.celebName}
                </Badge>
              )}
            </InfoChip>
            <UserWrapper
              onClick={
                data?.hasMine ? () => navigate('/user') : () => navigate(`/user/${data?.user.id}`)
              }
            >
              {data?.user.profileImgUrl ? (
                <ProfileImg url={data?.user.profileImgUrl}></ProfileImg>
              ) : (
                <DefaultProfile
                  style={{ flexShrink: 0, width: '2.25rem', height: '2.25rem' }}
                ></DefaultProfile>
              )}

              <UserTextWrapper>
                <span className='username'>
                  {data.user.id !== -1 ? data?.user.nickName : '탈퇴한 유저'}
                </span>
                {data?.createdAt && <span className='time'>{formatUpdatedAt(data.createdAt)}</span>}
              </UserTextWrapper>
            </UserWrapper>
            <span className='title'>{data?.title}</span>
            <span className='content'>{data?.content}</span>
            <CommunityContent>
              {data?.qtype === 'Buy' && getRemainingTime(data.voteEndTime) !== '투표 종료' && (
                <CountDown voteEndTime={data?.voteEndTime}></CountDown>
              )}
              {data?.qtype === 'Buy' ? (
                <Vote
                  voteList={sortedList}
                  voteStatus={data.voteStatus}
                  questionId={Number(questionId)}
                  voteEndTime={new Date(data.voteEndTime)}
                  isMine={data.hasMine}
                ></Vote>
              ) : (
                <DisplayPhotoItems
                  imgList={data?.imgList}
                  itemList={data?.itemList}
                ></DisplayPhotoItems>
              )}
              {data?.qtype === 'Find' && !data.hasMine && (
                <FindItemButton
                  onClick={
                    isPreview
                      ? () => searchOnPreview()
                      : () => navigate('/community/comment/comment-item-photo')
                  }
                >
                  아이템 찾아주기
                </FindItemButton>
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
                {data?.hasLike ? (
                  <LikeOn
                    onClick={isPreview ? () => searchOnPreview() : () => onClickLike()}
                  ></LikeOn>
                ) : (
                  <LikeOff
                    onClick={isPreview ? () => searchOnPreview() : () => onClickLike()}
                  ></LikeOff>
                )}
              </Reaction>
            </InteractionWrapper>
          </InfoWrapper>
          <Divider></Divider>
          <CommentList questionId={Number(questionId)} isPreview={isPreview}></CommentList>
          <Divider></Divider>
          {data?.qtype && !isPreview && (
            <RecommendList
              questionId={Number(questionId)}
              nickName={currentUser?.userInfo.nickName}
              qType={data?.qtype}
            ></RecommendList>
          )}
          <CommentContainer>
            {isFocused && (
              <RecommendChipWrapper>
                <Chip
                  text={
                    data.qtype === 'Find'
                      ? '아이템 찾아주기'
                      : data.qtype === 'Recommend'
                      ? '아이템 추천하기'
                      : '다른 아이템 추천하기'
                  }
                  onClick={() => navigate('/community/comment/comment-item-photo')}
                ></Chip>
              </RecommendChipWrapper>
            )}
            <CommentWrapper
              onFocus={isPreview ? () => searchOnPreview() : () => setIsFocused(true)}
              onBlur={onBlurHandler}
            >
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
        </CommunityWrapper>
      ) : (
        <Flex justify='center' align='center' className='spinner' style={{ height: '100vh' }}>
          <Spinner></Spinner>
        </Flex>
      )}
    </DetailContainer>
  )
}

export default CommunityDetail
