import React, { useState, useMemo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
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
import { createItemPriceState, itemInfoState } from '../../../../../recoil/itemInfo'

const PriceField = () => {
  const [price, setPrice] = useRecoilState(createItemPriceState)
  const [priceUnknown, setPriceUnknown] = useState<boolean>(false)
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const displayText = useMemo(() => formatPrice(price), [price])

  const stringPrice = useMemo(() => {
    if (!price) {
      return undefined
    }
    return addCommas(price.toString())
  }, [price])

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(sanitizePriceInput(e.target.value))
    if (!isNaN(value) && value <= MAX_INT) {
      if (value > 0) {
        setPrice(value)
      }
    } else if (value > MAX_INT) {
      setPrice(MAX_INT)
    }
    if (e.target.value === '') {
      setPrice(null)
    }
  }

  const onClick = () => {
    setPriceUnknown(!priceUnknown)
    if (!price || price > 0) {
      // 모르겠어요로 전환
      setPrice(-1)
    } else if (price === -1) {
      // 모르겠어요 풀기
      setPrice(null)
    }
  }

  useEffect(() => {
    if (price === -1) {
      setPriceUnknown(true)
    }
  }, [price])

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
        {price === null ? (
          <LabelWrapper>
            <span className='valueText'>~ 원&nbsp;</span>
            <span className='labelText'>대로 표시돼요</span>
          </LabelWrapper>
        ) : (
          <>
            {price === -1 ? (
              <LabelWrapper>
                <span className='labelText'>가격이 표시되지 않아요</span>
              </LabelWrapper>
            ) : (
              <LabelWrapper>
                {price >= 500000000 ? (
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
        <div className='Info'>
          <ToolTip
            left='-2.375rem'
            bottom='-0.625rem'
            arrowPosition='bottom-left'
            isVisible={infoVisible}
          >
            가격 변동이 있어 <br />
            ‘평균 가격대’로 표시돼요
          </ToolTip>
          <Info onClick={() => ToolTipVisibility(setInfoVisible)} />
        </div>
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
