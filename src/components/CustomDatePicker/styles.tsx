import styled from '@emotion/styled'
import { DatePickerView } from 'antd-mobile'

export const CustomDatePickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 12.8125rem;
  .adm-picker-view {
    width: 80%;
    justify-content: center;
    height: 13.75rem;
  }
`

export const CustomDatePickerView = styled(DatePickerView)`
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
