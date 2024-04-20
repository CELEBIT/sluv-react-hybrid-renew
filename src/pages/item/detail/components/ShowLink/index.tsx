import React, { useEffect, useState } from 'react'

interface LinkProps {
  linkUrl: string
  showLink: boolean
  setShowLink: (value: boolean) => void
}

const ShowLink = ({ linkUrl, showLink, setShowLink }: LinkProps) => {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 히스토리 항목 추가
    window.history.pushState({ showLink: true }, '')

    // 뒤로가기 이벤트 리스너
    const handlePopState = (event: PopStateEvent) => {
      // 히스토리에서 뒤로가기가 발생하면 showLink 상태를 토글
      if (event.state && event.state.showLink === true) {
        setShowLink(!showLink)
      }
    }

    window.addEventListener('popstate', handlePopState)

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return <iframe src={linkUrl} style={{ height: '100%', border: 'none' }} />
}

export default ShowLink
