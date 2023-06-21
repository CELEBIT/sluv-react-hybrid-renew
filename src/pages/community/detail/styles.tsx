import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 100%;
  background-color: white;
  padding-bottom: 2rem;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5rem;
  gap: 1rem;
  padding: 0 1.25rem 1.5rem 1.25rem;
  .title {
    padding: 0 0.25rem;
    ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
  }
  .content {
    padding: 0 0.25rem;
    ${Pretendard({ size: 15, weight: Common.bold.thin, color: Common.colors.BK })}
  }
`
export const InfoChip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 0.375rem;
`

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`
export const ProfileImg = styled.div<{ url: string | undefined }>`
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  background-color: grey;
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
export const UserTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
  max-width: 100%;
  .username {
    ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.BK })}
  }
  .time {
    ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
  }
`

export const InfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: red;
  white-space: pre-wrap;
`
export const CommunityContent = styled.div`
  width: 100%;
  min-height: 15.1875rem;
  margin-bottom: 0.5rem;
`

export const InteractionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .left {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }
`

export const RecommendListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  .title {
    padding: 0 1.25rem;
    ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
  }
`

export const Recommend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 6.75rem;
  padding: 0.75rem 1.5rem 1rem 1.5rem;
  gap: 0.625rem;
  text-overflow: ellipsis;
`
export const RecommendInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .category {
    margin-top: 0.375rem;
    ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.YL })}
  }
  .questionTitle {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
    line-height: 1.4375rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit the number of lines to display */
    -webkit-box-orient: vertical; /* Set the text to flow vertically */
  }
`

export const RecommendPhoto = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  background-color: grey;
  border-radius: 0.5rem;
`

export const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${Common.colors.GR200};
`
export const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 56px;
  z-index: 100;
  gap: 1.5625rem;
  border-top: 1px solid ${Common.colors.GR300};
  box-sizing: border-box;
  background-color: white;
  padding: 0.75rem 1.125rem 0.75rem 1.25rem;
`
