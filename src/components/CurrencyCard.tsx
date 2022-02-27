import { Typography } from "@material-ui/core"
import { ForexToCountry } from "../constants/forexCountryMap"
import { ForexTick } from "../services/usePriceTick"
import { BuyPriceWrapper, CardTitleWrapper, CardWrapper, CountryFlag, Price, PriceWrapper, TradeSectionWrapper } from "./CurrencyCardStyles"

type Props = {
  forexData: ForexTick,
  onCardClick: () => void,
  isExpanded?: boolean
  convertAmount: number
}

export const CurrencyCard: React.FC<Props> = ({ forexData, onCardClick, isExpanded, convertAmount }) => {
  const roundNumber = (n: number) => {
    return n.toFixed(3)
  }
  return <CardWrapper className={isExpanded ? 'active' : ''} onClick={() => onCardClick()} square >
    <CardTitleWrapper>
      <CountryFlag
        className={`fi fi-${ForexToCountry[forexData.to].flagId}`} />
      <Typography>{forexData.to}</Typography>
    </CardTitleWrapper>
    <Price>
      {(roundNumber(forexData.price * convertAmount))}
    </Price>
    {isExpanded && <TradeSectionWrapper>
      <BuyPriceWrapper>
        <Typography>Buy</Typography>
        <Price>
          {roundNumber(forexData.ask * convertAmount)}
        </Price>
      </BuyPriceWrapper>
      <PriceWrapper>
        <Typography>Sell</Typography>
        <Price>
          {roundNumber(forexData.bid * convertAmount)}
        </Price>
      </PriceWrapper>
    </TradeSectionWrapper>}
  </CardWrapper>
}