import React from 'react'
// import { modals } from '../../../components/Modals'
// import useModals from '../../../components/Modals/hooks/useModals'
import CustomDatePicker from './component/CustomDatePicker/CustomDatePicker'

const ItemCreate = () => {
  // const { openModal } = useModals()

  // const test = () => {
  //   console.log('test')
  //   openModal(modals.AskRecentPostWritingModal, {})
  // }

  // const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // const handleDateChange = (date: Date) => {
  //   setSelectedDate(date)
  // }
  return (
    <div
      style={{
        display: 'flex',
        width: '18.75rem',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.25rem',
      }}
    >
      <CustomDatePicker />
    </div>
  )
}

export default ItemCreate
