import React from 'react'
import { ReactComponent as ScrollToTopButton } from '../../../assets/scrollToTop_40.svg'

interface ScrollToTopButtonProps {
  onClick: () => void
}

const ScrollToTop = ({ onClick }: ScrollToTopButtonProps) => {
  return (
    <ScrollToTopButton
      onClick={onClick}
      style={{
        outline: 0,
        position: 'fixed',
        width: 40,
        height: 40,
        bottom: 74,
        right: 20,
        zIndex: 250,
      }}
    ></ScrollToTopButton>
  )
}

export default ScrollToTop
