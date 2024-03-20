import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../../components/styles'

export const TwoItemUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${Common.colors.GR200};
`
export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem 0.5rem 0 0;
  gap: 0.1875rem;
  align-items: center;
  width: 100%;
  height: 10.4375rem;

  .left {
    border-radius: 0.5rem 0 0 0;
  }
  .right {
    border-radius: 0 0.5rem 0 0;
  }
`
export const DefaultImageField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  height: 10.4375rem;
  background-color: ${Common.colors.GR100};
  border-radius: 0.5rem 0.5rem 0 0;
  border-bottom: 1px solid ${Common.colors.GR200};
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
`
export const ImageField = styled.div<{ imgUrl: string | null | undefined }>`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${Common.colors.GR100};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`
export const ItemNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0.5rem 0.5rem;
  width: 100%;
  height: 3.5rem;
  overflow: hidden;

  .left {
    border-radius: 0 0 0 0.5rem;
  }
  .right {
    border-radius: 0 0 0.5rem 0;
  }
  .divider {
    width: 1px;
    height: 100%;
    border-right: 1px solid ${Common.colors.GR200};
  }
`
export const ItemName = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const Description = styled.div`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.WH })}
`
