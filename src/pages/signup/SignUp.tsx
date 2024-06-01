import React, { useEffect, useState } from 'react'
import { SignupValues } from '../../models/signup'
import Terms from '../../components/Terms/Terms'
import { HeaderWrap } from '../search/styles'
import Header from '../../components/Header/Header'
import * as S from './styles'
import Profile from '../../components/Profile/Profile'
import SelectInterestCeleb from '../selectInterestCeleb'
import { useNavigate } from 'react-router-dom'
import SignupComplete from '../../components/SignupComplete/SignupComplete'
import storage from '../../utils/storage'
import { ACCESS_TOKEN, UserStatus } from '../../config/constant'

function SignUp() {
  const navigate = useNavigate()
  const [userStatus, setUserStatus] = useState('')
  const [signupValues, setSignupValues] = useState<Partial<SignupValues>>(() => {
    return {
      step: userStatus === 'PENDING_PROFILE' ? 0 : userStatus === 'PENDING_CELEB' ? 2 : 0,
    }
  })
  const onNativeBackClick = () => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      window.webkit.messageHandlers.IOSBridge.postMessage(
        JSON.stringify({
          type: 'logout',
        }),
      )
    }
  }

  useEffect(() => {
    const token = storage.get(ACCESS_TOKEN)
    const status = storage.get(UserStatus)
    if (token && status === 'PENDING_PROFILE') {
      setUserStatus('PENDING_PROFILE')
      setSignupValues((prevValues) => ({
        ...prevValues,
        step: 0,
      }))
    } else if (token && status === 'PENDING_CELEB') {
      setUserStatus('PENDING_CELEB')
      setSignupValues((prevValues) => ({
        ...prevValues,
        step: 2,
      }))
    }
  }, [])

  const handleBackClick = () => {
    setSignupValues((prevValues) => ({
      ...prevValues,
      step: (prevValues.step as number) - 1,
    }))
    // api call
  }

  const handleTermsChange = (terms: SignupValues['terms']) => {
    setSignupValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
    // api call
  }

  const handleProfileChange = ({ nickname, userImg }: SignupValues['profile']) => {
    setSignupValues((prevValues) => ({
      ...prevValues,
      nickname,
      userImg,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleSetCelebs = () => {
    setSignupValues((prevValues) => ({
      ...prevValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleSignupComplete = () => {
    navigate('/home')
  }

  return (
    <S.Layout>
      {signupValues.step !== 2 ? (
        <HeaderWrap>
          <Header
            isModalHeader={false}
            hasArrow={true}
            backBtnClick={signupValues.step === 0 ? onNativeBackClick : handleBackClick}
          />
        </HeaderWrap>
      ) : null}

      <>
        {signupValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
        {signupValues.step === 1 ? <Profile onNext={handleProfileChange} /> : null}
        {signupValues.step === 2 ? (
          <SelectInterestCeleb onNext={handleSetCelebs} backBtnClick={handleBackClick} />
        ) : null}
        {signupValues.step === 3 ? <SignupComplete onNext={handleSignupComplete} /> : null}
      </>
    </S.Layout>
  )
}

export default SignUp
