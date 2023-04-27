import React, { useState, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import {
  InputFieldWrapper,
  LabelWrapper,
  PriceFieldWrapper,
  PriceInputField,
  PriceInputWrapper,
  WonText,
} from './styles'
import ButtonSmall from '../../../../../components/ButtonSmall/ButtonSmall'
import { ReactComponent as Info } from '../../../../../assets/info_18.svg'
import { MAX_INT, addCommas, formatPrice, sanitizePriceInput } from './price.util'

export const itemPriceState = atom<number | undefined>({
  key: 'itemPriceState',
  default: 0,
})

const PriceField = () => {
  const [itemPrice, setItemPrice] = useRecoilState(itemPriceState)
  const [priceUnknown, setPriceUnknown] = useState<boolean>(false)
  const [displayText, setDisplayText] = useState<string>('')
  const [stringPrice, setStringPrice] = useState('')

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizePriceInput(e.target.value)
    if (!isNaN(Number(value)) && Number(value) <= MAX_INT) {
      if (Number(value) > 0) setStringPrice(addCommas(value))
      setItemPrice(Number(value))
    } else if (Number(value) > MAX_INT) {
      setStringPrice(addCommas(MAX_INT.toString()))
      setItemPrice(MAX_INT)
    }
    if (e.target.value === '') {
      setStringPrice('')
      setItemPrice(0)
    }
  }

  const onClick = () => {
    setPriceUnknown(!priceUnknown)
    if (itemPrice && itemPrice > 0) {
      setItemPrice(-1)
    } else if (itemPrice === -1) {
      setItemPrice(0)
      setStringPrice('')
    } else {
      setItemPrice(-1)
    }
  }

  useEffect(() => {
    if (itemPrice) {
      setDisplayText(formatPrice(itemPrice))
    }
  }, [itemPrice])

  return (
    <PriceFieldWrapper>
      <PriceInputWrapper>
        <InputFieldWrapper>
          {priceUnknown ? (
            <>
              <span>-&nbsp;</span>
              <WonText>원</WonText>
            </>
          ) : (
            <>
              <PriceInputField
                type='tel'
                inputMode='numeric'
                pattern='[0-9]*'
                placeholder='0'
                min={1}
                max={MAX_INT}
                value={stringPrice}
                onChange={handlePriceChange}
                onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
              />
              <WonText>원</WonText>
            </>
          )}
        </InputFieldWrapper>
        {itemPrice === undefined || itemPrice === 0 ? (
          <LabelWrapper>
            <span className='valueText'>~ 원&nbsp;</span>
            <span className='labelText'>대로 표시돼요</span>
          </LabelWrapper>
        ) : (
          <>
            {itemPrice === -1 ? (
              <LabelWrapper>
                <span className='labelText'>가격이 표시되지 않아요</span>
              </LabelWrapper>
            ) : (
              <LabelWrapper>
                {itemPrice >= 500000000 ? (
                  <>
                    <span className='valueText'>5억원 &nbsp;</span>
                    <span className='labelText'>대 이상으로 표시돼요</span>
                  </>
                ) : (
                  <>
                    <span className='valueText'>{displayText} &nbsp;</span>
                    <span className='labelText'>대로 표시돼요</span>
                  </>
                )}
              </LabelWrapper>
            )}
          </>
        )}
      </PriceInputWrapper>

      <Info />
      {priceUnknown ? (
        <ButtonSmall text='모르겠어요' icon={true} iconName='check' type='sec' onClick={onClick} />
      ) : (
        <ButtonSmall text='모르겠어요' type='pri' onClick={onClick} />
      )}
    </PriceFieldWrapper>
  )
}

export default PriceField
