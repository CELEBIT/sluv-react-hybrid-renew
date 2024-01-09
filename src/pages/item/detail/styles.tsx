import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

interface ColorCircleProps {
  color?: string
}

export const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100vw;
  height: 100%;
  margin-left: calc(-50vw + 50%);
  .headerRight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.25rem;
  }
`

export const ColorCircle = styled.div<ColorCircleProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const BasicInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem 2rem 1.25rem;
`
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`
export const Interactions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 0.25rem;
`

export const Category = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 8px;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })};
`

export const ItemName = styled.span`
  margin-bottom: 0.5rem;
  ${Pretendard({ size: 22, weight: Common.bold.regular, color: Common.colors.BK })}
`
export const ItemReaction = styled.div`
  display: flex;
  margin-top: 1.75rem;
  gap: 0.75rem;
`

export const Reaction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
`

export const Divider = styled.div`
  display: flex;
  width: 100%;
  min-height: 0.5rem;
  padding-left: calc(-50vw+50%);
  background-color: ${Common.colors.GR100};
  box-sizing: content-box;
`

export const LinkInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.25rem;
  gap: 1rem;
`
export const Link = styled.div`
  display: flex;
  width: 100%;
  .linkinfo {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.5rem;
  }
  span {
    ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
`
export const UploaderInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.75rem 1.25rem;
  .user {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    overflow: hidden;
    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
    }
  }
`

export const UserImg = styled.div<{ imgUrl: string | undefined }>`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6.25rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`
export const AdditionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.25rem 0.5rem 1.25rem;
  padding: 1rem;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  line-height: 1.5625rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.thin, color: Common.colors.BK })}
  }
`

export const HashTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  overflow-x: scroll;
  padding: 0 1.25rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const SourceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${Common.colors.GR200};
  padding: 1.25rem;

  .label {
    margin-left: 0.25rem;
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR400 })}
  }

  .source {
    margin-left: 0.25rem;
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
`

export const WrongInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: ${Common.colors.BG};
  padding: 1.4375rem 1.25rem;
  align-items: center;
  .info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.PRI })}
  }
`

export const RecommendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0;
  gap: 2.5rem;
`

export const ShareItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${Common.colors.GR100};
  padding: 3rem 0;
  gap: 1.5rem;

  span {
    ${Pretendard({ size: 15, weight: Common.bold.thin, color: Common.colors.GR600 })}
  }
`
export const ShareWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`
