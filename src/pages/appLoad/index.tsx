import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import storage from '../../utils/storage'
import { ACCESS_TOKEN, UserStatus } from '../../config/constant'
import Loading from '../../components/Loading'

const AppLoad = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = storage.get(ACCESS_TOKEN)
    if (!storage.get(UserStatus)) storage.set('userStatus', 'VIEW')
    if ((token && storage.get(UserStatus) === 'ACTIVE') || storage.get(UserStatus) === 'VIEW') {
      navigate('/home')
    } else {
      navigate('/signup')
    }
  }, [])

  return <Loading></Loading>
}

export default AppLoad
