import React from 'react'

export const ToolTipVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
  setter(true)
  setTimeout(() => {
    setter(false)
  }, 2500)
}
