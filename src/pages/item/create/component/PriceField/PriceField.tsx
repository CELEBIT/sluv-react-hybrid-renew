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
import ToolTip from '../../../../../components/ToolTip/ToolTip'
import { ToolTipVisibility } from '../../../../../components/ToolTip/ToolTip.util'

const MAX_INT = 2147483647

export const itemPriceState = atom<number | undefined>({
  key: 'itemPriceState',
  default: 0,
})

export const stringPriceState = atom<string>({
  key: 'stringPriceState',
  default: '',
})

const PriceField = () => {
  const [itemPrice, setItemPrice] = useRecoilState(itemPriceState)
  const [priceUnknown, setPriceUnknown] = useState<boolean>(false)
  const [displayText, setDisplayText] = useState<string>('')
  const [stringPrice, setStringPrice] = useRecoilState(stringPriceState)
  const [infoVisible, setInfoVisible] = useState<boolean>(false)

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '')
    if (!isNaN(Number(value)) && Number(value) <= MAX_INT) {
      if (Number(value) > 0) setStringPrice(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      setItemPrice(Number(value))
    } else if (Number(value) > MAX_INT) {
      setStringPrice(MAX_INT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      setItemPrice(MAX_INT)
    }
    if (e.target.value === '') {
      setStringPrice('')
      setItemPrice(0)
    }
    console.log(itemPrice)
  }
  const formatPrice = (price: number | undefined) => {
    if (!price) {
      return '-'
    }
    if (price < 1000) {
      return `${price.toLocaleString()}원`
    } else if (price < 10000) {
      const amount = Math.floor(price / 1000)
      return `${amount.toLocaleString()}천원`
    } else if (price < 100000000) {
      const amount = Math.floor(price / 10000)
      return `${amount.toLocaleString()}만원`
    } else if (price < 1000000000) {
      const tenMillionWon = Math.floor((price % 100000000) / 10000000)
      const billionWon = Math.floor(price / 100000000)
      const tenMillionWonText = tenMillionWon > 0 ? `${tenMillionWon}천만` : ''
      const billionWonText = `${billionWon}억`
      return `${billionWonText} ${tenMillionWonText}원`
    } else {
      const amount = Math.floor(price / 100000000)
      return `${amount.toLocaleString()}억원`
    }
  }

  const onClick = () => {
    setPriceUnknown(!priceUnknown)
    if (itemPrice && itemPrice > 0) {
      setItemPrice(-1)
      setStringPrice('')
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
      {!priceUnknown && (
        <>
          <Info onClick={() => ToolTipVisibility(setInfoVisible)} />
          <ToolTip
            x={'-3.0625rem'}
            y={'-4.375rem'}
            arrowPosition='bottom-left'
            text='가격 변동이 있어 
‘평균 가격대’로 표시돼요'
            isVisible={infoVisible}
          />
        </>
      )}

      {priceUnknown ? (
        <ButtonSmall text='모르겠어요' icon={true} iconName='check' type='sec' onClick={onClick} />
      ) : (
        <ButtonSmall text='모르겠어요' type='pri' onClick={onClick} />
      )}
    </PriceFieldWrapper>
  )
}

export default PriceField
