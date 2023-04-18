import styled from '@emotion/styled'
import { DatePickerView } from 'antd-mobile'

export const CustomDatePickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20.9375rem;
  overflow: hidden;
  .adm-picker-view {
    width: 80%;
    justify-content: center;
  }
`

export const CustomDatePickerView = styled(DatePickerView)`
  max-height: 13.75rem;
  .adm-picker-view-column {
    max-width: 4.875rem;
  }

  .adm-picker-view-mask-middle {
    background-color: #dad8d8;
    opacity: 0.3;
    border-radius: 0.625rem;
    width: 100%;
  }

  .adm-picker-view-column-item[data-selected='true'] {
    color: black;
    font-weight: bold;
    margin: 0;
  }
`
