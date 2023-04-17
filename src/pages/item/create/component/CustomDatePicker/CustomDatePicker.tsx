import React from 'react'
import { CustomDatePickerView } from './styles'

const CustomDatepicker = () => {
  const now = new Date()
  // const [value, setValue] = useState<Date>(now)
  const onChangeDate = (date: Date) => {
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
    <CustomDatePickerView
      defaultValue={now}
      max={now}
      onChange={onChangeDate}
      renderLabel={labelRenderer}
      style={{ justifyContent: 'center' }}
    />
  )
}

export default CustomDatepicker
