import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'

export const UserCardWrapper = styled.div<{ borderRadius?: number }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  width: 9rem;
  padding: 1.25rem 0.8125rem 1rem 0.8125rem;
  background-color: white;
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius * 0.0625}rem` : 'none')};
  .rank {
    position: absolute;
    top: -0.25rem;
    left: 0.75rem;
    z-index: 10;
  }
`
export const UserPhoto = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-color: ${Common.colors.GR300};
`

export const NickNameWrapper = styled.div`
  align-items: center;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  overflow: hidden;
`
export const UserNickName = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
`
