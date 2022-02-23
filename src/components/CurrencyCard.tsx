import { Card, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core"
import { useState } from "react"
import { ForexToCountry } from "../constants/forexCountryMap"
import { ForexTick } from "../services/usePriceTick"

type Props = {
  forexData: ForexTick,
  onCardClick: () => void,
  isExpanded?: boolean
}
const CardWrapper = styled(Card)({
  margin: '5px 0',
  padding: '5px',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    background: '#e2eefe'
  },
  '&.active': {
    backgroundColor: '#3b8cff',
    color:'#FFF'
  },
  '&.active::before': {
    display: 'block',
    content: "' '",
    position: 'absolute',
    backgroundColor: "#3b8cff",
    top: 0,
    left: '-5px',
    bottom: 0,
    width: '5px'
  }
});

const Price = styled(Typography)({
  fontSize: '25px',
  textAlign: 'center'
});

const TradeSectionWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  textAlign: 'center',
  backgroundColor: 'lightGray',
  color: '#000',
  paddingTop: '10px',
  margin: '-5px',
  marginTop: '5px'
})

export const CurrencyCard: React.FC<Props> = ({ forexData, onCardClick, isExpanded }) => {
  const roundNumber = (n: number) => {
    return n.toFixed(3)
  }
  return <CardWrapper className={isExpanded ? 'active' : ''} onClick={() => onCardClick()} square >
    <div style={{
      padding: '10px 0',
      textAlign: 'center'
    }}>
      <span
        className={`fi fi-${ForexToCountry[forexData.to].flagId}`}
        style={{
          marginRight: '10px'
        }} />
      <span>{forexData.to}</span>
    </div>
    <Price>
      {roundNumber(forexData.price)}
    </Price>
    {isExpanded && <TradeSectionWrapper>
      <div style={{ borderRight: '1px solid gray', width: '100%' }}>
        <div>Buy</div>
        <Price>
          {roundNumber(forexData.ask)}
        </Price>
      </div>
      <div style={{ width: '100%' }}>
        <div>Sell</div>
        <Price>
          {roundNumber(forexData.bid)}
        </Price>
      </div>
    </TradeSectionWrapper>}
  </CardWrapper>
}