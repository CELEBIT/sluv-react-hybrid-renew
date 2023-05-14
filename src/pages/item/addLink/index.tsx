import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AddInfoContainer } from '../addInfo/styles'
import Header from '../../../components/Header/Header'
import LinkInput, { Link, linksState } from './components/LinkInput/LinkInput'
import { AddLinkContainer } from './styles'
import { urlRegex } from '../../../config/constant'

const AddLink = () => {
  const [links, setLinks] = useRecoilState(linksState)
  const [hasError, setHasError] = useState(false)
  const navigate = useNavigate()
  const handleComplete = (updatedLinks: Link[]) => {
    setLinks(updatedLinks)
    const isLinkNameEmpty = links.some((link) => link.linkName === '')
    const isUrlEmpty = links.some((link) => link.url === '')
    const isUrlValid = links.every((link) => urlRegex.test(link.url))
    if (!isLinkNameEmpty && !isUrlEmpty && isUrlValid === true) {
      setHasError(false)
      navigate(-1)
      return
    } else {
      console.log(links)
      setHasError(true)
      return
    }
  }
  return (
    <AddInfoContainer>
      <Header isModalHeader={false} hasArrow={true} title={'구매 링크'}>
        <span className='submit' onClick={() => handleComplete(links)}>
          완료
        </span>
      </Header>
      <AddLinkContainer>
        <LinkInput hasError={hasError} />
      </AddLinkContainer>
    </AddInfoContainer>
  )
}

export default AddLink
