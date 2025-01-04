import { useNavigate, useParams } from 'react-router-dom'
import { ContentFullContainer, HeaderWrapper, PageContainer } from '../../user/styles'
import Header from '../../../components/Header/Header'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import * as S from './styles'
import Photo from '../../../components/AddPhotos/Photo'
import { CelebName, Name } from '../../../components/RecommendedItem/Item'
import { openLink } from '../../../utils/utility'
import ButtonLarge from '../../../components/ButtonLarge/ButtonLarge'

const EditRequestDetail = () => {
  const { id: editItemReqId } = useParams()
  const { getEditItemRequest } = useItemDetailQuery()
  const { data } = getEditItemRequest(Number(editItemReqId))
  const navigate = useNavigate()

  if (data) console.log(data)

  const content = data?.content
  const { itemId, imgUrl, brandName, itemName, celebName, scrapStatus } = data?.itemSimpleDto ?? {
    itemId: 0,
    imgUrl: '',
    brandName: '',
    itemName: '',
    celebName: '',
    scrapStatus: false,
  }

  const convertUrlsToLinks = (text: string): (string | JSX.Element)[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <S.StyledLink key={index} onClick={() => onClickOpenLink(part)}>
            {part}
          </S.StyledLink>
        )
      }
      return part
    })
  }

  const onClickOpenLink = (link: string) => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      if (link.includes('http://') || link.includes('https://')) {
        openLink(link)
      } else {
        openLink('http://' + link)
      }
    } else {
      if (link.includes('http://') || link.includes('https://')) {
        window.open(link, '_blank')
      } else {
        window.open(`http:// + ${link}`, '_blank')
      }
    }
  }

  const onClickItem = () => {
    navigate(`/item/detail/${itemId}`)
  }

  const onClickEdit = () => {
    navigate(`/item/edit/${itemId}`)
  }

  return (
    <PageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        <S.EditItemInfo onClick={onClickItem}>
          <Photo
            itemId={itemId}
            size={87}
            borderRadius={8}
            imgUrl={imgUrl}
            storageFlag={scrapStatus}
          ></Photo>
          <div className='infoText'>
            <CelebName>{celebName}</CelebName>
            <div className='itemInfoText'>
              <Name>{brandName}</Name>
              <Name>{itemName}</Name>
            </div>
          </div>
        </S.EditItemInfo>
        <S.RequestContentWrapper>
          <S.RequestContent>
            <S.ContentTitle>정보 수정이 필요해요</S.ContentTitle>
            <S.Content>{content && convertUrlsToLinks(content)}</S.Content>
          </S.RequestContent>
          <ButtonLarge text='정보 수정하기' active={true} onClick={onClickEdit}></ButtonLarge>
        </S.RequestContentWrapper>
      </ContentFullContainer>
    </PageContainer>
  )
}

export default EditRequestDetail
