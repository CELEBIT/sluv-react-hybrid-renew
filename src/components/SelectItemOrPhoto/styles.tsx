import styled from '@emotion/styled'
import { Common } from '../styles'

export const SelectItemOrPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding-left: 0;
  background-color: white;
  padding-bottom: 2rem;

  ::-webkit-scrollbar {
    display: none;
  }
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
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  flex-grow: 0;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 0.9375rem;
  background-color: white;
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
