import Flex from '../../../components/Flex'
import Header from '../../../components/Header/Header'
import { HeaderWrapper } from '../../user/styles'

import { ReactComponent as Top } from '../../../assets/MainBanner/HowToSluv/TOP.svg'
import { ReactComponent as First } from '../../../assets/MainBanner/HowToSluv/01.svg'
import { ReactComponent as Second } from '../../../assets/MainBanner/HowToSluv/02.svg'
import { ReactComponent as Last } from '../../../assets/MainBanner/HowToSluv/03.svg'

const Guide = () => {
  return (
    <Flex direction='column' style={{ overflowY: 'scroll', width: '100%' }}>
      <HeaderWrapper>
        <Header isModalHeader={false} title='스럽 사용 가이드' hasArrow={true}></Header>
      </HeaderWrapper>
      <Top style={{ height: '100%', width: '100%' }} />
      <Flex
        direction='column'
        align='center'
        justify='center'
        style={{ backgroundColor: '#EEEBE9', height: '100%', width: '100%', padding: '32px 20px' }}
      >
        <First />
        <Second />
        <Last />
      </Flex>
    </Flex>
  )
}

export default Guide
