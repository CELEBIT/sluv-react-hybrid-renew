import React, { useState } from 'react'
import { FindRequestContainer } from './styles'
import CommunityHeader from '../../../components/Header/CommunityHeader/CommunityHeader'
import {
  ComponentContainer,
  LabelContainer,
  ComponentWrapper,
  Label,
} from '../../item/create/styles'
import SelectCeleb, { selectedCelebState } from '../../../components/SelectCeleb/SelectCeleb'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
import { ReactComponent as Error } from '../../../assets/error_20.svg'
import { useRecoilValue } from 'recoil'
import { HeaderWrapper } from '../../item/addInfo/styles'
import DefaultTextfield from '../../../components/TextField/DefaultTextfield/DefaultTextfield'
import TextArea from '../../../components/TextField/TextArea/TextArea'
import ImageField from '../../item/create/components/ImageField/ImageField'
import AddPhotos from '../../../components/AddPhotos/AddPhotos'

const FindRequest = () => {
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)
  const celeb = useRecoilValue(selectedCelebState)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <FindRequestContainer>
      <HeaderWrapper>
        <CommunityHeader>
          <span className='submit' onClick={() => alert('submit')}>
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
            {hasTriedToUpload && !celeb.id && <Error></Error>}
            <Label>아이템 정보를 물어보세요</Label>
          </LabelContainer>
          <div className='padding'>
            <DefaultTextfield
              value={title}
              setValue={setTitle}
              placeholder='제목'
            ></DefaultTextfield>
          </div>
          <div className='padding'>
            <TextArea
              value={content}
              setValue={setContent}
              placeholder='예)셀럽이 착용한 아이템 이거 어디꺼야?'
            ></TextArea>
          </div>
          {hasTriedToUpload && !celeb.id && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
        </ComponentWrapper>
        <ComponentWrapper>
          <LabelContainer>
            {hasTriedToUpload && !celeb.id && <Error></Error>}
            <Label>
              아이템/사진을 올려주세요 <span className='optional'>(선택)</span>
            </Label>
          </LabelContainer>
          <AddPhotos></AddPhotos>
        </ComponentWrapper>
      </ComponentContainer>
    </FindRequestContainer>
  )
}

export default FindRequest
