import React from 'react'
import { useNavigate } from 'react-router-dom'

const User = () => {
  const navigate = useNavigate()
  return (
    <div>
      User
      <div
        onClick={() => {
          navigate('/select-celeb')
        }}
      >
        관심셀럽 선택하기
      </div>
    </div>
  )
}

export default User
