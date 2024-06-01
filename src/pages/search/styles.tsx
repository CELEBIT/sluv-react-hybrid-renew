import styled from '@emotion/styled'

// Search
export const SearchPageStyle = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  padding-left: 0;
  padding-bottom: 2rem;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
`

export const HeaderWrap = styled.div`
  padding: 0 1.25rem;
  margin-bottom: 1rem;
`

// SearchResult
export const SearchResultPageStyle = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-left: 0;
  padding-bottom: 2rem;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
`
