import styled from '@emotion/styled'
import React from 'react'

import { ReactComponent as DefaultProfile } from '../../assets/profile_medium_74.svg'
import { Common } from '../styles'

interface UserImageProps {
  size: number
  imgUrl?: string
}

const UserImage = ({ size, imgUrl }: UserImageProps) => {
  if (imgUrl) {
    return (
      <UserImg size={size} imgUrl={imgUrl}>
        <Dim></Dim>
      </UserImg>
    )
  }
  return (
    <DefaultProfile
      style={{ flexShrink: 0, width: `${size * 0.0625}rem`, height: `${size * 0.0625}rem` }}
    >
      <Dim></Dim>
    </DefaultProfile>
  )
}

const UserImg = styled.div<{ size: number; imgUrl?: string }>`
  position: relative;
  width: ${(props) => props.size * 0.0625}rem;
  height: ${(props) => props.size * 0.0625}rem;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  overflow: hidden;
`

const Dim = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 3%;
  background-color: ${Common.colors.BK};
`

export default UserImage
