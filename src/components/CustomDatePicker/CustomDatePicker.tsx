import React from 'react'
import { CustomDatePickerWrapper, CustomDatePickerView } from './styles'
import { SetterOrUpdater } from 'recoil'

interface CustomDatepickerProps {
  date: Date | undefined
  setDate: SetterOrUpdater<Date | undefined>
}

const CustomDatepicker = ({ date, setDate }: CustomDatepickerProps) => {
  const today = new Date()
  const onChangeDate = (date: Date) => {
    const UTCDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    setDate(UTCDate)
  }
  const labelRenderer = (type: string, data: number) => {
    switch (type) {
      case 'year':
        return data + '년'
      case 'month':
        return data + '월'
      case 'day':
        return data + '일'
      default:
        return data
    }
  }
  return (
    <CustomDatePickerWrapper>
      <CustomDatePickerView
        defaultValue={today}
        max={today}
        value={date}
        onChange={onChangeDate}
        renderLabel={labelRenderer}
      />
    </CustomDatePickerWrapper>
  )
}

export default CustomDatepicker
