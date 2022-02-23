import { Card, styled, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { CurrencyCard } from ".";
import { CURRENCY } from "../constants/currency";
import { ForexListItem } from "../constants/userPreset";
import { ForexTick } from "../services/usePriceTick";

const CurrenciesContainer = styled('div')({
  width: '400px',
  margin: '0',
});

type Props = {
  userForexList: ForexListItem[],
  forexData: {
    [currencyId: string]: ForexTick[]
  }
}
export const UserForexList: React.FC<Props> = (props) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return <CurrenciesContainer>
    <Card style={{ display: 'flex',padding:'5px' }} square>
      <TextField label="Amount" value={1} />
      <Autocomplete
        id="combo-box-demo"
        options={Object.keys(CURRENCY)}
        getOptionLabel={(option) => option}
        style={{ width: '150px' }}
        renderInput={(params) =>
          <TextField {...params} label="Currency" />}
        defaultValue='JPY'
        disableClearable
      />
    </Card>
    {Object.values(props.forexData)
      .map((currency, i) =>
        <CurrencyCard
          key={currency[0].to}
          forexData={currency[currency.length - 1]}
          onCardClick={() => setExpandedIndex(i)}
          isExpanded={i === expandedIndex}
        />)}
  </CurrenciesContainer>
}