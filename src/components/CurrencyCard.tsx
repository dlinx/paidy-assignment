import { Typography } from "@material-ui/core"
import { ForexToCountry } from "../constants/forexCountryMap"
import { ForexTick } from "../services/usePriceTick"
import { BuyPriceWrapper, CardTitleWrapper, CardWrapper, CountryFlag, Price, PriceWrapper, TradeSectionWrapper } from "./CurrencyCardStyles"

type Props = {
  forexData: ForexTick,
  onCardClick: () => void,
  isExpanded?: boolean
}

export const CurrencyCard: React.FC<Props> = ({ forexData, onCardClick, isExpanded }) => {
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
      {roundNumber(forexData.price)}
    </Price>
    {isExpanded && <TradeSectionWrapper>
      <BuyPriceWrapper>
        <Typography>Buy</Typography>
        <Price>
          {roundNumber(forexData.ask)}
        </Price>
      </BuyPriceWrapper>
      <PriceWrapper>
        <Typography>Sell</Typography>
        <Price>
          {roundNumber(forexData.bid)}
        </Price>
      </PriceWrapper>
    </TradeSectionWrapper>}
  </CardWrapper>
}