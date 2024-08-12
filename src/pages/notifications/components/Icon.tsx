import React from 'react'
import { NotificationIcon } from '../../../assets/Notification'
import { NotificationType } from './types'

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
  } else {
    return 'profile'
  }
}

const Icon = ({ iconType }: IconProps) => {
  return <>{getIconType(iconType)}</>
}

export default Icon
