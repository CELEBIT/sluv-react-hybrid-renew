import React, { useCallback, useState, MouseEvent } from 'react'
import Agreement, { MandatoryText } from './Agreement'
import FixedBottomButton from '../FixedBottomButton/FixedBottomButton'

import { 약관목록 } from '../../config/constant'
import { SignupValues } from '../../models/terms'
import { Line, Title } from '../../pages/signup/styles'
import Flex from '../Flex'
// import { ApplyValues } from '@models/apply'

function Terms({ onNext }: { onNext: (terms: SignupValues['terms']) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback((_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return Object.keys(prevTerms).reduce(
        (prev, key) => ({
          ...prev,
          [key]: checked,
        }),
        {},
      )
    })
  }, [])

  const 모든약관이_동의되었는가 = Object.values(termsAgreements).every((동의여부) => 동의여부)
  const 모든필수약관이_동의되었는가 = 약관목록
    .filter((term) => term.mandatory)
    .every((term) => termsAgreements[term.id])

  return (
    <Flex direction='column'>
      <Title>
        스럽 서비스 이용약관에 <br />
        동의해주세요
      </Title>
      <Agreement>
        <Agreement.Title checked={모든약관이_동의되었는가} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        <Line />
        {약관목록.map(({ id, title, link, mandatory }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            mandatory={mandatory}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label='약관동의'
        disabled={모든필수약관이_동의되었는가 === false}
        onClick={() => {
          const checkedTermIds = Object.keys(termsAgreements).filter((key) => termsAgreements[key])
          onNext(checkedTermIds)
        }}
      />
    </Flex>
  )
}

export default Terms
