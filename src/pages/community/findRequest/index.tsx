import React, { useEffect, useState } from 'react'
import { FindRequestContainer } from './styles'
import CommunityHeader from '../../../components/Header/CommunityHeader/CommunityHeader'
import {
  ComponentContainer,
  LabelContainer,
  ComponentWrapper,
  Label,
} from '../../item/create/styles'
import SelectCeleb, {
  selectedCelebState,
  selectedNewCelebState,
} from '../../../components/SelectCeleb/SelectCeleb'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
import { ReactComponent as Error } from '../../../assets/error_20.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { HeaderWrapper } from '../../item/addInfo/styles'
import DefaultTextfield from '../../../components/TextField/DefaultTextfield/DefaultTextfield'
import TextArea from '../../../components/TextField/TextArea/TextArea'
import AddPhotos from '../../../components/AddPhotos/AddPhotos'
import { communityItemState } from '../../../recoil/communityInfo'
import { useNavigate } from 'react-router-dom'
import AddItemPhotos from '../../../components/AddPhotos/AddItemPhotos'
import useUploadQuestionQuery from '../../../apis/question/hooks/useUploadQuestionQuery'

const FindRequest = () => {
  const navigate = useNavigate()
  const [findRequestInfo, setFindRequestInfo] = useRecoilState(communityItemState)
  const celeb = useRecoilValue(selectedCelebState)
  const newCeleb = useRecoilValue(selectedNewCelebState)

  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)

  const [title, setTitle] = useState<string | null>(findRequestInfo.title)
  const [content, setContent] = useState<string | null>(findRequestInfo.content ?? null)

  const {
    postFindRequest: { mutate },
  } = useUploadQuestionQuery()

  const onSubmit = () => {
    setHasTriedToUpload(true)
    if (
      (celeb.id || newCeleb) &&
      findRequestInfo.title &&
      findRequestInfo.title.length > 10 &&
      findRequestInfo.title.length < 60
    ) {
      alert('success')
      console.log('findRequestInfo', findRequestInfo)
      setFindRequestInfo({ ...findRequestInfo, newCelebId: null })
      mutate({ ...findRequestInfo, newCelebId: null })
    }
  }
  useEffect(() => {
    setFindRequestInfo({
      ...findRequestInfo,
      celebId: celeb.id,
      title: title,
      content: content,
    })
  }, [title, content, celeb])

  return (
    <FindRequestContainer>
      <HeaderWrapper>
        <CommunityHeader>
          <span className='submit' onClick={onSubmit}>
            완료
          </span>
        </CommunityHeader>
      </HeaderWrapper>
      <ComponentContainer>
        {/* 누가 착용했나요 */}
        <ComponentWrapper className='top'>
          <LabelContainer>
            {hasTriedToUpload && !celeb.id && <Error></Error>}
            <Label>누가 착용했나요?</Label>
          </LabelContainer>
          <SelectCeleb></SelectCeleb>
          {hasTriedToUpload && !celeb.id && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
        </ComponentWrapper>
        {/* 아이템 정보를 물어보세요 */}
        <ComponentWrapper>
          <LabelContainer>
            {hasTriedToUpload && (!title || (title && title.length < 10)) && <Error></Error>}
            <Label>아이템 정보를 물어보세요</Label>
          </LabelContainer>
          <div className='padding'>
            <DefaultTextfield
              value={title ?? ''}
              setValue={setTitle}
              placeholder='제목'
            ></DefaultTextfield>
          </div>
          {hasTriedToUpload && !title && <ErrorText className='error'>필수 항목입니다</ErrorText>}
          {hasTriedToUpload && title && title.length < 10 && (
            <ErrorText className='error'>제목을 10자 이상 입력해 주세요</ErrorText>
          )}
          {hasTriedToUpload && title && title.length > 60 && (
            <ErrorText className='error'>제목은 최대 60자까지 입력할 수 있어요</ErrorText>
          )}
          <div className='padding'>
            <TextArea
              value={content ?? ''}
              setValue={setContent}
              placeholder='예)셀럽이 착용한 아이템 이거 어디꺼야?'
            ></TextArea>
          </div>
        </ComponentWrapper>
        <ComponentWrapper className='noGap'>
          <LabelContainer>
            <Label>
              아이템/사진을 올려주세요 <span className='optional'>(선택)</span>
            </Label>
          </LabelContainer>
          <AddItemPhotos onClick={() => navigate('/community/select-item-photo')}></AddItemPhotos>
        </ComponentWrapper>
      </ComponentContainer>
    </FindRequestContainer>
  )
}

export default FindRequest
