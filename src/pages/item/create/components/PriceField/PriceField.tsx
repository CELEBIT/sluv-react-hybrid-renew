import React, { useState, useMemo } from 'react'
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
import { addCommas, formatPrice, sanitizePriceInput } from './price.util'
import { MAX_INT } from '../../../../../config/constant'

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
  const [stringPrice, setStringPrice] = useRecoilState(stringPriceState)
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const displayText = useMemo(() => {
    return formatPrice(itemPrice)
  }, [itemPrice])

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(sanitizePriceInput(e.target.value))
    if (!isNaN(value) && value <= MAX_INT) {
      if (value > 0) setStringPrice(addCommas(sanitizePriceInput(e.target.value)))
      setItemPrice(value)
    } else if (value > MAX_INT) {
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
      setStringPrice('')
    } else if (itemPrice === -1) {
      setItemPrice(0)
      setStringPrice('')
    } else {
      setItemPrice(-1)
    }
  }

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
        {!itemPrice ? (
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
            isVisible={infoVisible}
          >
            가격 변동이 있어 <br />
            ‘평균 가격대’로 표시돼요
          </ToolTip>
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