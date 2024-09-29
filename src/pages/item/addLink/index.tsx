import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AddInfoContainer, HeaderWrapper } from '../addInfo/styles'
import Header from '../../../components/Header/Header'
import LinkInput, { linksState } from './components/LinkInput/LinkInput'
import { AddLinkContainer } from './styles'
import { urlRegex } from '../../../config/constant'
import { createItemLinkState, itemInfoState } from '../../../recoil/itemInfo'
import { LinkResult } from '../../../apis/item/itemService.type'

const AddLink = () => {
  const navigate = useNavigate()
  // 완료를 눌렀을 때 최종적으로 아이템 정보 배열에 추가용
  const [linkList, setLinkList] = useRecoilState(createItemLinkState)

  // 페이지 입력 용 state
  const [links, setLinks] = useRecoilState(linksState)
  const [hasError, setHasError] = useState(false)

  const onBackClick = () => {
    setLinks([{ linkName: '', itemLinkUrl: '' }])
    navigate(-1)
  }

  useEffect(() => {
    if (linkList) setLinks(linkList)
  }, [])

  const handleComplete = (updatedLinks: LinkResult[]) => {
    setLinks(updatedLinks)
    const isLinkNameEmpty = updatedLinks.some((link) => link.linkName === '')
    const isUrlEmpty = updatedLinks.some((link) => link.itemLinkUrl === '')
    const isUrlValid = updatedLinks.every((link) => urlRegex.test(link.itemLinkUrl))

    if (!isLinkNameEmpty && !isUrlEmpty && isUrlValid) {
      setHasError(false)
      setLinkList(links)
      navigate(-1)
      return
    } else {
      setHasError(true)
      return
    }
  }
  return (
    <AddInfoContainer>
      <HeaderWrapper>
        <Header
          isModalHeader={false}
          hasArrow={true}
          title={'구매 링크'}
          backBtnClick={onBackClick}
        >
          <span className='submit' onClick={() => handleComplete(links)}>
            완료
          </span>
        </Header>
      </HeaderWrapper>

      <AddLinkContainer>
        <LinkInput hasError={hasError} />
      </AddLinkContainer>
    </AddInfoContainer>
  )
}

export default AddLink
