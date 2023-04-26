import React from 'react'

export const ToolTipVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
  setter(true)
  const intervalId = setInterval(() => {
    setter(false)
    clearInterval(intervalId)
  }, 2500)
}
