import React from 'react'
import { NotificationIcon } from '../../../assets/Notification'
import { NotificationType } from './types'
import { ReactComponent as DefaultProfile } from '../../../assets/defaultProfile_40.svg'

interface IconProps {
  iconType: NotificationType
}

const getIconType = (type: string) => {
  if (type === NotificationType.NOTICE) {
    return <NotificationIcon.Official />
  } else if (type === NotificationType.REPORT) {
    return <NotificationIcon.Report />
  } else if (type === NotificationType.EDIT) {
    return <NotificationIcon.Edit />
  } else if (type === NotificationType.VOTE) {
    return <NotificationIcon.Vote />
  } else if (
    // 유저 프로필 이미지가 없는 경우
    type === NotificationType.USER ||
    type === NotificationType.ITEM ||
    type === NotificationType.QUESTION
  ) {
    return <DefaultProfile style={{ width: '2.5rem', height: '2.5rem' }}></DefaultProfile>
  } else {
    return <NotificationIcon.Official />
  }
}

const Icon = ({ iconType }: IconProps) => {
  return <>{getIconType(iconType)}</>
}

export default Icon
