import { Button, Card, styled, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { CurrencyCard } from ".";
import { CURRENCY } from "../constants/currency";
import { ForexListItem } from "../constants/userPreset";
import { ForexTick } from "../services/usePriceTick";
import AddIcon from '@mui/icons-material/Add';

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
const AddButtonContainer = styled('div')({
  marginTop: '20px',
  textAlign: 'center'
})
type Props = {
  userForexList: ForexListItem[],
  forexData: {
    [currencyId: string]: ForexTick[]
  },
  onCardClick: (currency: string) => void
}
export const UserForexList: React.FC<Props> = (props) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const onCardClick = (currency: ForexTick[], i: number) => {
    setExpandedIndex(i);
    props.onCardClick(`${currency[0].to}_${currency[0].from}`)
  }
  return <CurrenciesContainer>
    <ConfigWrapper square>
      <Autocomplete
        id="combo-box-demo"
        options={Object.keys(CURRENCY)}
        getOptionLabel={(option) => option}
        style={{ width: '130px' }}
        renderInput={(params) =>
          <TextField {...params} label="Currency" />}
        defaultValue='JPY'
        disableClearable
      />
      <TextField label="Amount" value={1} />
    </ConfigWrapper>
    <CurrencyListContainer>
      {Object.values(props.forexData)
        .map((currency, i) =>
          <CurrencyCard
            key={currency[0].to}
            forexData={currency[currency.length - 1]}
            onCardClick={() => onCardClick(currency, i)}
            isExpanded={i === expandedIndex}
          />)}
      <AddButtonContainer>
        <Button variant="text" color="primary" size="large" startIcon={<AddIcon />}>Text</Button>
      </AddButtonContainer>
    </CurrencyListContainer>
  </CurrenciesContainer>
}