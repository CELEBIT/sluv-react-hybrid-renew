import React, { useState, useEffect, forwardRef } from 'react'

import { ReactComponent as Check } from '../../assets/check_13.svg'
import { Common, Pretendard } from '../styles'
import styled from '@emotion/styled'

interface ButtonMediumProps {
  children: any
  icon?: boolean
  active: boolean
  onClick: (e: any) => void
}

const FollowMediumButton = forwardRef<HTMLDivElement, ButtonMediumProps>(
  ({ icon, active, children, onClick }, ref) => {
    return (
      <MediumWrapper icon={icon} active={active} onClick={onClick} ref={ref}>
        <span>{children}</span>
        {icon && <Check width='13' height='13' stroke={Common.colors.GR600} />}
      </MediumWrapper>
    )
  },
)

FollowMediumButton.displayName = 'FollowMediumButton'

export default FollowMediumButton

export const MediumWrapper = styled.div<{
  icon?: boolean
  active?: boolean
}>`
  display: inline-flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  padding: 0.375rem 0.375rem 0.375rem 0.75rem;
  border-radius: 0.5rem;

  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })};

  background-color: white;

  border: 1px solid ${Common.colors.GR200};
  ${({ active }) =>
    active &&
    `
        padding:  0.375rem 0.75rem;
        border: 1px solid#E5E0F6;
        background-color: ${Common.colors.BG};
        color: #5E2AB9;
`};
`
