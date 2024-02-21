import styled from '@emotion/styled'
import React from 'react'

import { ReactComponent as DefaultProfile } from '../../assets/profile_medium_74.svg'

interface UserImageProps {
  size: number
  imgUrl?: string
}

const UserImage = ({ size, imgUrl }: UserImageProps) => {
  if (imgUrl) {
    return <UserImg size={size} imgUrl={imgUrl}></UserImg>
  }
  return (
    <DefaultProfile
      style={{ flexShrink: 0, width: `${size * 0.0625}rem`, height: `${size * 0.0625}rem` }}
    ></DefaultProfile>
  )
}

const UserImg = styled.div<{ size: number; imgUrl?: string }>`
  width: ${(props) => props.size * 0.0625}rem;
  height: ${(props) => props.size * 0.0625}rem;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`

export default UserImage
