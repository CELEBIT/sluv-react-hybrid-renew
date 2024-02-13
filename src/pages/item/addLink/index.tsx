import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AddInfoContainer } from '../addInfo/styles'
import Header from '../../../components/Header/Header'
import LinkInput, { Link, linksState } from './components/LinkInput/LinkInput'
import { AddLinkContainer } from './styles'
import { urlRegex } from '../../../config/constant'
import { itemInfoState } from '../../../recoil/itemInfo'

const AddLink = () => {
  const navigate = useNavigate()

  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const [links, setLinks] = useRecoilState(linksState)
  const [hasError, setHasError] = useState(false)
  console.log('links', links)
  useEffect(() => {
    if (itemInfo.linkList) setLinks(itemInfo.linkList)
  }, [])

  const handleComplete = (updatedLinks: Link[]) => {
    setLinks(updatedLinks)
    const isLinkNameEmpty = updatedLinks.some((link) => link.linkName === '')
    const isUrlEmpty = updatedLinks.some((link) => link.itemLinkUrl === '')
    const isUrlValid = updatedLinks.every((link) => urlRegex.test(link.itemLinkUrl))

    if (!isLinkNameEmpty && !isUrlEmpty && isUrlValid) {
      setHasError(false)
      setItemInfo({
        ...itemInfo,
        linkList: [...links],
      })
      console.log('링크 완료 후 itemInfo', itemInfo)
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
