import React, { useState } from 'react'
import * as S from './styles'
import { INotification, NotificationType } from './types'
import UserImage from '../../../components/UserImage/UserImage'
import Icon from './Icon'
import { ReactComponent as Check } from '../../../assets/check_24.svg'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../../config/atomKeys'
import { Common } from '../../../components/styles'
import { useNavigate } from 'react-router-dom'
import { EachVotePhoto } from '../../community/detail/styles'
import Photo from '../../../components/AddPhotos/Photo'
import useNotificationQuery from '../../../apis/notification/hooks/useNotificationQuery'
import { formatUpdatedAt } from '../../../utils/utility'

interface NotificationProps {
  hasPreviewImg?: boolean
  data: INotification
  isEditMode: boolean
}

export const deleteNotificationsState = atom<Array<number>>({
  key: atomKeys.deleteNotificationsState,
  default: [],
})

const Notification = ({ hasPreviewImg, data, isEditMode }: NotificationProps) => {
  const navigate = useNavigate()
  const {
    readNotification: { mutate: mutateByRead },
  } = useNotificationQuery()

  const [checkedList, setCheckedList] = useRecoilState(deleteNotificationsState)
  const [isChecked, setIsChecked] = useState(checkedList.includes(data.alarmId))

  const onCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (isChecked) {
      const filteredList = checkedList.filter((item) => item !== Number(target.value))
      setCheckedList([...filteredList])
    } else {
      setCheckedList((prev) => [...prev, Number(target.value)])
    }
    setIsChecked((prev) => !prev)
  }

  const onClickNotification = (type: NotificationType) => {
    if (isEditMode) return
    if (data.alarmStatus === 'ACTIVE') mutateByRead(data.alarmId)
    if (type === NotificationType.ITEM || type === NotificationType.EDIT) {
      navigate(`/item/detail/${data.itemId}`)
    }
    if (
      type === NotificationType.QUESTION ||
      type === NotificationType.VOTE ||
      type === NotificationType.COMMENT
    ) {
      navigate(`/community/detail/${data.questionId}`)
    }
    if (type === NotificationType.USER) {
      navigate(`/user/${data.followerId}`)
    }
    if (type === NotificationType.NOTICE) {
      navigate('/notice')
    }
  }

  const sortedList = data.images.sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <S.Layout
      onClick={() => onClickNotification(data.type)}
      isRead={data.alarmStatus === 'READ'}
      isEditMode={isEditMode}
    >
      <S.LeftLayout>
        {isEditMode ? (
          <S.Checkbox>
            <input
              id={String(data.alarmId)}
              type='checkbox'
              checked={checkedList.includes(data.alarmId)}
              onChange={(e) => onCheck(e)}
              value={data.alarmId}
            />
            <Check
              stroke={checkedList.includes(data.alarmId) ? Common.colors.SEC : Common.colors.GR500}
            />
          </S.Checkbox>
        ) : (
          <>
            {data.userImageUrl ? (
              <UserImage imgUrl={data.userImageUrl} size={40}></UserImage>
            ) : (
              <Icon iconType={data.type} />
            )}
          </>
        )}
      </S.LeftLayout>
      <S.CenterLayout>
        <S.TitleText>{data.body}</S.TitleText>
        <S.TimeText>{formatUpdatedAt(data.cratedAt)}</S.TimeText>
      </S.CenterLayout>
      {hasPreviewImg && data.images.length > 0 && (
        <S.RightLayout>
          {sortedList.length > 1 ? (
            sortedList.map((vote) => {
              return (
                <EachVotePhoto
                  key={vote.sortOrder + vote.imgUrl}
                  imgUrl={vote.imgUrl ?? ''}
                ></EachVotePhoto>
              )
            })
          ) : (
            <Photo size={40} borderRadius={4} imgUrl={data.images[0].imgUrl}></Photo>
          )}
        </S.RightLayout>
      )}
    </S.Layout>
  )
}

export default Notification
