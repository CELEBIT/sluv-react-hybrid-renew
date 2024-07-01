import { useState, useEffect, ChangeEvent, useCallback, useMemo, useRef } from 'react'
import styled from '@emotion/styled'
import { SignupValues } from '../../models/signup'
import Flex from '../Flex'
import S3Service from '../../apis/s3/S3Service'
import FixedBottomButton from '../FixedBottomButton/FixedBottomButton'
import useUserMypageQuery from '../../apis/user/hooks/useUserMypageQuery'
import TextField from './TextField'
import { Title } from '../../pages/signup/styles'
import { ReactComponent as DefaultProfile } from '../../assets/profile_big.svg'
import { ReactComponent as AddPhoto } from '../../assets/add_photo_30.svg'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { HeaderWrap } from '../../pages/search/styles'
import Header from '../Header/Header'
import { ContentContainer, PageContainer } from '../../pages/user/styles'
import { HeaderWrapper } from '../Header/CommunityHeader/styles'
import { convertToFile, convertToImageList, openGallery } from '../../utils/utility'

function Profile({ onNext }: { onNext?: (profile: SignupValues['profile']) => void }) {
  const [profileValues, setProfileValues] = useState<SignupValues['profile']>({
    nickname: '',
    userImg: '',
  })
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const errors = useMemo(() => validate(profileValues), [profileValues])
  const 제출가능한상태인가 = Object.keys(errors).length === 0

  const [dirty, setDirty] = useState<Partial<SignupValues['profile']>>()

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setProfileValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      alert('파일이 없습니다.')
      return
    }
    const s3 = new S3Service()
    const imgURL = await s3.postProfileImg(file)
    setProfileValues((prevValues) => ({
      ...prevValues,
      userImg: imgURL,
    }))
    console.log(imgURL)
  }

  const {
    uploadProfile: { mutate },
    editProfileImage: { mutate: mutateByEditImg },
  } = useUserMypageQuery()

  const handleSubmit = () => {
    if (제출가능한상태인가) {
      if (pathname === '/settings/edit-profile' && currentNickname === profileValues.nickname) {
        mutateByEditImg(profileValues.userImg, {
          onSuccess: () => {
            if (onNext) onNext(profileValues)
            else navigate(-1)
          },
        })
      } else {
        mutate(profileValues, {
          onError: (error: AxiosError<{ code: number }>) => {
            if (error.response) {
              const { code } = error.response.data
              if (code === 2017) {
                errors.nickname = '중복된 닉네임입니다'
                setDirty((prevDirty) => ({
                  ...prevDirty,
                  nickname: 'true',
                }))
              }
            }
            console.log(error)
          },
          onSuccess: () => {
            if (onNext) onNext(profileValues)
            else navigate(-1)
          },
        })
      }
    }
  }

  const { getMypageInfo } = useUserMypageQuery()
  const { data } = getMypageInfo()
  const [currentNickname, setcurrentNickname] = useState(data?.userInfo.nickName ?? '')
  const [currentImg, setcurrentImg] = useState(data?.userInfo.profileImgUrl ?? '')
  useEffect(() => {
    if (pathname === '/settings/edit-profile') {
      if (data) {
        setProfileValues((prevValues) => ({
          ...prevValues,
          userImg: data?.userInfo.profileImgUrl,
          nickname: data?.userInfo.nickName,
        }))
        setcurrentNickname(data?.userInfo.nickName)
        setcurrentImg(data?.userInfo.profileImgUrl)
      }
    }
  }, [data])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onClickOpenGallery = () => {
    // if (
    //   typeof window !== 'undefined' &&
    //   window.webkit &&
    //   window.webkit.messageHandlers &&
    //   window.webkit.messageHandlers.IOSBridge
    // ) {
    //   openGallery(1, 1,fileInputRef)
    // }
    openGallery(1, 1, fileInputRef)
  }

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = async (event: any) => {
      console.log(event.detail)
      const images = convertToFile(event.detail)
      const s3 = new S3Service()
      const imgURL = await s3.postProfileImg(images[0])
      if (imgURL)
        setProfileValues((prevValues) => ({
          ...prevValues,
          userImg: imgURL,
        }))
    }
    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
    }
  }, [])

  return (
    <Layout>
      {pathname === '/settings/edit-profile' && (
        <HeaderWrap>
          <Header isModalHeader={false} hasArrow={true} backBtnClick={() => navigate(-1)} />
        </HeaderWrap>
      )}

      <ContentContainer>
        <Flex direction='column' style={{ padding: '0 20px' }}>
          <Title>
            프로필 사진과 <br />
            닉네임을 등록해주세요
          </Title>
          <Flex direction='column' justify='center' align='center'>
            <ProfileContainer onClick={onClickOpenGallery}>
              {profileValues.userImg ? (
                <img src={profileValues.userImg} alt='유저의 이미지' />
              ) : (
                <DefaultProfile />
              )}
              {/* <input type='file' accept='image/*' ref={fileInputRef} onChange={handleChangeFile} /> */}
              <input
                id='inputFile'
                type='file'
                accept='image/*'
                onChange={(e) => handleChangeFile(e)}
                // onClick={onClickOpenGallery}
                style={{ display: 'none' }}
                multiple
                max={1}
                ref={fileInputRef}
              ></input>
              <AddPhoto className='add' />
            </ProfileContainer>
            <TextField
              label='이름'
              name='nickname'
              placeholder='내 닉네임'
              value={profileValues.nickname}
              onChange={handleFormValues}
              hasError={Boolean(dirty?.nickname) && Boolean(errors.nickname)}
              helpMessage={dirty?.nickname ? errors.nickname : ''}
              onBlur={handleBlur}
            />
          </Flex>
          <FixedBottomButton
            label='완료'
            disabled={
              pathname === '/settings/edit-profile'
                ? currentNickname === profileValues.nickname && currentImg === profileValues.userImg
                : 제출가능한상태인가 === false
            }
            onClick={() => {
              handleSubmit()
            }}
          />
        </Flex>
      </ContentContainer>
    </Layout>
  )
}

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding-left: 0;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }

  .headerRight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.25rem;
  }
`

export const ProfileContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-top: 50px;
  margin-bottom: 24px;
  & img {
    border-radius: 50%; /* 100% -> 50% 수정 */
    width: 128px;
    height: 128px;
    object-fit: cover; /* 추가 */
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
  }

  .add {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .welcome {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
`

const DefaultImage = styled.img`
  border-radius: 50%; /* 100% -> 50% 수정 */
  width: 128px;
  height: 128px;
  object-fit: cover; /* 추가 */
`

const validate = (profile: SignupValues['profile']) => {
  const errors: Partial<SignupValues['profile']> = {}
  if (profile.nickname.length < 2) {
    errors.nickname = '닉네임은 2글자 이상 입력해주세요'
  }

  if (profile.nickname.length > 15) {
    errors.nickname = '닉네임은 최대 15자까지 입력할 수 있어요'
  }
  if (profile.nickname.includes(' ')) {
    errors.nickname = '띄어쓰기는 허용되지 않아요'
  }

  return errors
}
export default Profile
