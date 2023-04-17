import styled from 'styled-components'
import { DatePickerView } from 'antd-mobile'

export const CustomDatePickerView = styled(DatePickerView)`
  .adm-picker-view-column {
    max-width: 4.875rem;
  }
  .adm-picker-view-mask-middle {
    background-color: #dad8d8;
    opacity: 0.3;
    border-radius: 0.625rem;
  }

  .adm-picker-view-column-item[data-selected='true'] {
    color: black;
    font-weight: bold;
    margin: 0;
  }
`
