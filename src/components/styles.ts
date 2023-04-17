import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface IPretendard {
  size: number
  weight: number
  color: string
  lineHeight?: number
  letterSpacing?: 0 | 4 | 6
}

const GalaxyFold3DeviceSize = 320
const GalaxyDeviceSize = 360
const StandardSize = 380
const iPhone12DeviceSize = 390
const iPhone12ProMaxDeviceSize = 430
export const supportDeviceSize = 1080

export const reset = css`
  html {
    @media all and (max-width: ${GalaxyFold3DeviceSize}px) {
      font-size: 15px;
    }
    @media all and (min-width: ${GalaxyFold3DeviceSize +
      1}px) and (max-width: ${GalaxyDeviceSize}px) {
      font-size: 15.5px;
    }
    @media all and (min-width: ${GalaxyDeviceSize + 1}px) and (max-width: ${StandardSize}px) {
      font-size: 16px;
    }
    @media all and (min-width: ${StandardSize + 1}px) and (max-width: ${iPhone12DeviceSize}px) {
      font-size: 17px;
    }
    @media all and (min-width: ${iPhone12DeviceSize +
      1}px) and (max-width: ${iPhone12ProMaxDeviceSize}px) {
      font-size: 18px;
    }
    @media all and (min-width: ${iPhone12ProMaxDeviceSize + 1}px) {
      font-size: 19px;
    }
  }

  body {
    background: gray;
    margin: 0;
    padding: 0;
    font-family: -apple-system, sans-serif, Roboto;

    // outline:0; // 기본 outline 스타일을 제거
    // appearance:none; // HTML 폼 요소(button, checkbox, radio, select 등)의 기본 스타일을 제거
    // border:0; // 기본 테두리(border) 스타일을 제거

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none; // 클릭이나 드래그로 텍스트 선택 불가

    -webkit-tap-highlight-color: transparent; // 모바일 기기에서 터치 이벤트 발생 시, 해당 요소 주위에 나타나는 하이라이트 색상을 투명색으로 지정

    * {
      box-sizing: border-box;
    }
  }
`

export const Common = {
  colors: {
    PRI: '#5E2AB9',
    SEC: '#6C47FF',
    COMPLETE: '#454381',
    BG: '#F8F6FF',
    LINE: '#5E2AB9',

    BK: '#212529',
    GR600: '#7B8894',
    GR500: '#AEB5BC',
    GR400: '#D6D8DA',
    GR300: '#C7CED4',
    GR200: '#EAECEF',
    GR100: '#F4F5F6',

    ERROR: '#FA5252',
  },
  bold: {
    regular: 500,
    semiBold: 600,
    bold: 700,
  },
} as const

export const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 800px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  overflow: hidden;
`

export const Pretendard = (props: IPretendard) => css`
  font-family: 'Pretendard';
  font-size: ${props.size * 0.0625}rem;
  font-weight: ${props.weight};
  color: ${props.color};
`
