import React from 'react'
import Spinner from '../../assets/loading.gif'
import styled from '@emotion/styled'

const Loading = () => {
  return (
    <LoadingWrap>
      <img src={Spinner} />
    </LoadingWrap>
  )
}

export default Loading

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  img {
    width: 80px;
    height: 80px;
  }
`
