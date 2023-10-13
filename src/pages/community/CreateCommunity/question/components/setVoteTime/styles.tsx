import styled from '@emotion/styled'
import { DatePickerView } from 'antd-mobile'

export const SetVoteDateTimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 12.8125rem;
  .adm-picker-view {
    width: 85%;
    justify-content: center;
    height: 13.75rem;
  }
`

export const SetVoteDateTimeView = styled(DatePickerView)`
  .adm-picker-view-column {
    max-width: 4.875rem;
    :first-child {
      padding-left: 1.25rem;
    }
    :last-child {
      padding-right: 1.25rem;
    }
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
