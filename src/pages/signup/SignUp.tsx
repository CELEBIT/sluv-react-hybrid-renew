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

function SignUp() {
  const navigate = useNavigate()
  const [jwtToken, setJwtToken] = useState('')
  const [userStatus, setUserStatus] = useState('')

  useEffect(() => {
    const token = storage.get('accessToken')
    const status = storage.get('userStatus')
    if (token) {
      console.log(token)
      alert(`token : ${token}`)
      setJwtToken(token)
    }
    if (status) {
      console.log(status)
      alert(`status : ${status}`)
      setUserStatus(status)
    }
  }, [])

  useEffect(() => {
    if (jwtToken && userStatus === 'ACTIVE') {
      navigate('/home')
    }
    if (jwtToken && userStatus === 'PENDING_PROFILE') {
      setSignupValues((prevValues) => ({
        ...prevValues,
        step: 0,
      }))
    }
    if (jwtToken && userStatus === 'PENDING_CELEB') {
      setSignupValues((prevValues) => ({
        ...prevValues,
        step: 2,
      }))
    }
  }, [jwtToken, userStatus])

  const [signupValues, setSignupValues] = useState<Partial<SignupValues>>(() => {
    return {
      step: userStatus === 'PENDING_PROFILE' ? 0 : userStatus === 'PENDING_CELEB' ? 2 : 0,
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
    navigate('/home')
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
