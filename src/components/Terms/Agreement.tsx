import React, { MouseEvent } from 'react'
import { css } from '@emotion/react'
import Flex from '../Flex'

import { ReactComponent as CheckOff } from '../../assets/checkbox_off_reversed_32.svg'
import { ReactComponent as CheckOn } from '../../assets/checkbox_on_32.svg'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import { useNavigate } from 'react-router-dom'

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as='ul' direction='column' css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as='li' align='center' onClick={(e) => onChange(e, !checked)}>
      {checked ? <CheckOn /> : <CheckOff />}
      <TitleText>{children}</TitleText>
      {/* <Text bold={true}>{children}</Text> */}
    </Flex>
  )
}

function AgreementDescription({
  children,
  checked,
  onChange,
  link,
  mandatory,
}: {
  link?: string
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  mandatory: boolean
}) {
  const navigate = useNavigate()
  return (
    <Flex as='li'>
      <Flex
        align='center'
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
        {checked ? <CheckOn /> : <CheckOff />}
        <MandatoryText>{mandatory ? '[필수]' : '[선택]'}</MandatoryText>
        <DescriptionText link={link} onClick={() => navigate(String(link))}>
          {children}
        </DescriptionText>
      </Flex>
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

const agreementContainerStyles = css`
  & li {
    cursor: pointer;
  }
`

const TitleText = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
  margin-left: 8px;
  flex-wrap: wrap;
`
const DescriptionText = styled.span<{ link?: string }>`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
  margin-left: 8px;
  ${(props) => (props.link ? 'text-decoration: underline; cursor: pointer;' : '')}
`
export const MandatoryText = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.PRI })}
  margin-left: 8px;
  flex-wrap: wrap;
  text-decoration: none !important;
`
export default Agreement

/**
 * <Agreement>
 *  <Agreement.Title> 약관에 모두 동의 </Agreement.Title>
 *  <Agreement.Description> 약관1 </Agreement.Description>
 *  <Agreement.Description> 약관2 </Agreement.Description>
 * </Agreement>
 */
