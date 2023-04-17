import React from 'react'
import { CustomDatePickerWrapper, CustomDatePickerView } from './styles'

interface DatePickerProps {
  value: Date
  setValue: React.Dispatch<React.SetStateAction<Date>>
}

const CustomDatepicker = ({ value, setValue }: DatePickerProps) => {
  const now = new Date()
  const onChangeDate = (date: Date) => {
    setValue(date)
    console.log(date)
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
        defaultValue={now}
        max={now}
        value={value}
        onChange={onChangeDate}
        renderLabel={labelRenderer}
        style={{ justifyContent: 'center', width: '80%' }}
      />
    </CustomDatePickerWrapper>
  )
}

export default CustomDatepicker
