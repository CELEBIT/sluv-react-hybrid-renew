import Flex from '../../../components/Flex'
import Header from '../../../components/Header/Header'
import { HeaderWrapper } from '../../user/styles'

import { ReactComponent as Top } from '../../../assets/MainBanner/HowToSluv/TOP.svg'
import { ReactComponent as First } from '../../../assets/MainBanner/HowToSluv/01.svg'
import { ReactComponent as Second } from '../../../assets/MainBanner/HowToSluv/02.svg'
import { ReactComponent as Last } from '../../../assets/MainBanner/HowToSluv/03.svg'
import ButtonLarge from '../../../components/ButtonLarge/ButtonLarge'
import { useNavigate } from 'react-router-dom'

const Guide = () => {
  const navigate = useNavigate()
  return (
    <Flex direction='column' style={{ height: '100vh', backgroundColor: '#EEEBE9' }}>
      <HeaderWrapper style={{ backgroundColor: 'white' }}>
        <Header isModalHeader={false} title='스럽 사용 가이드' hasArrow={true}></Header>
      </HeaderWrapper>
      <Flex direction='column' style={{ overflowY: 'scroll', width: '100%' }}>
        <div>
          <Top style={{ width: '100%', height: '100%' }} />
        </div>
        <Flex
          direction='column'
          justify='center'
          style={{
            padding: '2rem 1.25rem 3.75rem 1.25rem',
            width: '100%',
            gap: '1.5rem',
          }}
        >
          <First style={{ width: '100%', height: '100%' }} />
          <Second style={{ width: '100%', height: '100%' }} />
          <Last style={{ width: '100%', height: '100%', marginBottom: '0.5rem' }} />
          <ButtonLarge
            text='정보 공유하러 가기'
            active={true}
            color='BK'
            onClick={() => navigate('/item/create')}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Guide
