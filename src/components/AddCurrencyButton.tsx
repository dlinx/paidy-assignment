import { Button, styled } from "@material-ui/core"
import { CURRENCY } from "../constants/currency"
import { CurrencyAutoComplete } from "./CurrencyAutocomplete"
import { useEffect, useState } from "react";
import { ForexListItem } from "../constants/userPreset";

const AddButtonContainer = styled('div')({
  marginTop: '20px',
  textAlign: 'center',
  display: 'flex',
  padding: '0 5px'
})

type Props = {
  onCurrencySelected: (currency: CURRENCY) => void
  userForexList: ForexListItem[]
}

export const AddCurrencyButton: React.FC<Props> = ({ onCurrencySelected, userForexList }) => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([])

  useEffect(() => {
    const ufl: string[] = userForexList.map(uf => uf.to);
    const options = Object.keys(CURRENCY)
      .filter(c => ufl.indexOf(c) === -1)
    setCurrencyOptions(options);
  }, [userForexList])

  return <AddButtonContainer>
    <CurrencyAutoComplete
      onUserCurrencyChange={(currency) => {
        onCurrencySelected(currency);
      }}
      options={currencyOptions}
      width='100%'
      label='Add new Currency'
      value={null}
    />
  </AddButtonContainer>

}