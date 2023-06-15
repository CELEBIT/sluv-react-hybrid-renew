import styled from '@emotion/styled'
import { Common } from '../styles'

export const SelectItemOrPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100vw;
  height: 100%;
  margin-left: calc(-50vw + 50%);
`
export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 1.25rem;

  ::-webkit-scrollbar {
    display: none;
  }
  .padding {
    padding: 0 1.25rem;
  }
  .top {
    padding-top: 1.25rem;
  }
  .noGap {
    gap: 0;
  }
`

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .error {
    margin-top: -0.5rem;
    margin-left: 1.25rem;
  }
`

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  flex-grow: 0;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 0.9375rem;
`

export const GalleryButton = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background-color: ${Common.colors.GR200};
  input {
    display: 'none';
  }
`

export const Dimmer = styled.div`
  position: absolute;
  bottom: 5rem;
  height: 1.25rem;
  width: 100%;
  background: linear-gradient(180deg, transparent, #ffffff 100%);
`
