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

  const setToken = (token: string) => {
    setJwtToken(token)
    alert(`token ${token}`)
    console.log('token', token)
  }
  const setStatus = (status: string) => {
    setUserStatus(status)
    alert(`status ${status}`)
    console.log('status', status)
    storage.set('userStatus', status)
  }

  // Native to JS로 토큰, status 저장
  useEffect(() => {
    window.setToken = setToken as (token: string) => void
    window.setUserStatus = setStatus as (status: string) => void
  }, [])

  useEffect(() => {
    if (jwtToken) {
      storage.set('accessToken', jwtToken)
      alert(`NATIVE to REACT jwtToken 설정 완료 ${jwtToken}`)
    } else {
      alert('jwtToken 없음')
    }
  }, [jwtToken])

  useEffect(() => {
    const handleTokenEvent = (event: MessageEvent<string>) => {
      if (event.data) {
        try {
          const tokenData = JSON.parse(event.data)
          if (tokenData.token) {
            storage.set('accessToken', tokenData.token)
            setToken(tokenData.token)
            alert(`Received token: ${tokenData.token}`)
          }
        } catch (error) {
          console.error('Error parsing token data:', error)
          alert('error')
          // Handle parsing error appropriately (e.g., display an error message to the user)
        }
      }
    }

    const handleStatusEvent = (event: MessageEvent<string>) => {
      if (event.data) {
        try {
          const statusData = JSON.parse(event.data)
          if (statusData.status) {
            setStatus(statusData.status)
            storage.set('userStatus', statusData.status)
            alert(`Received user status: ${statusData.status}`)
          }
        } catch (error) {
          console.error('Error parsing status data:', error)
          // Handle parsing error appropriately
          alert('error')
        }
      }
    }

    window.addEventListener('setToken', handleTokenEvent)
    window.addEventListener('setUserStatus', handleStatusEvent)

    return () => {
      window.removeEventListener('setToken', handleTokenEvent)
      window.removeEventListener('setUserStatus', handleStatusEvent)
    }
  }, [])

  useEffect(() => {
    if (jwtToken && userStatus === 'ACTIVE') {
      navigate('/')
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
