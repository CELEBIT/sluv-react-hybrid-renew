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
  const [checkedList, setCheckedList] = useRecoilState(deleteNotificationsState)
  const [isChecked, setIsChecked] = useState(checkedList.includes(data.alarmId))
  console.log(checkedList.includes(data.alarmId))

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
  return (
    <S.Layout onClick={() => onClickNotification(data.type)}>
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
        <S.TitleText>
          {data.title}&nbsp;
          {data.body}
        </S.TitleText>
        <S.TimeText>1분 전</S.TimeText>
      </S.CenterLayout>
      {hasPreviewImg && <S.RightLayout></S.RightLayout>}
    </S.Layout>
  )
}

export default Notification