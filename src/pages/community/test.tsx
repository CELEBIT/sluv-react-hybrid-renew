import React, { ChangeEvent, useState } from 'react'

const YourComponent: React.FC = () => {
  const [firstItem, setFirstItem] = useState<string | null>(null)
  const [secondItem, setSecondItem] = useState<string | null>(null)

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const selectedFiles = Array.from(files)
    const maxItems = 2

    for (let i = 0; i < maxItems; i++) {
      if (selectedFiles[i]) {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (i === 0) {
            setFirstItem(reader.result as string)
          } else if (i === 1) {
            setSecondItem(reader.result as string)
          }
        }
        reader.readAsDataURL(selectedFiles[i])
      } else {
        if (i === 0) {
          setFirstItem(null)
        } else if (i === 1) {
          setSecondItem(null)
        }
      }
    }
  }

  return (
    <div>
      <input type='file' multiple onChange={onChangeImg} />
      {firstItem && (
        <div>
          <h2>First Item</h2>
          <img src={firstItem} alt='First Item Preview' />
        </div>
      )}
      {secondItem && (
        <div>
          <h2>Second Item</h2>
          <img src={secondItem} alt='Second Item Preview' />
        </div>
      )}
    </div>
  )
}

export default YourComponent
