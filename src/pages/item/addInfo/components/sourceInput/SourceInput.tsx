import React, { useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import styled from '@emotion/styled'
import { ReactComponent as Delete } from '../../../../../assets/delete_textfield_24.svg'
import { ReactComponent as Link } from '../../../../../assets/link_add_20.svg'
import { Common, Pretendard } from '../../../../../components/styles'
import { atomKeys } from '../../../../../config/atomKeys'

export const infoSourceState = atom<string>({
  key: atomKeys.infoSourceState,
  default: '',
})

const SourceInput = () => {
  const [source, setSource] = useRecoilState(infoSourceState)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value)
  }

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
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  width: 100vw;
  border-top: 1px solid ${Common.colors.GR200};
  margin-left: calc(-1.25rem);
  padding: 1.25rem;
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
  width: 90%;
  outline: none;
  border: none;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  caret-color: ${Common.colors.GR600};
  ::placeholder {
    ${Pretendard({ size: 15, weight: Common.bold.thin, color: Common.colors.GR400 })}
  }
`

export default SourceInput
