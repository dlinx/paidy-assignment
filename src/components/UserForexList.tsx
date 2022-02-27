import { Card, styled, TextField } from "@material-ui/core";
import { useState } from "react";
import { CurrencyCard } from ".";
import { CURRENCY } from "../constants/currency";
import { ForexListItem, PRESET_CURRENCY } from "../constants/userPreset";
import { ForexTick } from "../services/usePriceTick";
import { AddCurrencyButton } from "./AddCurrencyButton";
import { CurrencyAutoComplete } from "./CurrencyAutocomplete";
import { ForexToCountry } from "../constants/forexCountryMap"

const CurrenciesContainer = styled('div')({
  width: '400px',
  margin: '0',
  display: 'flex',
  flexDirection: 'column'
});
const CurrencyListContainer = styled('div')({
  overflow: 'auto'
});
const ConfigWrapper = styled(Card)({
  display: 'flex',
  padding: '5px'
});

type Props = {
  userForexList: ForexListItem[],
  forexData: {
    [currencyId: string]: ForexTick[]
  },
  userCurrency: CURRENCY,
  onCardClick: (currency: string) => void
  onUserCurrencyChange: (currency: CURRENCY) => void
  onAddTargetCurrency: (currency: CURRENCY) => void
  addToUserForexList: (currency: CURRENCY) => void
}
export const UserForexList: React.FC<Props> = (props) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [convertAmount, setConvertAmount] = useState(ForexToCountry[props.userCurrency].amount);

  const onCardClick = (currency: ForexTick[], i: number) => {
    setExpandedIndex(i);
    props.onCardClick(`${currency[0].to}_${currency[0].from}`)
  }

  const onConvertAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let n = Number(e.target.value)
    if (n < 1) n = 1;
    if (n < 9999999)
      setConvertAmount(n)
  }

  return <CurrenciesContainer>
    <ConfigWrapper square>
      <CurrencyAutoComplete
        onUserCurrencyChange={(currency) => {
          props.onUserCurrencyChange(currency as CURRENCY)
        }}
        options={Object.keys(CURRENCY)}
        width='130px'
        value={props.userCurrency}
        label='Currency'
        disableClearable
      />
      <TextField label="Amount" value={convertAmount}
        style={{ width: '100%' }}
        onChange={(e) => onConvertAmountChange(e)}
        inputProps={{ type: 'number' }}
      />
    </ConfigWrapper>
    <CurrencyListContainer>
      {Object.values(props.forexData)
        .map((currency, i) =>
          <CurrencyCard
            key={currency[0].to}
            forexData={currency[currency.length - 1]}
            onCardClick={() => onCardClick(currency, i)}
            isExpanded={i === expandedIndex}
            convertAmount={convertAmount}
          />)}
      <AddCurrencyButton
        onCurrencySelected={(currency) => props.addToUserForexList(currency)}
        userForexList={props.userForexList}
      />
    </CurrencyListContainer>
  </CurrenciesContainer>
}