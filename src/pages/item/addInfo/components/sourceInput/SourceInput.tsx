import React, { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from '@emotion/styled'
import { ReactComponent as Delete } from '../../../../../assets/delete_textfield_24.svg'
import { ReactComponent as Link } from '../../../../../assets/link_add_20.svg'
// import { InputContainer } from '../../../../../components/TextField/DefaultTextfield/styles'
import { Common, Pretendard } from '../../../../../components/styles'
import { infoSourceState } from '../../Atoms/atoms'

const SourceInput = () => {
  const [source, setSource] = useRecoilState(infoSourceState)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const handleInputChange = useMemo(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSource(event.target.value)
    },
    [setSource, source],
  )

  const onDelete = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    setSource('')
  }
  return (
    <InputWrapper onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <div className='linkWrapper'>
        <Link />
      </div>
      <InputField
        value={source}
        placeholder={'출처가 있다면 여기에 남겨주세요'}
        autoFocus={true}
        onChange={handleInputChange}
      ></InputField>
      {source.length !== 0 && isFocused && (
        <Delete
          style={{ marginLeft: '0.625rem' }}
          onClick={onDelete}
          onMouseDown={onDelete}
        ></Delete>
      )}
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  height: 3.5rem;
  width: 100%;
  padding: 1rem 1.25rem;
  .linkWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.375rem;
  }
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
`

export const InputField = styled.input`
  display: inline-flex;
  align-items: center;
  height: 1.25rem;
  width: 100%;
  padding: 0;
  outline: none;
  border: none;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  caret-color: ${Common.colors.GR600};
  ::placeholder {
    ${Pretendard({ size: 15, weight: Common.bold.thin, color: Common.colors.GR400 })}
  }
`

export default SourceInput
