import styled from '@emotion/styled'
import { css } from '@emotion/react'
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

export const CommunityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-bottom: 0.5rem;
  gap: 1.25rem;
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

export const RecommendContainer = styled.div<{ detail?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.detail ? '0.5rem' : '0')};
  padding-bottom: 1rem;
`

export const Recommend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 5rem;
  padding: 0.75rem 1.5rem 0 1.5rem;
  gap: 0.625rem;
  text-overflow: ellipsis;
`
export const RecommendInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .questionTitle {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
    line-height: 1.4375rem;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0.625rem;
    -webkit-line-clamp: 2; /* Limit the number of lines to display */
    -webkit-box-orient: vertical; /* Set the text to flow vertically */
  }
`

export const InfoTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1.25rem;
`
export const DetailLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.375rem;
`

export const DetailNickname = styled.span`
  ${Pretendard({ size: 12, weight: Common.bold.thin, color: Common.colors.GR600 })}
`

export const DetailRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.625rem;
`

export const DetailEach = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  ${Pretendard({ size: 13, weight: Common.bold.regular, color: Common.colors.GR600 })}
`

export const Category = styled.div<{ color: string }>`
  margin-top: 0.375rem;
  ${({ color }) => {
    if (color === 'yellow') {
      return Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.YL })
    } else if (color === 'green') {
      return Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GRN })
    } else if (color === 'blue') {
      return Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.BL })
    } else if (color === 'pink') {
      return Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.PK })
    } else if (color === 'grey') {
      return Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })
    } else {
      return Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.BK })
    }
  }}
`

export const RecommendPhoto = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  background-color: grey;
  border-radius: 0.5rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`

export const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${Common.colors.GR200};
`

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: white;
  border-top: 1px solid ${Common.colors.GR300};
`
export const RecommendChipWrapper = styled.div`
  display: flex;
  padding: 0.75rem 1.25rem 0 1.25rem;
  border-top: 1px solid ${Common.colors.GR300};
`

export const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  gap: 1.5625rem;
  box-sizing: border-box;
  background-color: white;
  padding: 0.75rem 1.125rem 0.75rem 1.25rem;
`

export const RecommendVote = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  gap: 0.125rem;
  border-radius: 0.5rem;
  overflow: hidden;
`

export const EachVotePhoto = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  width: 50%;
  height: 100%;
  background-color: grey;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`

export const FindItemButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1.0625rem;
  background-color: ${Common.colors.BG};
  border-radius: 0.75rem;
  border: 1px solid #e5e0f6;
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.PRI })}
`
