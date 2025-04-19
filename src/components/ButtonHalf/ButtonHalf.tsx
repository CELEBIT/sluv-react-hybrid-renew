import { HalfWrapper } from './styles'

interface HalfButtonProps {
  text: string
  type: 'confirm' | 'cancel'
  isbottom?: boolean
  onClick: any
}

const ButtonHalf = ({ text, type, isbottom, onClick }: HalfButtonProps) => {
  return (
    <HalfWrapper type={type} isbottom={isbottom} onClick={onClick}>
      <p>{text}</p>
    </HalfWrapper>
  )
}

export default ButtonHalf
