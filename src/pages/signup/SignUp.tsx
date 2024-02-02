import React, { useState } from 'react'
import { SignupValues } from '../../models/terms'
import Terms from '../../components/Terms/Terms'
import { PageContainer } from '../user/styles'
import { HeaderWrap } from '../search/styles'
import Header from '../../components/Header/Header'
import * as S from './styles'

function SignUp() {
  const [signupValues, setSignupValues] = useState<Partial<SignupValues>>(() => {
    return {
      step: 0,
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
  console.log(signupValues.terms)

  return (
    <S.Layout>
      <HeaderWrap>
        <Header isModalHeader={false} hasArrow={true} backBtnClick={handleBackClick} />
      </HeaderWrap>
      <S.Content>{signupValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}</S.Content>
    </S.Layout>
  )
}

export default SignUp
