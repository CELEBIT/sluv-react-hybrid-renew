import React, { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { urlRegex } from '../../../../../config/constant'
import ButtonSmall from '../../../../../components/ButtonSmall/ButtonSmall'
import DisplayField from '../../../../../components/TextField/DisplayField/DisplayField'
import Input from '../../../../../components/TextField/Input/Input'
import { LinkContianer, LinkWrapper } from './styles'
import { ReactComponent as DeleteList } from '../../../../../assets/delete_list_24.svg'

import { ErrorText } from '../../../../../components/TextField/DefaultTextfield/styles'
import { atomKeys } from '../../../../../config/atomKeys'
import { LinkResult } from '../../../../../apis/item/itemService.type'

export const linksState = atom<LinkResult[]>({
  key: atomKeys.linksState,
  default: [{ linkName: '', itemLinkUrl: '' }],
})

interface LinkInputProps {
  hasError: boolean
}

const LinkInput = ({ hasError }: LinkInputProps) => {
  const [links, setLinks] = useRecoilState(linksState)
  const [linkAddValid, setLinkAddValid] = useState(true)
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(null)
  const handleAddLink = () => {
    const isLinkNameEmpty = links.some((link) => link.linkName === '')
    const isUrlEmpty = links.some((link) => link.itemLinkUrl === '')
    const isUrlValid = links.every((link) => urlRegex.test(link.itemLinkUrl))
    if (isLinkNameEmpty || isUrlEmpty || isUrlValid == false) {
      setLinkAddValid(false)
      return
    }

    if (links.length < 3) {
      setLinks([...links, { linkName: '', itemLinkUrl: '' }])
    }
    setLinkAddValid(true)
  }

  const handleRemoveLink = (index: number) => {
    const updatedLinks = [...links]
    updatedLinks.splice(index, 1)
    setLinks(updatedLinks)
  }
  const handleRemoveData = () => {
    setLinks([{ linkName: '', itemLinkUrl: '' }])
  }
  const handleLinkChange = (index: number, field: keyof LinkResult, value: string) => {
    setLinks((prevLinks) => {
      const updatedLinks = [...prevLinks]
      const updatedLink = { ...updatedLinks[index], [field]: value }
      updatedLinks[index] = updatedLink
      console.log(updatedLinks[index])
      return updatedLinks
    })
  }
  useEffect(() => {
    if (hasError) {
      setLinkAddValid(true)
    }
  }, [hasError])

  return (
    <LinkContianer>
      {links.map((link, index) => (
        <div key={index}>
          <LinkWrapper
            hasButtonSmall={index == links.length - 1}
            onFocus={() => setFocusedInputIndex(index)}
            onBlur={() => setFocusedInputIndex(null)}
          >
            {link.linkName && links.length === 1 && index !== focusedInputIndex && (
              <div className='delete'>
                <DeleteList onClick={() => handleRemoveData()}></DeleteList>
              </div>
            )}
            {links.length !== 1 && index !== focusedInputIndex && (
              <div className='delete'>
                <DeleteList onClick={() => handleRemoveLink(index)}></DeleteList>
              </div>
            )}
            <DisplayField>
              <Input
                value={link.linkName}
                onChange={(value) => handleLinkChange(index, 'linkName', value)}
                onDelete={() => handleLinkChange(index, 'linkName', '')}
                placeholder='링크 이름을 입력해 주세요'
              />
              <Input
                value={link.itemLinkUrl}
                onChange={(value) => handleLinkChange(index, 'itemLinkUrl', value)}
                onDelete={() => handleLinkChange(index, 'itemLinkUrl', '')}
                placeholder='구매 URL을 입력해 주세요'
              />
            </DisplayField>
            {link.itemLinkUrl !== '' && urlRegex.test(link.itemLinkUrl) == false && (
              <ErrorText>구매 URL 정보를 명확하게 입력해주세요</ErrorText>
            )}
            {linkAddValid == false && (!link.linkName || !link.itemLinkUrl) && (
              <ErrorText>구매 링크 정보를 모두 입력해야 추가할 수 있어요</ErrorText>
            )}
            {hasError && (
              <>
                {!link.linkName && !link.itemLinkUrl ? (
                  <ErrorText>구매 링크를 입력해주세요</ErrorText>
                ) : (
                  <>
                    {!link.linkName && link.itemLinkUrl ? (
                      <ErrorText>링크 이름을 입력해주세요</ErrorText>
                    ) : (
                      <>
                        {link.linkName && !link.itemLinkUrl && (
                          <ErrorText>구매 URL을 입력해주세요</ErrorText>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </LinkWrapper>
        </div>
      ))}

      {links.length < 3 && (
        <div className='buttonWrapper'>
          <ButtonSmall
            type='pri'
            icon={true}
            iconName='add'
            text={`링크추가 ${3 - links.length}`}
            onClick={handleAddLink}
          />
        </div>
      )}
    </LinkContianer>
  )
}

export default LinkInput
