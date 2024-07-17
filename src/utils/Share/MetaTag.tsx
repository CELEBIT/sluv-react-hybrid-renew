import { Helmet } from 'react-helmet-async'

interface MetaTagProps {
  title?: string
  description?: string
  imgSrc?: string
  url?: string
}

const DEPLOY_URL = 'https://sluv.co.kr'

export default function MetaTag(props: MetaTagProps) {
  const url = props.url ? `${DEPLOY_URL}${props.url}` : DEPLOY_URL

  return (
    <Helmet>
      <title>{(props.title && `${props.title}`) || '스럽'}</title>
      <meta
        name='description'
        content={props.description || '연예인의 아이템 정보를 공유하는 커뮤니티'}
      />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={props.title || '스럽'} />
      <meta property='og:site_name' content='스럽' />
      <meta
        property='og:description'
        content={props.description || '연예인의 아이템 정보를 공유하는 커뮤니티'}
      />
      <meta property='og:image' content={props.imgSrc || '/public/ogImage.png'} />
      <meta property='og:url' content={url} />
    </Helmet>
  )
}
