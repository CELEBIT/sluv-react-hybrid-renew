import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../components/styles'

export const HotItemWrap = styled.div`
  display: grid;
  gap: 0.1875rem;
  height: 31.5rem;
  padding: 0 1.25rem 1.25rem 1.25rem;

  overflow: hidden;
  overflow-x: scroll;
  grid-template-columns: repeat(12, minmax(10.375rem, auto));
  grid-template-rows: 1fr 1fr 1fr;
  ::-webkit-scrollbar-corner {
    height: 1.25rem;
  }
  /* box-sizing: border-box; */
  ::-webkit-scrollbar {
    margin-top: 0.625rem;
    width: 80%;
    height: 4px;
    background-color: #f0f0f0; /* 또는 트랙에 추가한다 */
    bottom: 6.25rem;
    left: 1.25rem;
  }
  ::-webkit-scrollbar-button:start:decrement,
  ::-webkit-scrollbar-button:end:increment {
    height: 1.25rem;
    background-color: white;
  }
  /* 썸(thumb) 추가 */
  ::-webkit-scrollbar-thumb {
    margin-top: 10px;
    width: 38px;
    background: #262626;
    border-radius: 38px;
  }

  > div:nth-of-type(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
    border-radius: 1.25rem 0 0 0;
  }
  > div:nth-of-type(2) {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    border-radius: 0 0 0 1.25rem;
  }
  > div:nth-of-type(3) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
  > div:nth-of-type(4) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  > div:nth-of-type(5) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
  > div:nth-of-type(6) {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
  }
  > div:nth-of-type(7) {
    grid-column: 4 /6;
    grid-row: 2 / 4;
  }
  > div:nth-of-type(8) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }
  > div:nth-of-type(9) {
    grid-column: 5 / 6;
    grid-row: 1 / 2;
  }
  > div:nth-of-type(10) {
    grid-column: 6 / 8;
    grid-row: 1 / 3;
  }
  > div:nth-of-type(11) {
    grid-column: 6 / 7;
    grid-row: 3 / 4;
    /* margin-right: 20px; */
  }
  > div:nth-of-type(12) {
    grid-column: 7 / 8;
    grid-row: 3 / 4;
    /* margin-right: 20px; */
  }
  > div:nth-of-type(13) {
    grid-column: 8 / 9;
    grid-row: 1 / 2;
  }
  > div:nth-of-type(14) {
    grid-column: 8 / 9;
    grid-row: 2 / 3;
  }
  > div:nth-of-type(15) {
    grid-column: 8 / 9;
    grid-row: 3 / 4;
  }
  > div:nth-of-type(16) {
    grid-column: 9 / 11;
    grid-row: 2 / 4;
    /* margin-right: 20px; */
  }
  > div:nth-of-type(17) {
    grid-column: 9 / 10;
    grid-row: 1 / 2;
    /* margin-right: 20px; */
  }
  > div:nth-of-type(18) {
    grid-column: 10 / 11;
    grid-row: 1 / 2;
  }
  > div:nth-of-type(19) {
    grid-column: 11 / 13;
    grid-row: 1 / 3;
    border-radius: 0 1.25rem 0 0;
  }
  > div:nth-of-type(20) {
    grid-column: 11 / 12;
    grid-row: 3 / 4;
  }
  > div:nth-of-type(21) {
    grid-column: 12 / 13;
    grid-row: 3 / 4;
    border-radius: 0 0 1.25rem 0;
  }
`
export const HotItem = styled.div<{ imgUrl: string }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
  align-items: flex-end;
  background-color: grey;
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  padding: 0.75rem 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  .column {
    display: flex;
    flex-direction: column;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .storage {
    flex-shrink: 0;
    z-index: 10;
  }
`
export const HotItemDim = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4000000059604645;
  background: linear-gradient(360deg, #212529 0%, rgba(33, 37, 41, 0) 100%);
`
export const HotItemCeleb = styled.span`
  ${Pretendard({
    size: 17,
    weight: Common.bold.regular,
    color: Common.colors.WH,
  })}
  z-index: 10;
  padding-right: 1.25rem;
  margin-bottom: 0.75rem;
`
export const HotItemText = styled.span`
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.WH,
  })}
  z-index: 10;
  padding-right: 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
export const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 1.125rem;
  padding: 0.75rem 1.25rem;
`

export const Tab = styled.span<{ active: boolean }>`
  ${(props) =>
    props.active
      ? Pretendard({
          size: 17,
          weight: Common.bold.semiBold,
          color: Common.colors.BK,
        })
      : Pretendard({
          size: 17,
          weight: Common.bold.regular,
          color: Common.colors.GR500,
        })};
`
