import React, { useEffect, useState } from 'react'
import { SignupValues } from '../../models/signup'
import Terms from '../../components/Terms/Terms'
import { PageContainer } from '../user/styles'
import { HeaderWrap } from '../search/styles'
import Header from '../../components/Header/Header'
import * as S from './styles'
import Profile from '../../components/Profile/Profile'
import SelectInterestCeleb from '../selectInterestCeleb'
import { useNavigate } from 'react-router-dom'
import SignupComplete from '../../components/SignupComplete/SignupComplete'
import storage from '../../utils/storage'

// WebView 통신
declare global {
  interface Window {
    setToken: (token: string) => void
    setUserStatus: (status: string) => void
  }
}

function SignUp() {
  const navigate = useNavigate()
  const [jwtToken, setJwtToken] = useState('')
  const [userStatus, setUserStatus] = useState('')

  const setToken = (token: string) => {
    setJwtToken(token)
    console.log('token', token)
  }
  const setStatus = (status: string) => {
    setUserStatus(status)
    console.log('status', status)
  }

  // Native to JS로 토큰, status 저장
  useEffect(() => {
    window.setToken = setToken
    window.setUserStatus = setStatus
  }, [])

  useEffect(() => {
    storage.set('accessToken', jwtToken)
  }, [jwtToken])

  const [signupValues, setSignupValues] = useState<Partial<SignupValues>>(() => {
    return {
      step: userStatus === 'PENDING_PROFILE' ? 0 : userStatus === 'PENDING_CELEB' ? 2 : undefined,
    }
  })

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
    navigate('/')
  }
  console.log(signupValues.terms)

  return (
    <S.Layout>
      {signupValues.step !== 2 ? (
        <HeaderWrap>
          <Header isModalHeader={false} hasArrow={true} backBtnClick={handleBackClick} />
        </HeaderWrap>
      ) : null}

      <S.Content>
        {signupValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
        {signupValues.step === 1 ? <Profile onNext={handleProfileChange} /> : null}
        {signupValues.step === 2 ? (
          <SelectInterestCeleb onNext={handleSetCelebs} backBtnClick={handleBackClick} />
        ) : null}
        {signupValues.step === 3 ? <SignupComplete onNext={handleSignupComplete} /> : null}
      </S.Content>
    </S.Layout>
  )
}

export default SignUp
