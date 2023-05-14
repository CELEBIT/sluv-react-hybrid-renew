import styled from '@emotion/styled'

export const LinkWrapper = styled.div<{ hasButtonSmall?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${({ hasButtonSmall }) => (hasButtonSmall ? '1rem' : '1.25rem')};
  .delete {
    position: absolute;
    top: -0.625rem;
    right: -0.625rem;
  }
`
export const LinkContianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .buttonWrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`
