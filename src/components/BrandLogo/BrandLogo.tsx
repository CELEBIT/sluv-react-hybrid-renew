import styled from '@emotion/styled'
import React from 'react'
import { Common } from '../styles'

interface BrandLogoProps {
  size: number
  url: string | undefined
}

const BrandLogo = ({ size, url }: BrandLogoProps) => {
  if (size === 32) {
    return <BrandLogo32 size={size} url={url} />
  } else {
    return <BrandLogo46 size={size} url={url} />
  }
}

export default BrandLogo

const BrandLogo32 = styled.div<{ url: string | undefined; size: number }>`
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 50%;
  border: 1px solid ${Common.colors.GR200};
  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-size: auto 1.25rem;
  background-size: 1.25rem auto;
`

const BrandLogo46 = styled.div<{ url: string | undefined; size: number }>`
  min-width: 2.875rem;
  min-height: 2.875rem;
  border-radius: 50%;
  border: 1.4px solid ${Common.colors.GR200};
  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-size: auto 1.75rem;
  background-size: 1.75rem auto;
`
